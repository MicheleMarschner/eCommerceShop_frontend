# E-Commerce Shop

A Next.js e-commerce application for electronics, featuring a product catalog, persistent shopping cart, Stripe checkout, and webhook-based payment processing.

**[Live Demo](https://e-commerce-shop-frontend-six.vercel.app/)**

![E-Commerce Shop](images/shop-home.png)

## Features

- Product catalog with responsive layouts
- Persistent shopping cart using localStorage
- Stripe Checkout for payments
- Stripe webhooks for linking successful payments to order records
- MongoDB and Mongoose for product and order data
- Faker.js script for generating sample products
- Styled-components for UI styling

## Technical Features
- Product data managed with MongoDB using pre-defined Mongoose models  
- Styled using styled-components for modular, themeable UI design  
- Serverless Stripe webhook integration for syncing payment and order data  
- Local storage for cart persistence  
- Script for initial database setup using Faker.js

## Tech Stack & Tools
- Next.js / React  
- Styled-components  
- MongoDB / Mongoose  
- Stripe API (Checkout + Webhooks)  
- Faker.js (for mock data generation)

## Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/MicheleMarschner/eCommerceShop_frontend.git
cd eCommerceShop_frontend
```

### 2. Install dependencies
```npm install```

### 3. Add environment variables in a .env.local file

### 4. Run the development server
```npm run dev```

### 5. Visit http://localhost:3000
