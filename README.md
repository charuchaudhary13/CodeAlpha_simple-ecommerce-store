
# 🛒 Simple E-commerce Store

A simple and fully functional e-commerce web app built with Node.js, Express, MongoDB, and Bootstrap. Users can browse products, manage cart items, and register/login securely.

🔗 **Live Demo**: [View Site on Render](https://codealpha-simple-ecommerce-store.onrender.com)

---

## ⚙️ Tech Stack

- **Backend**: Node.js + Express
- **Database**: MongoDB Atlas + Mongoose
- **Authentication**: express-session
- **Frontend**: HTML5, CSS3, Bootstrap 5
- **View Engine**: EJS
- **Hosting**: Render

---

## ✨ Features

- ✅ Product listing page
- ✅ Add to cart with quantity selection
- ✅ Register and Login system
- ✅ Cart view with total price
- ✅ Remove items from cart
- ✅ Responsive design (Bootstrap 5)
- ✅ Dark mode toggle (coming soon)
- ✅ Secure session handling

---

## 🚀 Getting Started (Local Setup)

1. Clone the repository:

```bash
git clone https://github.com/charuchaudhary13/CodeAlpha_simple-ecommerce-store.git
cd CodeAlpha_simple-ecommerce-store
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file and add:

```env
MONGODB_URI=your-mongodb-connection-string
SESSION_SECRET=your-random-secret
```

4. Start the server:

```bash
node server.js
```

> Visit: http://localhost:3000

---

## 📁 Folder Structure

```
.
├── models/         # Mongoose models
├── public/         # Static assets (CSS, JS, images)
├── routes/         # All Express routes
├── views/          # EJS templates
├── .env            # Environment variables
├── server.js       # Entry point
└── package.json    # App metadata and dependencies
```

---

## ✅ To-Do / Improvements

- [ ] Add product search & filter
- [ ] Add product categories
- [ ] Dark mode toggle
- [ ] Save user carts in MongoDB

---

## 📄 License

This project is open-source and free to use under the MIT License.

---

## 🙌 Acknowledgements

Built as part of the CodeAlpha Internship Project ✨
