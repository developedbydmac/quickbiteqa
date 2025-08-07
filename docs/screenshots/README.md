# Screenshots Documentation

This folder contains screenshots documenting the daily progress of the QuickBite QA 5-day DevOps pipeline project.

## 📁 **Folder Structure**

```
docs/screenshots/
├── day1/                 # Day 1 - Infrastructure & Backend
├── day2/                 # Day 2 - Frontend Development
├── day3/                 # Day 3 - Testing Implementation
├── day4/                 # Day 4 - CI/CD Pipelines
├── day5/                 # Day 5 - Final Documentation
└── README.md            # This file
```

## 📸 **Screenshot Categories by Day**

### **Day 1 - Infrastructure & Backend**
**Folder**: `day1/`

**Recommended Screenshots**:
- `01-blue-environment.png` - Blue S3 static site
- `02-green-environment.png` - Green S3 static site
- `03-aws-s3-buckets.png` - AWS Console showing deployed buckets
- `04-aws-bucket-policies.png` - Bucket policies configuration
- `05-fastapi-docs.png` - FastAPI /docs interface
- `06-api-menu-response.png` - Menu endpoint response
- `07-api-login-test.png` - Login endpoint testing
- `08-terraform-apply-success.png` - Terraform deployment results
- `09-terminal-commands.png` - Terminal showing successful commands
- `10-project-structure.png` - VS Code file explorer

### **Day 2 - Frontend Development**
**Folder**: `day2/`

**Planned Screenshots**:
- `01-react-app-created.png`
- `02-frontend-homepage.png`
- `03-menu-browsing-ui.png`
- `04-login-form.png`
- `05-api-integration-test.png`
- `06-responsive-design.png`

### **Day 3 - Testing Implementation**
**Folder**: `day3/`

**Planned Screenshots**:
- `01-cypress-test-setup.png`
- `02-e2e-tests-running.png`
- `03-pactum-api-tests.png`
- `04-test-results-dashboard.png`

### **Day 4 - CI/CD Pipelines**
**Folder**: `day4/`

**Planned Screenshots**:
- `01-github-actions-workflow.png`
- `02-deployment-pipeline.png`
- `03-smoke-tests-passing.png`
- `04-blue-green-switch.png`

### **Day 5 - Final Documentation**
**Folder**: `day5/`

**Planned Screenshots**:
- `01-complete-architecture.png`
- `02-monitoring-dashboard.png`
- `03-final-deployment.png`
- `04-blog-post-draft.png`

## 🖼️ **Screenshot Guidelines**

### **Naming Convention**
```
{day_number}-{screenshot_number}-{description}.png

Examples:
- day1/01-blue-environment.png
- day1/02-aws-console.png
- day2/01-react-homepage.png
```

### **Image Requirements**
- **Format**: PNG or JPG
- **Resolution**: Minimum 1280x720 for web screenshots
- **Quality**: High resolution for documentation
- **File Size**: Keep under 2MB when possible

### **Content Guidelines**
- **Show full browser/terminal** when relevant
- **Include timestamps** when showing deployment success
- **Crop appropriately** to focus on relevant content
- **Use annotations** if needed (arrows, highlights)

## 📝 **How to Add Screenshots**

1. **Take screenshot** using your preferred method
2. **Save to appropriate day folder** with descriptive name
3. **Update README.md** to reference the new screenshot
4. **Commit to git** (screenshots are safe to commit)

## 🔗 **Referencing Screenshots in Documentation**

### **Markdown Syntax**
```markdown
![Description](docs/screenshots/day1/01-blue-environment.png)
```

### **HTML with Sizing**
```html
<img src="docs/screenshots/day1/01-blue-environment.png" alt="Blue Environment" width="600">
```

## 📊 **Progress Tracking**

### **Day 1 Screenshots** ✅
- [ ] Blue environment website
- [ ] Green environment website  
- [ ] AWS S3 buckets console
- [ ] FastAPI documentation
- [ ] API endpoint testing
- [ ] Terraform deployment success
- [ ] Terminal command history
- [ ] Project file structure

### **Day 2 Screenshots** ⏳
- [ ] React application created
- [ ] Frontend UI components
- [ ] API integration working
- [ ] Responsive design

### **Day 3-5 Screenshots** 🔒
- [ ] Coming soon...

---

**Note**: This documentation will be updated as screenshots are added throughout the 5-day project.
