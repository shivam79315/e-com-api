E-Commerce REST API
===================

Description:
------------
This is a RESTful API built with Node.js and Express.js for e-commerce functionalities including:
- User signup and signin with JWT authentication
- Product management (list products, add product, get product details)
- Cart system (add, remove, view items)

Setup Instructions:
-------------------
1. Clone the repository:
   git clone https://github.com/your-username/ecom-api.git

2. Navigate to project directory:
   cd ecom-api

3. Install dependencies:
   npm install express body-parser cookie-parser jsonwebtoken multer swagger-ui-express

4. Start the server:
   node server.js

5. Access API documentation:
   http://localhost:3000/api-docs

Git Usage:
----------
- Check status of files:
  git status

- Add changes to staging:
  git add <file-name> or git add .

- Commit changes:
  git commit -m "your commit message"

- Push changes to remote repository:
  git push origin main

- Pull latest changes:
  git pull origin main

Notes:
------
- Ensure Node.js is installed
- Use Postman or Swagger to test API endpoints
- JWT token required for protected routes