require("dotenv").config();
require("express-async-errors");
const cookieParser = require('cookie-parser')

const connectDB = require("./DB/connectDB");

const port = process.env.PORT || 5000;

const express = require("express");
const app = express();

const userRoutes = require("./Routes/userR");

const notFoundMiddleware = require("./middleware/notFound");
const errorHandlerMiddleware = require("./middleware/errorHandler");

const cors = require('cors')

app.use(cors({
  origin: "*",
}));

app.use(cookieParser());
app.use(express.json());
app.use("/api/user", userRoutes);

app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`port is running at ${port}`);
    });
  } catch (error) {
    console.log(`somethings wrong with your port`, error);
  }
};
start();
