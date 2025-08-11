#!/bin/bash

echo "🚀 Deploying QuickBite Backend to AWS Lambda"
echo "============================================"
echo ""

# Configuration
FASTAPI_DIR="fastapi-app"
TERRAFORM_DIR="terraform"

echo "📋 Deployment Steps:"
echo "   1. Install Lambda dependencies"
echo "   2. Create deployment package"
echo "   3. Deploy with Terraform"
echo "   4. Update frontend configuration"
echo ""

# Step 1: Install Lambda dependencies
echo "1️⃣ Installing Lambda dependencies..."
cd "$FASTAPI_DIR"

# Create a temporary directory for Lambda dependencies
mkdir -p lambda-deps
pip install -r requirements-lambda.txt -t lambda-deps/

# Copy FastAPI app files to lambda-deps
cp *.py lambda-deps/
cp -r lambda-deps/* .
rm -rf lambda-deps

echo "✅ Lambda dependencies installed"
cd ..

# Step 2: Terraform deployment
echo ""
echo "2️⃣ Deploying with Terraform..."
cd "$TERRAFORM_DIR"

# Initialize Terraform (in case of new providers)
terraform init

# Plan the deployment
echo "📋 Terraform Plan:"
terraform plan

# Apply the deployment
read -p "🚀 Proceed with deployment? (y/n): " proceed
if [[ $proceed =~ ^[Yy]$ ]]; then
    terraform apply -auto-approve
    
    if [ $? -eq 0 ]; then
        echo "✅ Terraform deployment successful!"
        
        # Get the API Gateway URL
        API_URL=$(terraform output -raw api_gateway_url)
        echo ""
        echo "🌐 Backend API is now live at:"
        echo "   $API_URL"
        
        # Step 3: Update frontend configuration
        echo ""
        echo "3️⃣ Updating frontend configuration..."
        cd ../frontend
        
        # Update .env.production with the API URL
        echo "REACT_APP_API_URL=$API_URL" > .env.production
        echo "✅ Updated frontend .env.production"
        
        # Rebuild the React app with new API URL
        echo ""
        echo "4️⃣ Rebuilding React app with new API URL..."
        npm run build
        
        if [ $? -eq 0 ]; then
            echo "✅ React app rebuilt successfully"
            
            # Copy updated build to static sites
            echo ""
            echo "5️⃣ Updating S3 deployment files..."
            cp -r build/. ../static-sites/blue/
            echo "✅ Updated blue deployment files"
            
            # Deploy updated frontend to S3
            echo ""
            echo "6️⃣ Deploying updated frontend to S3..."
            cd ..
            ./deploy-to-aws.sh
            
        else
            echo "❌ React build failed"
            exit 1
        fi
        
    else
        echo "❌ Terraform deployment failed"
        exit 1
    fi
else
    echo "⏸️ Deployment cancelled"
    exit 0
fi

cd ..

echo ""
echo "🎉 Full-Stack AWS Deployment Complete!"
echo ""
echo "🌐 Your application is now running entirely on AWS:"
echo "   📱 Frontend (Blue): http://quickbite-blue.s3-website-us-east-1.amazonaws.com"
echo "   📱 Frontend (Green): http://quickbite-green.s3-website-us-east-1.amazonaws.com"
echo "   🔧 Backend API: $API_URL"
echo ""
echo "🧪 Testing:"
echo "   Visit your frontend URLs - they should now work with the AWS backend!"
echo "   API Documentation: $API_URL/docs"
echo ""
echo "💡 Note: The API URL has been automatically configured in your frontend"
