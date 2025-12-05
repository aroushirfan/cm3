require("dotenv").config();

const PORT = process.env.PORT;
const DEPLOY_MONGO_URI =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGO_URI
    : process.env.DEPLOY_MONGO_URI;

module.exports = {
  DEPLOY_MONGO_URI,
  PORT,
};
