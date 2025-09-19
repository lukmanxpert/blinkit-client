# 🛒 BlinkIt – MERN Stack E-Commerce Website

BlinkIt is a **full-stack eCommerce web application** built with the **MERN stack** (MongoDB, Express, React, Node.js).  
It allows users to browse products by categories and subcategories, add items to cart, and place orders using **Stripe online payments** or **Cash on Delivery (COD)**.

🔗 **Live Demo**: [BlinkIt Client](https://blinkit-client-drab.vercel.app)

---

## ✨ Features

- 🔐 **Authentication System** – Custom Login & Register functionality
- 📦 **Product Management** – Browse products by category & sub-category
- 🛍️ **Cart & Checkout** – Add to cart, place orders
- 💳 **Payment Options** – Stripe integration & Cash on Delivery
- 🔎 **Search with Lazy Loading** – Optimized product search with infinite scroll
- 📱 **Responsive UI** – Works seamlessly on desktop & mobile
- 🔔 **Toasts & Notifications** – Real-time updates with `react-hot-toast`
- ⚡ **Fast & Optimized** – Powered by **Vite** & **TailwindCSS**

---

## 🛠️ Tech Stack

**Frontend:**

- React 19
- React Router 7
- Redux Toolkit
- Tailwind CSS 4 + DaisyUI
- Axios
- React Hook Form
- React Infinite Scroll Component

**Backend:**

- Node.js
- Express.js
- MongoDB (with native driver / ODM you used)
- Stripe Payment Gateway

**Deployment:**

- **Frontend:** Vercel
- **Backend:** (Your backend hosting, e.g. Vercel/Render/Heroku)

---

## 🚀 Getting Started

### 1️⃣ Clone the repository

```bash
git clone https://github.com/yourusername/blinkit.git
cd blinkit
```

### 2️⃣ Install dependencies

```bash
# Install frontend dependencies
cd client
npm install

# Install backend dependencies
cd ../server
npm install
```

### 3️⃣ Set up environment variables

Create a `.env` file in your **server** directory and add:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
```

For **client**, create `.env` and add:

```env
VITE_API_URL=http://localhost:5000
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
```

### 4️⃣ Run the development servers

```bash
# Run backend
cd server
npm run dev

# Run frontend
cd ../client
npm run dev
```

Open 👉 `http://localhost:5173`

---

## 👨‍💻 Admin Credentials (For Testing)

Use the following credentials to log in as **Admin**:

- **Email:** `lukmanmiah2004@gmail.com`
- **Password:** `111111`

---

## 📸 Screenshots

### Invoice Example

![Home Page](https://i.ibb.co/Rk4d2mfq/Screenshot-1.png)

### Dashboard

![Dashboard](https://i.ibb.co/yFP3r674/Screenshot-2.png)

---

## 📦 Deployment

The project is deployed on **Vercel**:  
🔗 [BlinkIt Live](https://blinkit-client-drab.vercel.app)

---

## 🙌 Contributing

Contributions, issues, and feature requests are welcome!  
Feel free to fork this repo and submit a pull request.

---

## 📜 License

This project is licensed under the **MIT License**.
