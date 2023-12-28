const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;

const userRoutes = require("./routes/user-routes");
const eventRoutes = require("./routes/event-routes");

app.use(cors());
app.use(express.json());

app.use("/users", userRoutes);
app.use("/events", eventRoutes);

// serve static files from images folder
app.use("/images", express.static("./images"));

//to test get request to localhost:8080
app.get("/", (_req, res) => {
  console.log("Welcome to my server!!");
  res.send("Yay, it worked!!!");
});

app.listen(PORT, () => {
  console.log(`App running at http://localhost:${PORT}`);
});
