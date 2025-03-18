const express = require("express");
const app = express();
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
const plantRoute = require("./routes/plantRoute.cjs");
const chatbotRoute = require("./routes/chatbotRoute.cjs");

dotenv.config({ path: path.resolve(__dirname, "../.env") });


const PORT = process.env.PORT || 3002;

app.use(cors({ origin: "http://localhost:5173" })); // Make sure this matches your frontend URL
app.use(express.json());

app.use("/login", require("./routes/loginRoute.cjs"));
app.use("/register", require("./routes/registerRoute.cjs"));
app.use("/users", require("./routes/userRoute.cjs"));
app.use("/comments", require("./routes/commentsRoute.cjs"));

app.use("/api/listPlants", plantRoute);
app.use("/api", chatbotRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
