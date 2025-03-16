const express = require("express");
const app = express();
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
const plantRoute = require("./routes/plantRoute.cjs");
const chatbotRoute = require("./routes/chatbotRoute.cjs");

dotenv.config({ path: path.resolve(__dirname, "../.env") });
console.log(
  "DB Variables:",
  process.env.DB_HOST,
  process.env.DB_USER,
  process.env.DB_NAME
);

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/login", require("./routes/loginRoute.cjs"));
app.use("/register", require("./routes/registerRoute.cjs"));
app.use("/users", require("./routes/userRoute.cjs"));

app.use("/api/listPlants", plantRoute);
app.use("/api", chatbotRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
