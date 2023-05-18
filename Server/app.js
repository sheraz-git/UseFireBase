const express = require("express");
const cors = require("cors");
const app = express();
const bodyparser = require("body-parser");
const port = 3000;
const mainRoute = require("./Routes/Adminroute");

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.use(cors({ 
  origin: "http://localhost:3001",
  optionsSuccessStatus: 200
}));

app.listen(port, () => {
  console.log("Server is running on port", port);
});

app.get("/", (req, res) => {
  return res.status(200).json({
    message: "worked fine",
  });
});

app.use("/api", mainRoute, (req, res) => {
  res.status(404).json({
    success: false,
    message: "Page not found",
    error: {
      statusCode: 404,
      message: "You reached a route that is not defined on this server",
    },
  });
});