require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const routes = require("./routes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

<<<<<<< HEAD
const allowedOrigins = (process.env.CORS_ORIGIN || "http://localhost:5173")
=======
const allowedOrigins = (process.env.CORS_ORIGIN || "http://10.206.155.19:4000")
>>>>>>> 4b6e5b825f6b4f5114de5740c8a8ba68a741b8e6
  .split(",")
  .map((o) => o.trim());

app.use(cors({ origin: allowedOrigins }));
app.use(express.json());
app.use(morgan("dev"));

app.use("/api", routes);

app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

app.use(errorHandler);

<<<<<<< HEAD
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Zentrapay API listening on http://localhost:${PORT}`);
=======
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Zentrapay API listening on http://10.206.155.19:${PORT}`);
>>>>>>> 4b6e5b825f6b4f5114de5740c8a8ba68a741b8e6
});
