# IAM Role and Policy for S3 Static Site Management
resource "aws_iam_role" "s3_static_site_role" {
  name = "quickbite-s3-static-site-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "ec2.amazonaws.com"
        }
      }
    ]
  })

  tags = {
    Name        = "quickbite-s3-static-site-role"
    Environment = var.environment
  }
}

# IAM Policy for S3 Static Site Management
resource "aws_iam_policy" "s3_static_site_policy" {
  name        = "quickbite-s3-static-site-policy"
  description = "Policy for managing QuickBite S3 static site buckets"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid    = "S3BucketAccess"
        Effect = "Allow"
        Action = [
          "s3:GetObject",
          "s3:PutObject",
          "s3:DeleteObject",
          "s3:ListBucket",
          "s3:GetBucketLocation",
          "s3:GetBucketWebsite",
          "s3:PutBucketWebsite"
        ]
        Resource = [
          aws_s3_bucket.quickbite_blue.arn,
          "${aws_s3_bucket.quickbite_blue.arn}/*",
          aws_s3_bucket.quickbite_green.arn,
          "${aws_s3_bucket.quickbite_green.arn}/*"
        ]
      },
      {
        Sid    = "CloudFrontAccess"
        Effect = "Allow"
        Action = [
          "cloudfront:CreateInvalidation",
          "cloudfront:GetDistribution",
          "cloudfront:ListDistributions"
        ]
        Resource = "*"
      }
    ]
  })

  tags = {
    Name        = "quickbite-s3-static-site-policy"
    Environment = var.environment
  }
}

# Attach policy to role
resource "aws_iam_role_policy_attachment" "s3_static_site_policy_attachment" {
  role       = aws_iam_role.s3_static_site_role.name
  policy_arn = aws_iam_policy.s3_static_site_policy.arn
}

# Instance profile for EC2 instances (if needed)
resource "aws_iam_instance_profile" "s3_static_site_profile" {
  name = "quickbite-s3-static-site-profile"
  role = aws_iam_role.s3_static_site_role.name
}
