terraform {
  required_version = ">= 1.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

# Variables
variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}

variable "environment" {
  description = "Environment name"
  type        = string
  default     = "dev"
}

# S3 Bucket for Blue Environment
resource "aws_s3_bucket" "quickbite_blue" {
  bucket = "quickbite-blue"

  tags = {
    Name        = "quickbite-blue"
    Environment = var.environment
    Purpose     = "Static Website Hosting - Blue"
  }
}

# S3 Bucket for Green Environment
resource "aws_s3_bucket" "quickbite_green" {
  bucket = "quickbite-green"

  tags = {
    Name        = "quickbite-green"
    Environment = var.environment
    Purpose     = "Static Website Hosting - Green"
  }
}

# Website configuration for Blue bucket
resource "aws_s3_bucket_website_configuration" "quickbite_blue_website" {
  bucket = aws_s3_bucket.quickbite_blue.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "error.html"
  }
}

# Website configuration for Green bucket
resource "aws_s3_bucket_website_configuration" "quickbite_green_website" {
  bucket = aws_s3_bucket.quickbite_green.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "error.html"
  }
}

# Public access block configuration for Blue bucket
resource "aws_s3_bucket_public_access_block" "quickbite_blue_pab" {
  bucket = aws_s3_bucket.quickbite_blue.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

# Public access block configuration for Green bucket
resource "aws_s3_bucket_public_access_block" "quickbite_green_pab" {
  bucket = aws_s3_bucket.quickbite_green.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

# Bucket policy for Blue bucket (public read access)
resource "aws_s3_bucket_policy" "quickbite_blue_policy" {
  bucket     = aws_s3_bucket.quickbite_blue.id
  depends_on = [aws_s3_bucket_public_access_block.quickbite_blue_pab]

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid       = "PublicReadGetObject"
        Effect    = "Allow"
        Principal = "*"
        Action    = "s3:GetObject"
        Resource  = "${aws_s3_bucket.quickbite_blue.arn}/*"
      }
    ]
  })
}

# Bucket policy for Green bucket (public read access)
resource "aws_s3_bucket_policy" "quickbite_green_policy" {
  bucket     = aws_s3_bucket.quickbite_green.id
  depends_on = [aws_s3_bucket_public_access_block.quickbite_green_pab]

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid       = "PublicReadGetObject"
        Effect    = "Allow"
        Principal = "*"
        Action    = "s3:GetObject"
        Resource  = "${aws_s3_bucket.quickbite_green.arn}/*"
      }
    ]
  })
}

# Versioning for Blue bucket
resource "aws_s3_bucket_versioning" "quickbite_blue_versioning" {
  bucket = aws_s3_bucket.quickbite_blue.id
  versioning_configuration {
    status = "Enabled"
  }
}

# Versioning for Green bucket
resource "aws_s3_bucket_versioning" "quickbite_green_versioning" {
  bucket = aws_s3_bucket.quickbite_green.id
  versioning_configuration {
    status = "Enabled"
  }
}
