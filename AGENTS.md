# AGENTS.md - Naru House E-commerce Platform

## Project Overview
Naru House is a full-stack, production-ready e-commerce platform selling traditional homemade Bengali Naru (coconut sweets). It has two experiences:
1. **Customer-facing e-commerce website** — browse products, customize orders, purchase, pay, track orders.
2. **Secure Admin Dashboard** — manage products, orders, customers, notifications.

## Technology Stack
- Framework: Next.js 16.4.6 (App Router)
- React: 19.3.0
- Language: TypeScript (strict)
- Styling: Tailwind CSS 4.3.3
- UI Layer: shadcn/ui (@base-ui/react), lucide-react, framer-motion, cn, class-variance-authority
- State: zustand, react-hot-toast
- Carousel: embla-carousel-react
- Database: PostgreSQL + Prisma ORM (to be set up — see phase 2)
- Authentication: NextAuth.js (Auth.js) with credentials provider (to be set up — see phase 3)
- Validation: Zod (to be added)
- Payments: SSLCommerz (Bangladesh) — server-side verification (integration structure to be built)
- SMS: Configurable gateway for Bangladesh (to be configured)
- Image upload: Local filesystem (dev), S3/Cloudinary (production)
- Date handling: date-fns (to be added)

## Folder Structure
```
naru/
├── AGENTS.md
├── TASKS.md
├── PROGRESS.md
├── README.md
├── package.json
├── tsconfig.json
├── next.config.ts
├── components.json
├── .env.local (local, gitignored)
├── .env.example
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── public/
│   └── images/ (naru-1.jpeg, naru-2.jpeg, naru-3.jpeg, naru-hero.jpeg)
└── src/
    ├── app/
    │   ├── layout.tsx
    │   ├── page.tsx
    │   ├── globals.css
    │   ├── products/
    │   ├── cart/
    │   ├── checkout/
    │   ├── admin/          (secure, role-gated)
    │   ├── customer/       (auth-gated)
    │   └── api/            (REST API routes)
    ├── components/
    │   ├── shared/         (Navbar, Footer, Loading)
    │   ├── home/           (Hero, FeaturedNaru, WhyChooseUs, Testimonials)
    │   ├── products/       (ProductCard, ProductGrid)
    │   ├── checkout/       (CheckoutForm)
    │   ├── customizer/     (Custom Naru builder)
    │   ├── admin/          (AdminSidebar, AdminNavbar, StatCard, OrdersTable, NotificationList)
    │   ├── ui/             (shadcn base: button, card, input, select, etc.)
    │   └── context/        (CartContext)
    ├── lib/                (utils, prisma, auth, notifications, payments)
    ├── data/               (static data placeholders)
    ├── types/              (TypeScript types)
    └── hooks/              (custom hooks)
```

## Design System
- Primary Brown: `#49301f` (`--primary`)
- Accent Gold: `#c58a35` (`--secondary`)
- Background: `#fffaf1` (warm cream, `--background`)
- Foreground Text: `#392719` (`--foreground`)
- Muted Text: `#8c7c6b` (`--muted`)
- Border: `#eee3d3` (`--border`)
- Cream Surface: `#f7eddd` (`--cream`)
- Success Green: `#3c7650` (`--success`)
- Font: Geist (heading & body)

## Database Architecture (Planned Models)
- **User** — id, name, email, password (hashed), role (ADMIN/CUSTOMER), phone, addresses, createdAt, updatedAt
- **Category** — id, name, slug, description, isActive, createdAt
- **Product** — id, categoryId, name, slug, description, price, stock, isFeatured, isActive, createdAt, updatedAt
- **ProductImage** — id, productId, url, alt, isPrimary, sortOrder
- **Cart** (server-persisted) — id, userId (nullable), sessionId (nullable), items, updatedAt
- **Order** — id, orderNumber, userId, customerInfo, subtotal, deliveryCharge, total, paymentMethod, paymentStatus, orderStatus, createdAt, updatedAt
- **OrderItem** — id, orderId, productId, name, price, quantity, image
- **Payment** — id, orderId, transactionId, amount, status, provider, paidAt, rawResponse
- **Address** — id, userId, label, name, phone, address, city, postalCode, isDefault
- **Notification** — id, type, title, message, recipientId, recipientRole, read, createdAt
- **OrderStatusHistory** — id, orderId, status, changedBy, changedAt, note
- **AdminSetting** — id, key, value, description (notification settings, SMS config)

## Authentication Rules
- NextAuth.js credentials provider (email + password)
- Roles: `ADMIN`, `CUSTOMER`
- Passwords hashed with bcryptjs (never plain text)
- Session: JWT strategy
- Admin routes protected by **server-side** middleware authorization — never client-side role checks only
- Customer routes require authentication
- Public routes: home, products, product details, cart, checkout

## Admin Authorization Rules
- Middleware protects `/admin/*` — only `role === 'ADMIN'` allowed
- All `/api/admin/*` routes verify session role server-side
- Ordinary customers CANNOT access admin routes or APIs (403/401)
- Admin authorization is re-validated on every request (no trusting client tokens alone)

## API Conventions
- RESTful routes under `src/app/api/*`
- Server-side validation with Zod schemas
- Standard error response: `{ error: string, message?: string, fieldErrors? }`
- HTTP status codes: 200 OK, 201 Created, 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 409 Conflict, 500 Server Error
- No client-trusted prices — server recalculates totals from database
- Idempotency key support to prevent duplicate order submissions

