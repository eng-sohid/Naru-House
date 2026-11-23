# Naru House — Premium Bengali Sweets E-commerce Platform

Naru House is a full-stack, production-ready e-commerce platform for selling traditional homemade Bengali Naru (coconut sweets). It features a premium customer-facing storefront and a secure role-based admin dashboard.

> **Built with:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, shadcn/ui, PostgreSQL + Prisma, NextAuth.js, SSLCommerz (Bangladesh).

---

## Main Features

### Customer Experience
- Premium homepage with hero section, featured products, about, testimonials, and contact
- Product catalogue with search, category filter, and price sorting (database-driven)
- Product details with images, descriptions, pricing, and stock status
- Custom Naru ordering (type, quantity, package, customization options, special instructions, delivery preferences) with dynamic price calculation
- Shopping cart with add/remove, quantity update, subtotal, delivery charge, and total (server-persisted)
- Checkout with customer information, delivery address, Cash on Delivery, and online payment (SSLCommerz)
- Customer registration, login, logout, profile, saved addresses, order history, order details, order tracking, cancellation
- Order status flow: Pending → Confirmed → Processing → Shipped → Delivered (+ Cancelled, Failed)
- Guest order tracking by secure order reference

### Admin Experience (Secure, Role-Based)
- Dashboard overview: total revenue, orders, products, customers, pending/processing/delivered counts, recent orders, sales analytics
- Product management: add, edit, delete, upload images, update prices/descriptions, manage stock, mark featured, activate/deactivate
- Category management
- Order management: view all, search, filter, view details, update status (confirm, ship, deliver, cancel), view payment status
- Customer management: view registered customers, profiles, order history, search
- Notifications: new order alerts (dashboard + SMS + email), configurable admin notification settings
- Real-time notifications for new orders

### Technical
- Next.js App Router with server components and API routes
- PostgreSQL database with Prisma ORM
- NextAuth.js authentication with ADMIN/CUSTOMER roles
- Server-side validation (Zod), server-side price recalculation, no client-trusted data
- Role-based access control enforced by middleware (customers cannot access admin routes)
- SSLCommerz payment integration with server-side verification (never simulates payments)
- SMS and email notifications for order events
- Responsive design (mobile-first), SEO metadata, Open Graph, sitemap, robots.txt
- Secure environment variable management

---

## Technology Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16.4.6 (App Router) |
| UI Library | React 19.3.0 |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS 4.3.3 |
| UI Components | shadcn/ui (@base-ui/react), lucide-react |
| Animations | framer-motion, embla-carousel-react |
| State Management | zustand, react-hot-toast |
| Database | PostgreSQL + Prisma ORM |
| Authentication | NextAuth.js (Auth.js) |
| Validation | Zod |
| Payments | SSLCommerz (Bangladesh) |
| Notifications | SMS gateway (Bangladesh) + Email |
| Images | Local filesystem (dev), S3/Cloudinary (prod) |

---

## Screenshots

> Add screenshots here after running the app:
> - Homepage
> - Products page
> - Product details
> - Cart & Checkout
> - Admin Dashboard
> - Admin Order Management
> - Customer Account

---

## Folder Structure

```
naru/
├── prisma/schema.prisma        # Database schema
├── src/app/                    # Next.js App Router pages
├── src/components/             # React components
├── src/lib/                    # Utility libraries (prisma, auth, payments, notifications)
├── src/types/                  # TypeScript types
├── src/hooks/                  # Custom React hooks
├── public/images/              # Product images
├── .env.example                # Environment variable template
└── .env.local                  # Local secrets (gitignored)
```

---

## Installation Instructions

### Prerequisites
- Node.js 18 or higher
- npm (or yarn/pnpm)
- PostgreSQL database (local or hosted)
- SSLCommerz merchant account (sandbox for testing, live for production)
- SMS gateway account (Bangladesh provider)

### 1. Clone and install dependencies

```bash
cd naru
npm install
```

### 2. Set up environment variables

Copy the example file and fill in your values:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your database URL, NextAuth secret, SSLCommerz credentials, SMS credentials, and admin contact info.

**Never commit `.env.local` or share real API keys.**

### 3. Set up the database

```bash
npx prisma migrate dev
npx prisma generate
```

### 4. Seed the database

Run the seed script to create categories, products, and an admin user:

```bash
npm run db:seed
```

### 5. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Environment Setup

