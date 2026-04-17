require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const { connectDB } = require("../config/db");

const productRoutes = require("../routes/productRoutes");
const customerRoutes = require("../routes/customerRoutes");
const adminRoutes = require("../routes/adminRoutes");
const orderRoutes = require("../routes/orderRoutes");
const customerOrderRoutes = require("../routes/customerOrderRoutes");
const categoryRoutes = require("../routes/categoryRoutes");
const couponRoutes = require("../routes/couponRoutes");
const attributeRoutes = require("../routes/attributeRoutes");
const settingRoutes = require("../routes/settingRoutes");
const currencyRoutes = require("../routes/currencyRoutes");
const languageRoutes = require("../routes/languageRoutes");
const notificationRoutes = require("../routes/notificationRoutes");
const leadRoutes = require("../routes/leadRoutes");
const blogRoutes = require("../routes/blogRoutes");
const serviceRoutes = require("../routes/serviceRoutes");
const commentRoutes = require("../routes/commentRoutes");
const reviewRoutes = require("../routes/reviewRoutes");
const batteryServiceRoutes = require("../routes/batteryServiceRoutes");
const shortVideoRoutes = require("../routes/shortVideoRoutes");

const { isAuth } = require("../config/auth");

const app = express();

app.set("trust proxy", 1);

// ✅ CONNECT DB ONCE (not per request)
connectDB();

// ✅ MIDDLEWARES
app.use(express.json({ limit: "4mb" }));
app.use(helmet());

// ✅ ALLOWED ORIGINS
const allowedOrigins = [
  "http://elecmoon.vastoratech.com",
  "https://elecmoon.vastoratech.com"
];

// ✅ CORS CONFIG
app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (mobile apps, Postman)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("CORS not allowed: " + origin));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"]
}));

// ✅ HANDLE PREFLIGHT REQUESTS
app.options("*", cors());

// ✅ ROOT ROUTE
app.get("/", (req, res) => {
  res.send("App works properly!");
});

// ✅ ROUTES
app.use("/api/products", productRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/coupon", couponRoutes);
app.use("/api/customer", customerRoutes);
app.use("/api/order", isAuth, customerOrderRoutes);
app.use("/api/attributes", attributeRoutes);
app.use("/api/setting", settingRoutes);
app.use("/api/currency", isAuth, currencyRoutes);
app.use("/api/language", languageRoutes);
app.use("/api/notification", isAuth, notificationRoutes);
app.use("/api/leads", leadRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/battery-service", batteryServiceRoutes);
app.use("/api/short-videos", shortVideoRoutes);

// ADMIN
app.use("/api/admin", adminRoutes);
app.use("/api/orders", orderRoutes);

// ✅ STATIC FILES
app.use("/static", express.static("public"));

// ✅ ERROR HANDLER
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  if (res.headersSent) return next(err);

  res.status(400).json({
    success: false,
    message: err.message
  });
});

// ✅ SERVER START
const PORT = process.env.PORT || 5058;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
