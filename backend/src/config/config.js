require("dotenv").config();

const config = {
  MONGO_URL: process.env.MONGO_URL,
  PORT: process.env.PORT,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  JWT_REFRESH_SECRET_KEY: process.env.JWT_REFRESH_SECRET_KEY,
 
  GROQ_API_KEY: process.env.GROQ_API_KEY,
};

if (!config.MONGO_URL) {
  throw new Error("MONGO_URL is not defined in environment variables");
}

if (!config.PORT) {
  throw new Error("PORT is not defined in environment variables");
}

if (!config.JWT_SECRET_KEY) {
  throw new Error("JWT_SECRET_KEY is not defined in environment variables");
}

if (!config.JWT_REFRESH_SECRET_KEY) {
  throw new Error(
    "JWT_REFRESH_SECRET_KEY is not defined in environment variables",
  );
}

if (!config.GROQ_API_KEY) {
  throw new Error("GROQ_API_KEY is not defined in environment variables");
}

module.exports = config;
