# How I Built QuickBite QA with Blue-Green Deployment on AWS

*A journey through modern full-stack development with automated testing and zero-downtime deployments*

## What QuickBite QA Simulates

QuickBite QA is my take on a modern restaurant ordering system that simulates real-world food delivery apps like DoorDash or Uber Eats. I wanted to build something that showcases:

- **Real User Flows**: Browse menu, add items to cart, authenticate, place orders
- **Production-Ready Architecture**: Serverless AWS deployment with CI/CD automation
- **Quality Assurance**: 100% test coverage with both API and UI testing
- **Modern DevOps**: Blue-green deployment strategy with automated rollbacks

The app handles the complete customer journey from menu browsing to order confirmation, all while maintaining enterprise-grade reliability and testing standards.

## Day-by-Day Build Journey

### Day 1: Foundation & Infrastructure
**Focus**: Getting the basics right from the start

I started with the infrastructure foundation using AWS and Terraform:
- Set up FastAPI backend with JWT authentication
- Created basic restaurant menu API endpoints
- Deployed serverless architecture (Lambda + API Gateway)
- Established blue-green deployment infrastructure

```bash
# Key commands from Day 1
terraform init && terraform apply
./deploy-backend-aws.sh
curl https://api.quickbite.dev/health
```

**Result**: Working backend API deployed to AWS with infrastructure as code.

### Day 2: Full-Stack Implementation
**Focus**: Building the complete user experience

This was the heavy lifting day - creating the React frontend and connecting everything:
- Built responsive React app with Material-UI
- Integrated shopping cart with localStorage persistence
- Connected frontend to FastAPI backend
- Implemented JWT authentication flow

```javascript
// Cart management with real-time updates
const addToCart = (item) => {
  const cart = getCart();
  cart.push(item);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartDisplay();
};
```

**Result**: Complete working application deployed to S3 with full user functionality.

### Day 3: Testing Infrastructure
**Focus**: Achieving 100% test coverage

I implemented comprehensive testing to ensure reliability:
- **API Testing**: 9 Pactum tests covering all endpoints
- **UI Testing**: 6 Cypress tests for critical user journeys
- **Integration Testing**: Full-stack validation

```javascript
// Cypress test example
it('completes full order flow', () => {
  cy.visit('/menu');
  cy.get('[data-testid="menu-item"]').first().click();
  cy.get('[data-testid="add-to-cart"]').click();
  cy.get('[data-testid="checkout"]').click();
  cy.get('[data-testid="order-success"]').should('be.visible');
});
```

**Result**: 15/15 tests passing with automated test execution via Makefile.

### Day 4: CI/CD & Blue-Green Deployment
**Focus**: Production-ready deployment automation

The final piece was building enterprise-grade deployment infrastructure:
- GitHub Actions workflows for automated deployment
- Blue-green deployment strategy with zero downtime
- Comprehensive smoke testing on every deployment
- Manual approval gates for production promotion

```yaml
# GitHub Actions workflow snippet
name: Deploy Blue Environment
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to Blue
        run: aws s3 sync ./build s3://${{ secrets.AWS_S3_BUCKET_BLUE }}
      - name: Run Smoke Tests
        run: npm run test:smoke
```

**Result**: Zero-downtime deployment pipeline with comprehensive quality gates.

## Key Tools and Technology Choices

### Frontend Stack
**React + Material-UI + Vite**
- React 18 for modern component development
- Material-UI for consistent design system
- Vite for lightning-fast development experience

### Backend Stack
**FastAPI + AWS Lambda**
- FastAPI for automatic API documentation and validation
- Serverless deployment for cost efficiency and scalability
- JWT authentication for secure user sessions

### Testing Strategy
**Cypress + Pactum**
- Cypress for realistic browser-based UI testing
- Pactum for contract-based API testing
- Both tools provide excellent debugging capabilities

### Infrastructure
**AWS + Terraform + GitHub Actions**
- Terraform for infrastructure as code
- S3 for static site hosting
- GitHub Actions for CI/CD automation

## Testing Strategy Deep Dive

### API Testing with Pactum
I chose Pactum for API testing because it excels at contract testing and provides clear assertions:

```javascript
// Pactum API test example
await pactum.spec()
  .post('/api/login')
  .withJson({ username: 'testuser', password: 'testpass' })
  .expectStatus(200)
  .expectJsonMatch({ token: /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/ });
```

**Coverage**: Authentication, menu retrieval, order processing, error scenarios

