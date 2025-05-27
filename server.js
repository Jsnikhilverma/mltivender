const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const vendorRoutes = require("./routes/vendorRoutes");
const indexRoutes = require("./routes/indexRoutes");
const cors = require("cors");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const path = require("path");

const catalogRoutes = require("./routes/catalog");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://dynamicecom-f.vercel.app",
      "http://127.0.0.1:3002",
      "http://127.0.0.1:3001",
      "http://127.0.0.1:3000",
      "https://ddc9833g-5173.inc1.devtunnels.ms",
      "https://multivendor-eta.vercel.app",
      "https://mltivender-production.up.railway.app",
      "https://lambent-tulumba-876e77.netlify.app/",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

// Middleware
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/catalog", catalogRoutes);

// Routes
app.use("/api/vendors", vendorRoutes);
app.use("/api", indexRoutes);
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
