# 🛍️ Next.js E-Commerce Frontend (Fashion Store)

A minimal, modern e-commerce frontend built using **Next.js**, **TypeScript**, **Tailwind CSS**, and **Zustand**.  
This app supports a **3-level nested category structure**, dynamic product routing, internal mock APIs, and a global cart system.

---

## ✨ Features

- ✅ **Next.js with TypeScript**
- ✅ **3-Level Category Navigation** (e.g. Clothing > Men > Shirts)
- ✅ Dynamic Routes using App Router
- ✅ Server-side rendering with `getServerSideProps`
- ✅ Internal API routes for categories and products
- ✅ Global state management with Zustand (for cart)
- ✅ Styled with Tailwind CSS
- ✅ Responsive and modern UI
- ✅ Add to cart, view cart, and dynamic product detail page

---

## 📁 Folder Structure

```
src/
├── pages/
│   ├── index.tsx                  # Homepage with top-level categories
│   ├── cart.tsx                   # Cart page
│   ├── product/[id].tsx           # Product detail page
│   └── category/[...slug].tsx     # Dynamic nested category route
├── data/
│   ├── categories.ts              # Mock category data (3 levels)
│   └── products.ts                # Mock product data
├── store/
│   └── cartStore.ts               # Zustand cart logic
├── components/
│   └── Navbar.tsx                 # Shared navigation
```

---

## 🧪 Mock Data Structure

- `categories.ts` uses 3 nested levels:
  - Clothing
    - Men → Shirts, Pants
    - Women → Dresses, Skirts

- `products.ts` contains real product data mapped to 3rd-level category IDs.

---

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

### 3. Visit the App

```bash
http://localhost:3000
```

---

## 🧰 Tech Stack

- **Next.js** (Pages Router)
- **TypeScript**
- **Tailwind CSS**
- **Zustand** (global cart state)
- **Axios** (for internal API calls)

---

## 🖼️ Image Setup

- Place your product images in `/public/images/`
- Reference them in `products.ts` like:
  ```ts
  image: '/images/my-shirt.jpg'
  ```

---

## 📝 Assignment Objectives Covered

- ✅ Build homepage with top-level categories
- ✅ Handle 3-level nested dynamic routing via `[...slug].tsx`
- ✅ Display products per category
- ✅ Add to cart and cart management
- ✅ Product detail page routing
- ✅ Use TypeScript interfaces for structure
- ✅ Internal mock APIs (`/api/categories`, `/api/products`)

---

## 📦 Deployment

## Deployed on Vercel link - 

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---
