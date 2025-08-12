# GitHub Secrets Setup Guide

This guide helps you configure the required GitHub Secrets for the QuickBite QA CI/CD pipeline.

## 📍 Navigate to Repository Settings

1. Go to your GitHub repository: `https://github.com/developedbydmac/quickbiteqa`
2. Click **Settings** tab
3. In the left sidebar, click **Secrets and variables** → **Actions**
4. Click **New repository secret** for each secret below

## 🔐 Required Secrets

### AWS Configuration
```
Name: AWS_ACCESS_KEY_ID
Value: [Your AWS Access Key ID]
Description: AWS authentication for S3 deployment

Name: AWS_SECRET_ACCESS_KEY  
Value: [Your AWS Secret Access Key]
Description: AWS authentication for S3 deployment

Name: AWS_REGION
Value: us-east-1
Description: AWS region for deployments
```

### Environment URLs
```
Name: SITE_BASE_BLUE
Value: http://quickbite-blue.s3-website-us-east-1.amazonaws.com
Description: Blue environment URL for testing

Name: SITE_BASE_GREEN
Value: http://quickbite-green.s3-website-us-east-1.amazonaws.com  
Description: Green environment URL for testing
```

### Test Credentials
```
Name: TEST_USER
Value: testuser
Description: Username for test authentication

Name: TEST_PASS
Value: testpass123
Description: Password for test authentication
```

## 🚀 Verification

After adding all secrets, you should see 7 secrets in your repository:
- AWS_ACCESS_KEY_ID
- AWS_SECRET_ACCESS_KEY
- AWS_REGION
- SITE_BASE_BLUE
- SITE_BASE_GREEN
- TEST_USER
- TEST_PASS

## 🔄 Testing the Pipeline

### 1. Test Blue Deployment (Automatic)
- Push any change to the main branch
- GitHub Actions will automatically trigger the blue deployment
- Check the Actions tab to monitor progress

### 2. Test Green Deployment (Manual)
- Go to Actions tab in your repository
- Click "Deploy to Green Environment"
- Click "Run workflow"
- Select main branch
- Choose whether to promote to production
- Click "Run workflow"

## 📊 Monitoring

Once the workflows run, you'll see:
- **Actions Tab**: Real-time pipeline execution
- **Deployment Summary**: Live URLs and status
- **Artifacts**: Test screenshots, videos, and reports
- **Environment Status**: Blue/Green environment health

## 🔧 Troubleshooting

### Common Issues:
1. **AWS Permissions**: Ensure your AWS keys have S3 full access
2. **Region Mismatch**: Verify AWS_REGION matches your S3 bucket region
3. **URL Accessibility**: Ensure S3 buckets have public read access for static hosting
4. **Test Credentials**: Use simple, alphanumeric test credentials

### Workflow Failures:
- Check the Actions tab for detailed error logs
- Verify all 7 secrets are properly configured
- Ensure S3 buckets exist and have static hosting enabled
- Confirm AWS credentials have proper permissions

---

**Once configured, your QuickBite QA project will have enterprise-grade CI/CD with automated testing and blue-green deployment!** 🚀
