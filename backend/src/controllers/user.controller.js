const tokenModel = require("../models/blacklistToken.model");
const userModel = require("../models/user.model");

const jwt = require("jsonwebtoken");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/generateToken");
const config = require("../config/config");

const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(404).json({
        message: "name, email, password are required!",
        success: false,
      });
    }

    const user = await userModel.findOne({ email });
    if (user) {
      return res.status(404).json({
        message: "User already exists!",
        success: false,
      });
    }

    const newUser = await userModel.create({
      name,
      email,
      password,
    });

    const safeUser = await userModel.findById(newUser._id).select("-password");

    return res.status(201).json({
      message: "User register successfully",
      success: true,
      safeUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: error.message,
    });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).json({
        message: "email, password are required!",
        success: false,
      });
    }

    const user = await userModel.findOne({ email }).select("+password");
    if (!user) {
      return res.status(404).json({
        message: "User doesn't exists!",
        success: false,
      });
    }

    const isValidUser = await user.comparePassword(password);
    if (!isValidUser) {
      return res.status(401).json({
        message: "Invalid email & password",
        success: false,
      });
    }

    const safeUser = await userModel.findById(user._id).select("-password");

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false, // true in production
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7days
    });

    return res.status(200).json({
      message: "User login successfully",
      success: true,
      user: safeUser,
      accessToken: accessToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: error.message,
    });
  }
};

const profileController = async (req, res) => {
  try {
    return res.status(200).json({
      message: "User fetched successfully",
      success: true,
      user: req.user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: error.message,
    });
  }
};

const logoutController = async (req, res) => {
  try {
    const accessToken = req.headers.authorization?.split(" ")[1];

    await tokenModel.create({ token: accessToken });

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });

    return res.status(200).json({
      message: "User logout successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: error.message,
    });
  }
};

const refreshTokenController = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(400).json({
        message: "refreshToken is missing",
        success: false,
      });
    }

    const decoded = jwt.verify(refreshToken, config.JWT_REFRESH_SECRET_KEY);
    const accessToken = generateAccessToken(decoded.userId);

    return res.status(200).json({
      message: "accessToken token refreshed",
      success: true,
      accessToken: accessToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  registerController,
  loginController,
  profileController,
  logoutController,
  refreshTokenController,
};
