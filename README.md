# Online Shop

A full-stack e-commerce application built with React, Laravel, and MySQL.

## Tech Stack

### Frontend
![Frontend Stack](https://skillicons.dev/icons?i=react,tailwind,vite) 

### Backend
![Backend Stack](https://skillicons.dev/icons?i=laravel,mysql)

## Getting Started

### Frontend Setup
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

### Backend Setup
```bash
# Navigate to backend directory
cd backend

# create .env
copy .env.example .env

#Configuration in .env file
DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=online_shop_cpe241 # replace with your database name
DB_USERNAME=root # replace with your database server username
DB_PASSWORD=password # replace with your database server username

CACHE_STORE=file
SESSION_DRIVER=file

# Set up your own database then,
php artisan migrate

# Start development server
php artisan serve
```

## Features
- User authentication
- Product management
- Shopping cart
- Order management

## Project Structure
```
online-shop/
├── frontend/          # React frontend
└── backend/           # Laravel backend
```

## References
- [Full-Stack-Multimart-Ecommerce](https://github.com/mahadi-opu/Full-Stack-Multimart-Ecommerce/tree/main)
- [Tailwind-admin-dashboard](https://github.com/TailAdmin/free-react-tailwind-admin-dashboard.git)