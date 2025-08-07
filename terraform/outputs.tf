# Outputs
output "quickbite_blue_bucket_name" {
  description = "Name of the Blue S3 bucket"
  value       = aws_s3_bucket.quickbite_blue.id
}

output "quickbite_green_bucket_name" {
  description = "Name of the Green S3 bucket"
  value       = aws_s3_bucket.quickbite_green.id
}

output "quickbite_blue_website_endpoint" {
  description = "Website endpoint for Blue bucket"
  value       = aws_s3_bucket_website_configuration.quickbite_blue_website.website_endpoint
}

output "quickbite_green_website_endpoint" {
  description = "Website endpoint for Green bucket"
  value       = aws_s3_bucket_website_configuration.quickbite_green_website.website_endpoint
}

output "quickbite_blue_website_domain" {
  description = "Website domain for Blue bucket"
  value       = aws_s3_bucket_website_configuration.quickbite_blue_website.website_domain
}

output "quickbite_green_website_domain" {
  description = "Website domain for Green bucket"
  value       = aws_s3_bucket_website_configuration.quickbite_green_website.website_domain
}
