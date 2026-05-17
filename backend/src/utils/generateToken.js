const jwt = require("jsonwebtoken");
const config = require("../config/config");

const generateAccessToken = (userId) => {
  try {
    const accessToken = jwt.sign({ userId }, config.JWT_SECRET_KEY, {
      expiresIn: "15m",
    });
    return accessToken;
  } catch (error) {
    console.log("Generate accessToken error", error);
  }
};

const generateRefreshToken = (userId) => {
  try {
    const refreshToken = jwt.sign({ userId }, config.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });
    return refreshToken;
  } catch (error) {
    console.log("Generate refreshToken error", error);
  }
};

module.exports = { generateAccessToken, generateRefreshToken };
