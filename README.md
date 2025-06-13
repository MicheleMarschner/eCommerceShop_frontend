# E-Commerce - Shop  
**Online electronics storefront with integrated payments and real-time order tracking.**  

A simple e-commerce application for selling electronic products. Users can browse items, add them to a cart, and securely complete checkout via Stripe. Order fulfillment is automated via webhooks for a seamless customer experience.

[![Live Site](https://img.shields.io/badge/live-e--commerce--shop--frontend--six.vercel.app-blue)](https://e-commerce-shop-frontend-six.vercel.app)

## Features
- Intuitive product catalog, shopping cart, and Stripe-powered checkout flow  
- Webhook integration to link successful payments to order records  
- Persistent cart and user session using localStorage  
- Faker-based script to seed product database for quick setup  
- Responsive UI designed for smooth mobile and desktop experiences

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