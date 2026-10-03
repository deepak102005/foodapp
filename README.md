# foodapp

ClearBite food delivery and restaurant discovery web application built with Next.js.

## Pages & Routes

- `/` - Home page with Hero section, Explore by Cuisine, and Nutrition info.
- `/restaurants` - Restaurants near you with search, cuisine filters, and top restaurant listings.
- `/menu` - Restaurant detail page with hero quinoa bowl preview, gallery, feature badges, and recommendations.
- `/inegrediantsmenu` (or `/ingredientsmenu`) - Dish ingredients breakdown, nutrition & allergen accordions, and recommended dishes.
- `/checkout` - Cart checkout with order summary, delivery details, and payment options.
- `/tractingpage` (or `/trackingpage`) - Live order tracking with driver status, interactive map, and receipt.
- `/signin` (or `/login`) - Sign In page with JWT authentication and 1-click demo login.
- `/signup` (or `/register`) - Sign Up page with full validation and password strength indicators.

## Authentication & Environment Setup

This project uses JWT authentication with secure HTTP-only cookies and bcrypt password hashing.

### Environment Variables
Configure your environment in `app/.env.local`:
```env
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=7d
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Pre-configured Demo Account
You can test the application immediately with the pre-seeded demo user or register a new account:
- **Email:** `deepak@clearbite.com`
- **Password:** `password123`

## Getting Started

First, navigate to the `app` directory:

```bash
cd app
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.
