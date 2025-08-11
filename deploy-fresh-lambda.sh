#!/bin/bash

# Simple Lambda deployment script
echo "🚀 Deploying Lambda Function from Scratch..."

# Clean up
rm -rf fastapi-app/lambda-package
mkdir -p fastapi-app/lambda-package

# Install dependencies
echo "📦 Installing dependencies..."
cd fastapi-app
pip3 install -r requirements.txt -t lambda-package/ --platform linux_x86_64 --only-binary=:all:

# Copy our code
echo "📋 Copying application code..."
cp *.py lambda-package/

# Create zip
echo "📦 Creating deployment package..."
cd lambda-package
zip -r ../../lambda-function.zip . -x "*.pyc" "*/__pycache__/*"
cd ../..

# Create the Lambda function
echo "🔧 Creating Lambda function..."
aws lambda create-function \
    --function-name quickbite-api-new \
    --runtime python3.11 \
    --role arn:aws:iam::653293365850:role/quickbite-lambda-execution-role \
    --handler lambda_handler.lambda_handler \
    --zip-file fileb://lambda-function.zip \
    --timeout 30 \
    --memory-size 512 \
    --region us-east-1

echo "✅ Lambda function created successfully!"

# Clean up
rm -f lambda-function.zip
rm -rf fastapi-app/lambda-package

echo "🎉 Deployment complete!"