Create `.env.local` based on `.env.example`. Required variables:

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@localhost:5432/naru` |
| `NEXTAUTH_SECRET` | Random secret for NextAuth JWT | `openssl rand -base64 32` |
| `NEXTAUTH_URL` | Site URL | `http://localhost:3000` |
| `SSLCOMMERZ_STORE_ID` | SSLCommerz store ID | `naruhouse670` |
| `SSLCOMMERZ_STORE_PASSWORD` | SSLCommerz store password | `...` |
| `SSLCOMMERZ_SANDBOX` | `true` for sandbox, `false` for live | `true` |
| `SMS_PROVIDER_API_KEY` | SMS gateway API key | `...` |
| `SMS_PROVIDER_API_SECRET` | SMS gateway API secret | `...` |
| `ADMIN_PHONE_NUMBER` | Admin phone for order alerts | `+8801XXXXXXXXX` |
| `ADMIN_EMAIL` | Admin email for notifications | `admin@naruhouse.com` |
| `ADMIN_DEFAULT_PASSWORD` | Initial admin password | `ChangeMe123!` |

See `.env.example` for the full template.

---

## Database Setup

```bash
# Create and run migrations
npx prisma migrate dev --name init

# Generate Prisma Client
npx prisma generate

# Open Prisma Studio (database GUI)
npx prisma studio
```

The schema includes models: User, Category, Product, ProductImage, Cart, Order, OrderItem, Payment, Address, Notification, OrderStatusHistory, AdminSetting.

---

## Development Commands

```bash
npm run dev        # Start dev server (Turbopack)
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint
npx prisma migrate dev   # Run database migrations
npx prisma studio        # Open Prisma Studio
```

---

## Build Instructions

```bash
npm run build
npm run start
```

The production build outputs to `.next/`. Deploy to Vercel, Railway, DigitalOcean App Platform, or any Node.js hosting with PostgreSQL.

---

## Deployment Guide

1. Push code to your Git repository.
2. Connect your hosting platform (Vercel recommended).
3. Add all environment variables from `.env.example` to the hosting platform.
4. Provision a PostgreSQL database and set `DATABASE_URL`.
5. Run `npx prisma migrate deploy` on deployment.
6. Seed the database (admin user, categories, products).
7. Configure SSLCommerz live credentials (sandbox → live).
8. Configure SMS gateway live credentials.
9. Verify admin login and test a full order flow.

---

## Admin Setup Instructions

1. After seeding, an admin user is created with the email/password from your seed script (or `ADMIN_DEFAULT_PASSWORD`).
2. Log in at `/admin/login` (or `/login` with admin role).
3. Configure notification settings in the admin dashboard (phone number, email, SMS provider).
4. Add categories and products via the admin dashboard.
5. Upload product images (local storage in dev; configure S3/Cloudinary for production).
6. Monitor new orders via the dashboard notifications panel and SMS alerts.

---

## Payment Gateway Setup (SSLCommerz — Bangladesh)

Naru House integrates SSLCommerz for online payments in Bangladesh.

1. Create a merchant account at [SSLCommerz](https://www.sslcommerz.com/).
2. Complete merchant verification (required for live payments).
3. Obtain `Store ID` and `Store Password`.
4. Set `SSLCOMMERZ_SANDBOX=true` for testing, `false` for live.
5. Configure success/fail/cancel URLs in your SSLCommerz merchant panel pointing to your `/api/payment/sslcommerz/callback` endpoint.
6. **Important:** Payments are verified server-side before an order is marked as paid. No successful payment is ever simulated.

### Cash on Delivery
COD is always available as a payment option and does not require external credentials.

---

## Notification Setup

### SMS (Bangladesh)
Configure a Bangladesh SMS gateway (e.g., a local SMS provider API). Set:
- `SMS_PROVIDER_API_KEY`
- `SMS_PROVIDER_API_SECRET`
- `ADMIN_PHONE_NUMBER` (E.164 format, e.g. `+8801XXXXXXXXX`)

New orders trigger an SMS to the admin's configured phone number.

### Email
Set `ADMIN_EMAIL` for email notifications. Email sending is abstracted so you can plug in Nodemailer, Resend, SendGrid, or similar.

---

## Security

- Admin routes protected by Next.js middleware (server-side RBAC).
- All API mutations validated server-side with Zod.
- Prices recalculated server-side; client-provided prices are never trusted.
- Passwords hashed with bcryptjs.
- Idempotency keys prevent duplicate order submissions.
- Secrets stored in `.env.local` (gitignored); never exposed to the browser.

---

## License

Private project. All rights reserved.
