# QuickBite QA Project

A complete infrastructure and application setup for QuickBite restaurant's QA environment, featuring blue-green deployments with S3 static hosting and a FastAPI backend.

## 🎉 **Day 1 - COMPLETED!** ✅
**Date**: August 7, 2025  
**Status**: Infrastructure deployed, FastAPI running, ready for frontend development

## Project Structure

```
quickbiteqa/
├── terraform/              # Infrastructure as Code ✅
│   ├── main.tf             # S3 buckets and website hosting
│   ├── iam.tf              # IAM roles and policies
│   ├── outputs.tf          # Terraform outputs
│   ├── .terraform/         # Terraform state (KEEP!)
│   ├── terraform.tfstate   # Infrastructure state (CRITICAL!)
│   └── README.md           # Terraform documentation
├── iam/                    # IAM policy files ✅
│   └── s3-static-site-policy.json
├── fastapi-app/            # FastAPI application ✅
│   ├── main.py             # Main application file
│   ├── requirements.txt    # Python dependencies
│   └── README.md           # FastAPI documentation
├── static-sites/           # Test websites ✅
│   ├── blue/
│   │   └── index.html      # Blue environment test
│   └── green/
│       └── index.html      # Green environment test
├── DAY1-PROJECT-SUMMARY.md # Day 1 completion summary ✅
├── NEXT-STEPS.md           # Day 2+ action plan ✅
└── README.md               # This file
```

## Components

### 1. Terraform Infrastructure
- **Two S3 buckets** (`quickbite-blue` and `quickbite-green`) for blue-green deployments
- **Static website hosting** enabled on both buckets
- **IAM policies** for secure public access
- **Versioning** enabled for rollback capabilities

### 2. FastAPI Application
- **Menu management** with categorized items
- **Order system** with status tracking
- **Authentication** with token-based security
- **CORS enabled** for frontend integration
- **Dummy data** for testing and development

## Quick Start

### ✅ **Current Status (Day 1 Complete)**

**Infrastructure deployed!** S3 buckets are live:
- **Blue**: http://quickbite-blue.s3-website-us-east-1.amazonaws.com
- **Green**: http://quickbite-green.s3-website-us-east-1.amazonaws.com

**FastAPI running locally:**
```bash
cd fastapi-app
python3 -m uvicorn main:app --host 127.0.0.1 --port 8000 --reload
```
- **API**: http://127.0.0.1:8000
- **Docs**: http://127.0.0.1:8000/docs

### 🚀 **Day 2: Start Frontend Development**
See `NEXT-STEPS.md` for detailed frontend development plan.

### Infrastructure Setup (Already Complete)

1. **Deploy AWS infrastructure:**
   ```bash
   cd terraform
   terraform init
   terraform plan
   terraform apply
   ```

### FastAPI Application (Already Running)

1. **Set up the FastAPI app:**
   ```bash
   cd fastapi-app
   pip install -r requirements.txt
   python main.py
   ```

2. **Access the API:**
   - API: http://localhost:8000
   - Documentation: http://localhost:8000/docs

## API Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/menu` | Get all menu items | No |
| GET | `/menu/{id}` | Get specific menu item | No |
| POST | `/order` | Create new order | No |
| GET | `/order` | Get all orders | Yes |
| PUT | `/order/{id}/status` | Update order status | Yes |
| POST | `/login` | User authentication | No |

## Test Credentials

- **Admin**: username: `admin`, password: `admin123`
- **Customer**: username: `customer`, password: `customer123`
- **Staff**: username: `staff`, password: `staff123`

## Blue-Green Deployment Strategy

1. **Deploy to inactive bucket** (blue or green)
2. **Test the new version** on the inactive environment
3. **Switch DNS/traffic** to the new bucket
4. **Keep previous version** as backup for quick rollback

## Development Workflow

1. **Make changes** to the application
2. **Test locally** using the FastAPI development server
3. **Build and deploy** to the inactive S3 bucket
4. **Validate** the deployment
5. **Switch traffic** to the new version

## Technologies Used

- **Infrastructure**: Terraform, AWS S3
- **Backend**: FastAPI, Python 3.8+
- **Authentication**: Token-based (simplified for demo)
- **Deployment**: Blue-green strategy with S3 static hosting

## Next Steps

- Set up CI/CD pipeline for automated deployments
- Integrate with a proper database
- Implement proper JWT authentication
- Add monitoring and logging
- Set up CloudFront for CDN
- Configure custom domain names