## Security Rules
- Role-Based Access Control (RBAC) enforced server-side
- Protected admin routes via Next.js middleware
- Server-side authorization on every mutation
- Input validation with Zod on all API inputs
- Bcrypt password hashing (salt rounds 12)
- Rate limiting on auth endpoints (to be added)
- Secure env var management — `.env.local` gitignored, secrets never in browser
- Safe file upload validation (type, size, virus scan note)
- Protection against unauthorized order access (users see only their own orders; admins see all)
- CSRF protection via NextAuth

## Responsive Design Rules
- Mobile-first approach; mobile is a priority, not an afterthought
- Breakpoints: `sm` 640px, `md` 768px, `lg` 1024px, `xl` 1280px
- No horizontal overflow (`overflow-x: hidden` on body)
- Touch-friendly buttons (min 44px tap target)
- Readable text on all screen sizes
- Responsive navbar, mobile-friendly product grid, responsive admin sidebar, responsive tables

## Environment Variable Requirements (see .env.example)
- `DATABASE_URL` — PostgreSQL connection string
- `NEXTAUTH_SECRET` — random string for NextAuth JWT signing
- `NEXTAUTH_URL` — site URL (e.g. http://localhost:3000)
- `SSLCOMMERZ_STORE_ID` — SSLCommerz store ID (sandbox or live)
- `SSLCOMMERZ_STORE_PASSWORD` — SSLCommerz store password
- `SSLCOMMERZ_SANDBOX` — `true` for sandbox, `false` for live
- `SMS_PROVIDER_API_KEY` — SMS gateway API key
- `SMS_PROVIDER_API_SECRET` — SMS gateway API secret
- `ADMIN_PHONE_NUMBER` — admin phone for order alerts (E.164 format, e.g. +8801XXXXXXXXX)
- `ADMIN_EMAIL` — admin email for notifications
- `ADMIN_DEFAULT_PASSWORD` — initial admin password (change on first login)

## Development Commands
- `npm run dev` — Start dev server (Turbopack)
- `npm run build` — Build for production
- `npm run start` — Start production server
- `npm run lint` — Run ESLint
- `npx prisma migrate dev` — Create and run database migrations
- `npx prisma studio` — Open Prisma Studio (database GUI)
- `npx prisma generate` — Generate Prisma client

## Important Existing Files (Working)
- `src/app/layout.tsx` — Root layout with metadata & viewport
- `src/app/page.tsx` — Homepage (Navbar, Hero, FeaturedNaru)
- `src/app/products/page.tsx` — Products page (currently hardcoded — to be database-driven)
- `src/app/products/[id]/page.tsx` — Product details (currently hardcoded — to be database-driven)
- `src/app/cart/page.tsx` — Shopping cart (localStorage — to be server-persisted)
- `src/app/checkout/page.tsx` — Checkout (localStorage demo, COD only — to be real)
- `src/app/globals.css` — Design system (colors, typography, buttons, cards, responsive)
- `src/components/shared/Navbar.tsx` — Professional navbar with mobile menu
- `src/components/home/Hero.tsx` — Hero section
- `src/components/home/FeaturedNaru.tsx` — Featured products section
- `src/components/ui/*` — shadcn base UI components (button, card, badge, input, select, etc.)

## Completed Features
- Homepage with Navbar, Hero, Featured Naru
- Products listing page with search & category filter (hardcoded data)
- Product details page with quantity selector & add to cart (hardcoded data)
- Shopping cart with add/remove/update quantity & clear (localStorage)
- Checkout page with customer form & COD (localStorage demo, not real)
- Design system in globals.css (warm cream, chocolate brown, gold accents)
- Responsive navbar with mobile menu

## Pending Features
- Database (PostgreSQL + Prisma) setup & seeding
- Authentication (NextAuth) & role-based access control
- All API routes (products, orders, cart, auth, payments, notifications)
- Dynamic product data from database (replace hardcoded arrays)
- Server-persisted cart (replace localStorage)
- Real checkout with server-side validation & payment verification
- SSLCommerz payment gateway integration
- Custom Naru ordering feature (admin-configured options)
- Admin Dashboard (overview, products, orders, customers, notifications)
- Customer Account (profile, addresses, order history, tracking)
- SMS & email notifications for new orders & status changes
- SEO (sitemap, robots, Open Graph, metadata)
- Rate limiting, file upload security, comprehensive testing

## Current Development Status
Phase 1 (Inspection & Documentation) — IN PROGRESS. Documentation files being created. Implementation has not yet begun.

## Instructions for Next Session
1. Read AGENTS.md, TASKS.md, PROGRESS.md (this file).
2. Install dependencies: `npm install prisma @prisma/client bcryptjs next-auth zod date-fns` and `npm install -D prisma`.
3. Create `prisma/schema.prisma` with all models listed above.
4. Create `.env.example` and `.env.local` with required variables.
5. Set up PostgreSQL database and run `npx prisma migrate dev`.
6. Seed database with categories, products, and an admin user.
7. Configure NextAuth (`src/lib/auth.ts`, `src/app/api/auth/[...nextauth]/route.ts`).
8. Create middleware for RBAC (`src/middleware.ts`).
9. Continue per TASKS.md phase order.