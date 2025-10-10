const createError = require("http-errors");
const express = require("express");
require("dotenv").config();
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");

const app = express();

// Connect MongoDB
connectDB();

// ===== Middlewares =====
const allowedOrigin = process.env.CORS_ORIGIN || "*";
app.use(cors({ origin: allowedOrigin, credentials: true }));

app.use(logger("dev"));
app.use(express.json());
app.use(cookieParser());

// Serve static files if any
app.use(express.static(path.join(__dirname, "public")));

// ===== Routes =====
app.use("/api", require("./routes/indexRouter"));
app.use("/api/products", require("./routes/productRouter"));
app.use("/api/categories", require("./routes/categoryRouter"));
app.use("/api/users", require("./routes/userRouter"));
app.use("/api/orders", require("./routes/orderRouter"));

app.get("/health", (req, res) => res.status(200).json({ status: "OK" }));

// Catch 404
app.use((req, res, next) => next(createError(404)));

// Error handler
app.use(errorHandler);

module.exports = app;
