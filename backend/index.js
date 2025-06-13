require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const routes = require("./routes/index");

const app = express();

//wiekszy limit dla zdjec
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/user", routes);
app.use("/api/contact", require("./routes/contact"));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
    console.log("Database name:", mongoose.connection.name);
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Backend on port ${PORT}`));
app.get("/", (req, res) => res.send("Hello from backend"));
