# Terraform Configuration Files

This directory contains Terraform configuration files for creating AWS S3 buckets with static website hosting for the QuickBite QA project.

## Files

- `main.tf` - Main Terraform configuration with S3 buckets and website hosting
- `iam.tf` - IAM roles and policies for S3 static site management
- `outputs.tf` - Output values for bucket names and website endpoints

## Resources Created

### S3 Buckets
- `quickbite-blue` - Blue environment bucket for blue-green deployments
- `quickbite-green` - Green environment bucket for blue-green deployments

### Features
- Static website hosting enabled
- Public read access for website content
- Versioning enabled
- Proper IAM policies for public access

## Usage

1. **Initialize Terraform:**
   ```bash
   terraform init
   ```

2. **Plan the deployment:**
   ```bash
   terraform plan
   ```

3. **Apply the configuration:**
   ```bash
   terraform apply
   ```

4. **Get outputs:**
   ```bash
   terraform output
   ```

## Outputs

After applying, you'll get:
- Bucket names
- Website endpoints
- Website domains

## Variables

- `aws_region` - AWS region (default: us-east-1)
- `environment` - Environment name (default: dev)

## Requirements

- Terraform >= 1.0
- AWS Provider ~> 5.0
- AWS credentials configured

## Blue-Green Deployment

The two buckets (blue and green) are set up to support blue-green deployments:
- Deploy new version to the inactive bucket
- Test the new version
- Switch traffic to the new bucket
- Keep the old version as backup

## Security

The buckets are configured with:
- Public read access for website content
- Proper IAM policies
- Versioning enabled for rollback capabilities
