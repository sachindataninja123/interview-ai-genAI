const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/user.routes");
const cookieparser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(cookieparser());

app.get("/", (req, res) => {
  res.send("server started");
});

app.use("/api/users", userRouter);

module.exports = app;
