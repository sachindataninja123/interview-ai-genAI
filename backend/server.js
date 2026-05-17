const app = require("./src/app");
const config = require("./src/config/config");
const connectToDb = require("./src/db/db");

connectToDb();

const PORT = config.PORT || 8000;

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