### UI Testing with Cypress
Cypress provides excellent browser automation and debugging tools:

```javascript
// Cypress UI test example
describe('Shopping Cart', () => {
  it('persists items across page reloads', () => {
    cy.addItemToCart('Burger');
    cy.reload();
    cy.get('[data-testid="cart-items"]').should('contain', 'Burger');
  });
});
```

**Coverage**: Complete user journeys, responsive design, error handling

## CI/CD Pipeline: Blue-Green + Promotion Gates

### Blue Environment (Automated)
Triggers on every push to main branch:
1. Build React application
2. Deploy to blue S3 bucket
3. Run comprehensive smoke tests
4. Update production DNS if tests pass

### Green Environment (Manual)
Triggered manually for staging deployments:
1. Deploy to green S3 bucket
2. Run full test suite
3. Manual approval required for promotion
4. Instant switch to production traffic

### Promotion Gateway
The key innovation is the manual approval process:

```yaml
promote-to-production:
  needs: [deploy-green, run-tests]
  environment: production
  steps:
    - name: Switch Traffic to Green
      run: aws s3 sync green-bucket/ production-bucket/
```

This ensures human oversight for critical production changes while maintaining automation for routine deployments.

## Screenshots and Release Links

### Live Application
- **Production**: [quickbite-blue.s3-website-us-east-1.amazonaws.com](http://quickbite-blue.s3-website-us-east-1.amazonaws.com)
- **GitHub Repository**: [github.com/developedbydmac/quickbiteqa](https://github.com/developedbydmac/quickbiteqa)

### Key Screenshots
- **Desktop Menu**: Clean grid layout with category filtering
- **Mobile Cart**: Touch-optimized shopping cart interface
- **Test Results**: 15/15 tests passing with detailed reports
- **CI/CD Dashboard**: GitHub Actions workflow execution

*See [docs/screenshots/](screenshots/) for complete visual documentation*

## Lessons Learned

### Technical Insights
1. **Start with Infrastructure**: Having solid CI/CD from Day 1 would have saved time
2. **Test Early and Often**: Writing tests alongside features prevents regression issues
3. **Blue-Green is Worth It**: Zero-downtime deployments provide confidence in frequent releases
4. **Serverless Simplicity**: AWS Lambda + S3 provides incredible simplicity for this scale

### Development Process
1. **Documentation Matters**: Day-by-day documentation helped track progress and decisions
2. **Automated Testing is Essential**: 100% test coverage provided confidence for rapid iteration
3. **Manual Gates Have Value**: Automated deployment with manual promotion strikes the right balance

### Architecture Decisions
1. **Material-UI Choice**: Provided professional UI with minimal custom CSS
2. **FastAPI Selection**: Automatic API documentation and validation saved significant time
3. **GitHub Actions**: Integrated well with GitHub repository and provided reliable automation

## Next Steps for v2

### Database Integration
Move from in-memory storage to persistent database:
- **DynamoDB**: For user accounts and order history
- **Data Migration**: Smooth transition from mock data
- **Performance**: Optimized queries and caching strategies

### Advanced Features
Enhance the user experience:
- **Real-time Updates**: WebSocket integration for live order tracking
- **Payment Integration**: Stripe/PayPal for actual transactions
- **Admin Dashboard**: Restaurant management interface
- **Mobile App**: Progressive Web App (PWA) capabilities

### Operational Excellence
Production-ready monitoring and optimization:
- **Application Performance Monitoring**: Real-time app metrics
- **Error Tracking**: Automated error detection and alerting
- **Load Testing**: Performance validation under stress
- **Security Hardening**: Advanced security measures and compliance

### DevOps Enhancements
Advanced deployment and testing strategies:
- **Canary Deployments**: Gradual traffic shifting with metrics
- **Contract Testing**: API contract validation between services
- **Visual Regression Testing**: Automated UI change detection
- **Multi-Environment**: Staging, UAT, and production environments

---

The QuickBite QA project demonstrates that modern full-stack development can achieve enterprise-grade reliability while maintaining development velocity. The combination of comprehensive testing, automated deployment, and manual quality gates provides a solid foundation for any production application.

**Total Development Time**: 4 days  
**Test Coverage**: 100%  
**Deployment Strategy**: Zero-downtime blue-green  
**Infrastructure**: Fully automated AWS serverless  

*Built with ❤️ as a comprehensive learning project showcasing modern development practices.*
