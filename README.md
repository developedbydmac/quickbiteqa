# 🍔 QuickBite QA - Restaurant Ordering System

A modern, full-stack restaurant ordering application built with React and FastAPI, featuring real-time cart management, secure authentication, and comprehensive automated testing.

[![Live Demo](https://img.shields.io/badge/Demo-Live%20Application-blue)](http://quickbite-blue.s3-website-us-east-1.amazonaws.com)
[![Test Coverage](https://img.shields.io/badge/Test%20Coverage-100%25-brightgreen)](docs/TESTING.md)
[![AWS Deployed](https://img.shields.io/badge/AWS-Deployed-orange)](docs/AWS-DEPLOYMENT.md)

## 🚀 Live Application

Experience the full application in action:

- **Frontend**: [quickbite-blue.s3-website-us-east-1.amazonaws.com](http://quickbite-blue.s3-website-us-east-1.amazonaws.com)
- **API Documentation**: Interactive Swagger UI available when running locally
- **Local Development**: Frontend on `:3000`, API on `:8000`

## ✨ Key Features

- **🍔 Interactive Menu**: Browse categorized menu items with real-time search
- **🛒 Smart Cart**: Add/remove items with live total calculations  
- **🔐 Secure Auth**: JWT-based authentication with protected routes
- **📱 Mobile First**: Responsive design optimized for all devices
- **⚡ Fast Performance**: Built with Vite and optimized for speed
- **🧪 Fully Tested**: 100% test coverage with automated E2E and API testing
- **☁️ Cloud Ready**: Deployed on AWS serverless infrastructure
- **🚀 CI/CD Pipeline**: Automated blue-green deployment with GitHub Actions

## 🔄 Deployment Pipeline

**DAY 4 ACHIEVEMENT**: Production-ready CI/CD with blue-green deployment strategy

| Workflow | Trigger | Environment | Status | Link |
|----------|---------|-------------|--------|------|
| **Deploy Blue** | Push to main | Production | ✅ Active | [View Workflow](../../actions/workflows/deploy-blue.yml) |
| **Deploy Green** | Manual dispatch | Staging → Production | ✅ Active | [View Workflow](../../actions/workflows/deploy-green.yml) |

### 🎯 Pipeline Features
- **Automated Testing**: Comprehensive smoke tests on every deployment
- **Zero Downtime**: Blue-green strategy with instant rollback capability
- **Manual Approval**: Production promotion requires explicit approval
- **Artifact Storage**: Complete test results, screenshots, and videos preserved
- **Security**: All credentials managed via GitHub Secrets

## 🛠️ Technology Stack

### Frontend
- **React 18** with TypeScript
- **Material-UI (MUI)** for design system
- **Vite** for fast development and building
- **React Router** for navigation
- **Axios** for API communication

### Backend  
- **FastAPI** with Python 3.9+
- **JWT Authentication** for security
- **Pydantic** for data validation
- **CORS** enabled for cross-origin requests
- **OpenAPI/Swagger** documentation

### Testing & Quality
- **Cypress** for end-to-end UI testing
- **Pactum** for comprehensive API testing  
- **100% test coverage** across critical user journeys
- **GitHub Actions** for CI/CD automation

### Infrastructure
- **AWS S3** for static site hosting
- **AWS Lambda** for serverless backend
- **AWS API Gateway** for API management
- **AWS DynamoDB** for data storage (planned)
- **Blue-Green Deployment** strategy

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Python 3.9+
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/developedbydmac/quickbiteqa.git
   cd quickbiteqa
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development servers**
   ```bash
   # Start both frontend and backend
   make dev

   # Or start individually
   make frontend  # React dev server on :3000
   make backend   # FastAPI server on :8000
   ```

4. **Run tests**
   ```bash
   make test      # Run full test suite
   npm run test:api  # API tests only
   npm run test:ui   # UI tests only
   ```

### Development Commands

```bash
# Development
make dev          # Start both servers with hot reload
make frontend     # React development server
make backend      # FastAPI development server

# Testing  
make test         # Run all tests
make test:api     # Run API tests with Pactum
make test:ui      # Run UI tests with Cypress

# Building
npm run build     # Build for production
make deploy       # Deploy to AWS (requires AWS CLI setup)
```

## 📱 Application Screenshots

### Desktop Experience
- Clean, intuitive menu browsing
- Real-time cart updates
- Responsive navigation

### Mobile Experience  
- Touch-optimized interface
- Mobile-first responsive design
- Fast loading and smooth interactions

*Screenshots available in [docs/screenshots/](docs/screenshots/)*

## 🧪 Testing & Quality Assurance

This project maintains **100% test coverage** across all critical user journeys:

- **API Tests (9/9 passing)**: Authentication, menu retrieval, order processing, error handling
- **UI Tests (6/6 passing)**: End-to-end user flows, component interactions, responsive behavior
- **Integration Tests**: Full-stack communication validation

See detailed testing documentation: [docs/TESTING.md](docs/TESTING.md)

## 🏗️ Architecture & Design

QuickBite QA follows modern full-stack architecture principles:

- **Frontend**: Single Page Application (SPA) with React
- **Backend**: RESTful API with FastAPI
- **Authentication**: JWT tokens with secure storage
- **State Management**: React hooks and context
- **Styling**: Material Design with MUI components
- **Deployment**: Serverless architecture on AWS

## 📚 Documentation

- **[Testing Guide](docs/TESTING.md)** - Comprehensive testing setup and execution
- **[AWS Deployment](docs/AWS-DEPLOYMENT.md)** - Cloud infrastructure and deployment process
- **[Development Notes](docs/development/)** - Day-by-day development progress
- **[API Documentation](docs/API.md)** - Backend endpoints and schemas
- **[Frontend Guide](frontend/README.md)** - React app structure and components

## 🤝 Contributing

This project was developed as a learning exercise following a structured day-by-day approach. The development process is documented in [docs/development/](docs/development/) for educational purposes.

## 📄 License

This project is available under the MIT License. See [LICENSE](LICENSE) for details.

## 🎯 Learning Outcomes

This project demonstrates:
- **Full-stack development** with modern frameworks
- **Test-driven development** practices  
- **Cloud deployment** strategies
- **CI/CD pipeline** implementation
- **Responsive design** principles
- **Authentication & security** best practices

---

**Built with ❤️ as a comprehensive full-stack learning project**
