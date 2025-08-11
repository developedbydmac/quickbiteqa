# Simple Lambda Function with Function URL (easier than API Gateway)
resource "aws_lambda_function" "quickbite_api_simple" {
  filename         = "quickbite-api.zip"
  function_name    = "quickbite-api-simple"
  role            = aws_iam_role.lambda_execution_role.arn
  handler         = "lambda_handler.lambda_handler"
  runtime         = "python3.11"
  timeout         = 30
  memory_size     = 512

  source_code_hash = data.archive_file.lambda_zip.output_base64sha256

  environment {
    variables = {
      ENVIRONMENT = var.environment
    }
  }

  tags = {
    Name        = "quickbite-api-simple"
    Environment = var.environment
  }
}

# Lambda Function URL (simpler than API Gateway)
resource "aws_lambda_function_url" "quickbite_api_url" {
  function_name      = aws_lambda_function.quickbite_api_simple.function_name
  authorization_type = "NONE"

  cors {
    allow_credentials = false
    allow_origins     = ["*"]
    allow_methods     = ["*"]
    allow_headers     = ["*"]
    expose_headers    = ["date", "content-length"]
    max_age          = 86400
  }
}

# Output the Lambda Function URL
output "lambda_function_url" {
  description = "Lambda Function URL"
  value       = aws_lambda_function_url.quickbite_api_url.function_url
}
