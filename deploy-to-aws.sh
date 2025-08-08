#!/bin/bash

echo "🚀 Deploying QuickBite React App to AWS S3"
echo "=========================================="
echo ""

# Configuration
BLUE_BUCKET="quickbite-blue"
GREEN_BUCKET="quickbite-green"
SOURCE_DIR="/Users/daquanmcdaniel/Documents/developedbydmac/quickbiteqa/quickbiteqa/static-sites/blue"

echo "📋 Deployment Configuration:"
echo "   Source: $SOURCE_DIR"
echo "   Blue Bucket: $BLUE_BUCKET"
echo "   Green Bucket: $GREEN_BUCKET"
echo ""

# Check if AWS CLI is configured
if ! aws sts get-caller-identity > /dev/null 2>&1; then
    echo "❌ AWS CLI not configured. Please run 'aws configure' first."
    exit 1
fi

echo "✅ AWS CLI is configured"
echo ""

# Deploy to Blue environment
echo "🔵 Deploying to Blue Environment..."
echo "   Syncing files to s3://$BLUE_BUCKET/"

aws s3 sync "$SOURCE_DIR" "s3://$BLUE_BUCKET/" \
    --delete \
    --cache-control "public, max-age=31536000" \
    --exclude "*.html" \
    --exclude "deployment-info.html"

# Deploy HTML files with no cache for immediate updates
aws s3 sync "$SOURCE_DIR" "s3://$BLUE_BUCKET/" \
    --delete \
    --cache-control "no-cache, no-store, must-revalidate" \
    --include "*.html"

if [ $? -eq 0 ]; then
    echo "✅ Blue deployment successful!"
else
    echo "❌ Blue deployment failed!"
    exit 1
fi

echo ""

# Deploy to Green environment (optional - for blue-green strategy)
read -p "🟢 Deploy to Green environment as well? (y/n): " deploy_green

if [[ $deploy_green =~ ^[Yy]$ ]]; then
    echo "🟢 Deploying to Green Environment..."
    echo "   Syncing files to s3://$GREEN_BUCKET/"

    aws s3 sync "$SOURCE_DIR" "s3://$GREEN_BUCKET/" \
        --delete \
        --cache-control "public, max-age=31536000" \
        --exclude "*.html" \
        --exclude "deployment-info.html"

    aws s3 sync "$SOURCE_DIR" "s3://$GREEN_BUCKET/" \
        --delete \
        --cache-control "no-cache, no-store, must-revalidate" \
        --include "*.html"

    if [ $? -eq 0 ]; then
        echo "✅ Green deployment successful!"
    else
        echo "❌ Green deployment failed!"
        exit 1
    fi
fi

echo ""
echo "🌐 Deployment Complete!"
echo ""
echo "📍 Your React App is now live at:"
echo "   🔵 Blue: http://quickbite-blue.s3-website-us-east-1.amazonaws.com"
if [[ $deploy_green =~ ^[Yy]$ ]]; then
    echo "   🟢 Green: http://quickbite-green.s3-website-us-east-1.amazonaws.com"
fi
echo ""
echo "⚠️  Note: The backend API is still running locally at http://127.0.0.1:8000"
echo "   For production, you would deploy the FastAPI backend to AWS ECS/Lambda/EC2"
echo ""
echo "🧪 Test your deployed application:"
echo "   1. Visit the blue environment URL above"
echo "   2. The React app should load (but API calls will fail until backend is deployed)"
echo "   3. For full functionality, keep the local backend running"
echo ""
echo "🎉 AWS Deployment Complete!"
