const express = require("express");
const app = express();
const env = require("dotenv");
env.config({ path: "./config/.env" });
const db = require("./config/db.js");
const colors = require("colors");
const userRoute = require("./routes/user-route");
const cors = require("cors");
const productRoute = require("./routes/product-route");
const authRoute = require("./routes/auth-route");
const orderRoute = require("./routes/order-route");
const { error404, errorHandler } = require("./middlewares/error.middlewares.js");
db();
// body parse
app.use(express.json());
// body parse end
app.use(cors());

app.use(express.static("public/"));

app.use("/api/user", userRoute);
app.use("/api/product", productRoute);
app.use("/api/auth", authRoute);
app.use("/api/order", orderRoute);
const { PORT } = process.env;
app.listen(PORT, () =>
  console.log(`http://localhost:${PORT}`)
);

app.use(error404)
app.use(errorHandler)
