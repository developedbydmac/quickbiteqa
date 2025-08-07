# QuickBite QA - Quick Reference

## 🔗 **Live URLs (Bookmark These!)**

### **Development**
- **FastAPI API**: http://127.0.0.1:8000
- **API Documentation**: http://127.0.0.1:8000/docs
- **Health Check**: http://127.0.0.1:8000/health

### **AWS Infrastructure**
- **Blue Environment**: http://quickbite-blue.s3-website-us-east-1.amazonaws.com
- **Green Environment**: http://quickbite-green.s3-website-us-east-1.amazonaws.com
- **AWS Console**: https://console.aws.amazon.com

## ⚡ **Quick Commands**

### **Start Development**
```bash
# Start FastAPI
cd fastapi-app
python3 -m uvicorn main:app --host 127.0.0.1 --port 8000 --reload

# Start React (when created)
cd frontend
npm start
```

### **AWS Operations**
```bash
# Check S3 buckets
aws s3 ls | grep quickbite

# Upload to staging (green)
aws s3 sync build/ s3://quickbite-green/

# Upload to production (blue)
aws s3 sync build/ s3://quickbite-blue/

# Check AWS identity
aws sts get-caller-identity
```

### **Terraform Operations**
```bash
cd terraform
terraform plan      # Review changes
terraform apply     # Apply changes
terraform output    # Show outputs
terraform destroy   # ⚠️ DANGER: Delete everything
```

## 🔑 **Test Credentials**

### **FastAPI Login**
- **Admin**: `admin` / `admin123`
- **Customer**: `customer` / `customer123`
- **Staff**: `staff` / `staff123`

### **AWS Info**
- **Account ID**: [Use `aws sts get-caller-identity` to check]
- **Region**: us-east-1
- **Access Key**: [Configured in ~/.aws/credentials]

## 📱 **API Endpoints**

### **Public Endpoints**
```bash
GET  /                          # API info
GET  /health                    # Health check
GET  /menu                      # All menu items
GET  /menu?category=burgers     # Filter by category
GET  /menu/{item_id}            # Specific item
POST /login                     # User login
POST /order                     # Create order
```

### **Protected Endpoints (requires token)**
```bash
GET  /order                     # List all orders
PUT  /order/{id}/status         # Update order status
```

### **Test API Calls**
```bash
# Get menu
curl http://127.0.0.1:8000/menu

# Login
curl -X POST http://127.0.0.1:8000/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "admin123"}'

# Create order
curl -X POST http://127.0.0.1:8000/order \
  -H "Content-Type: application/json" \
  -d '{
    "items": [{"menu_item_id": 1, "quantity": 2}],
    "customer_name": "John Doe",
    "customer_email": "john@example.com"
  }'
```

## 🚨 **Critical Files - DO NOT DELETE**

```
terraform/
├── terraform.tfstate         # CRITICAL: Infrastructure state
├── terraform.tfstate.backup  # CRITICAL: State backup
├── .terraform/               # Terraform cache
└── .terraform.lock.hcl       # Provider lock

~/.aws/
├── credentials               # AWS access keys
└── config                    # AWS configuration
```

## 📂 **Project Status**

### **✅ Completed (Day 1)**
- [x] AWS infrastructure deployed
- [x] FastAPI application working
- [x] Static website hosting active
- [x] Blue-green deployment ready
- [x] Authentication system functional
- [x] API documentation complete

### **🔄 Next (Day 2)**
- [ ] React frontend application
- [ ] API integration
- [ ] User interface design
- [ ] Menu browsing functionality
- [ ] Order management system

## 📞 **Troubleshooting**

### **FastAPI Won't Start**
```bash
# Check if port is in use
lsof -i :8000

# Kill process if needed
kill <PID>

# Try different port
uvicorn main:app --port 8001
```

### **AWS Connection Issues**
```bash
# Re-configure credentials
aws configure

# Test connection
aws sts get-caller-identity
```

### **Terraform Issues**
```bash
# Re-initialize if needed
terraform init

# Check state
terraform show

# Import existing resources if state is lost
terraform import aws_s3_bucket.quickbite_blue quickbite-blue
```

### **S3 Website Not Loading**
1. Check bucket policy is applied
2. Verify `index.html` exists in bucket
3. Confirm public access is enabled
4. Check AWS console for errors

## 🔄 **Daily Workflow**

1. **Start Development**
   - Launch FastAPI server
   - Open API docs
   - Start coding

2. **Test Changes**
   - Use `/docs` for API testing
   - Test in browser
   - Check both blue/green environments

3. **Deploy Updates**
   - Upload to green bucket first
   - Test on green environment
   - Switch to production (blue) when ready

---

**Last Updated**: August 7, 2025  
**Next Action**: See `NEXT-STEPS.md` for Day 2 plan
