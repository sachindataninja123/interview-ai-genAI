const express = require("express");
const {
  registerController,
  loginController,
  profileController,
  logoutController,
  refreshTokenController,
} = require("../controllers/user.controller");
const { isAuth } = require("../middlewares/isAuth.middleware");

const userRouter = express.Router();

userRouter.post("/register", registerController);
userRouter.post("/login", loginController);
userRouter.get("/profile", isAuth, profileController);
userRouter.post("/logout", isAuth, logoutController);
userRouter.post("/refresh-token", refreshTokenController);

module.exports = userRouter;
