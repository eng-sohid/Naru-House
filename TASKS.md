# TASKS.md - Naru House Task Checklist

## Phase 1: Project Inspection and Documentation — COMPLETED
- [x] Inspect existing project structure
- [x] Read package.json and dependencies
- [x] Read all pages, components, layouts, styles, assets
- [x] Identify empty/placeholder files
- [x] Identify missing features (database, auth, API routes, payments, admin, customer account)
- [x] Create AGENTS.md
- [x] Create TASKS.md
- [x] Create PROGRESS.md
- [x] Improve README.md
- [x] Produce project audit

## Phase 2: Architecture and Database Setup — IN PROGRESS
- [x] Install Prisma + @prisma/client + bcryptjs + next-auth + zod + date-fns
- [x] Create prisma/schema.prisma (all models)
- [x] Create .env.example
- [x] Create .env.local (local secrets, gitignored)
- [x] Create Prisma client singleton (src/lib/prisma.ts)
- [ ] Set up PostgreSQL database (DATABASE_URL) — BLOCKED: PostgreSQL not installed in this environment
- [ ] Run npx prisma generate
- [ ] Run npx prisma migrate dev
- [ ] Create database seed script (prisma/seed.ts)
- [ ] Seed database (categories, products, admin user)

## Phase 3: Authentication and Authorization — PENDING
- [ ] Configure NextAuth.js (credentials provider, JWT strategy) — DONE (src/lib/auth.ts)
- [ ] Create NextAuth API route — DONE (src/app/api/auth/[...nextauth]/route.ts)
- [ ] Create Next.js middleware for RBAC — DONE (src/middleware.ts)
- [ ] Customer registration page & API
- [ ] Customer login page
- [ ] Customer logout
- [ ] Admin login
- [ ] Protected routes (admin, customer)

## Phase 4: Dynamic Product Management — PENDING
- [ ] API routes: products (GET list, GET single, POST create, PUT update, DELETE)
- [ ] API routes: categories (GET, POST, PUT, DELETE)
- [ ] Product image upload API
- [ ] Product listing from database (replace hardcoded in /products)
- [ ] Product details from database (replace hardcoded in /products/[id])
- [ ] Search, filter by category, sort by price
- [ ] Stock status display

## Phase 5: Shopping Cart and Custom Naru Builder — PENDING
- [ ] Server-persisted cart (database Cart model) + API routes
- [ ] Replace localStorage cart with server cart
- [ ] Custom Naru order feature (Naru type, quantity, package size, options, instructions, delivery)
- [ ] Dynamic price calculation based on options
- [ ] Admin-configured customization options only

## Phase 6: Checkout and Order Management — PENDING
- [ ] Checkout API with server-side validation (Zod)
- [ ] Order creation with OrderStatusHistory
- [ ] Server-side price recalculation (no client-trusted prices)
- [ ] Stock validation & decrement on order
- [ ] Idempotency to prevent duplicate submissions
- [ ] Order tracking page (authenticated + reference)
- [ ] Order cancellation where permitted

## Phase 7: Payment Gateway Integration — PENDING
- [ ] SSLCommerz integration (server-side session initiation)
- [ ] Payment verification server-side before marking paid
- [ ] Cash on Delivery option
- [ ] Payment callbacks/webhooks handling
- [ ] Payment model & records

## Phase 8: Admin Dashboard — PENDING
- [ ] Admin layout with responsive sidebar
- [ ] Dashboard overview (revenue, orders, products, customers, pending/processing/delivered counts)
- [ ] Sales analytics & revenue charts
- [ ] Recent orders list
- [ ] Product management (add, edit, delete, upload images, prices, descriptions, stock, featured, active/inactive)
- [ ] Category management
- [ ] Order management (view all, search, filter, view details, update status, confirm, ship, deliver, cancel)
- [ ] Customer management (view registered customers, profiles, order history, search)
- [ ] Admin notifications panel

## Phase 9: SMS, Email and Real-Time Notifications — PENDING
- [ ] SMS notification service (configurable Bangladesh gateway)
- [ ] Email notification service
- [ ] New order alert to admin (SMS + dashboard + email)
- [ ] Admin notification settings (configurable phone, email, provider)
- [ ] Customer order status change notifications
- [ ] Real-time notifications (Server-Sent Events or polling)

## Phase 10: Customer Account and Order Tracking — PENDING
- [ ] Customer profile page
- [ ] Saved addresses (add, edit, delete, set default)
- [ ] Order history page
- [ ] Order details page
- [ ] Order status flow: Pending → Confirmed → Processing → Shipped → Delivered (+ Cancelled, Failed)
- [ ] Order tracking by reference (guest tracking)
- [ ] Order cancellation where permitted

## Phase 11: SEO, Performance and Responsive Optimization — PENDING
- [ ] Dynamic page metadata (title, description)
- [ ] Open Graph metadata
- [ ] sitemap.xml
- [ ] robots.txt
- [ ] Optimized images (next/image)
- [ ] Loading states, error states, empty states
- [ ] Accessible UI (semantic HTML, ARIA)
- [ ] Responsive testing (mobile, tablet, laptop, desktop)
- [ ] No horizontal overflow

## Phase 12: Testing and Deployment Preparation — PENDING
- [ ] Test all customer features end-to-end
- [ ] Test all admin features end-to-end
- [ ] Test payment flow (sandbox)
- [ ] Test SMS notifications
- [ ] Fix bugs & TypeScript errors
- [ ] npm run build verification
- [ ] Deployment guide finalized
