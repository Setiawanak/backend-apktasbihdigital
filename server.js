const express = require("express");
const cors = require("cors");
const { test, register, login, checkUser } = require("./src/controller/auth");
const {
  createHistory,
  getAllHistoryByUserId,
} = require("./src/controller/multiController");
const app = express();

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.get("/", (req, res) => {
  res.send("Hello World");
});

// get , post , create
app.get("/test", test);
app.post("/register", register);
app.post("/login", login);
app.get("/check?", checkUser);

app.post("/history", createHistory);

app.get("/history?", getAllHistoryByUserId);

// Jalanin server dari port 3000
app.listen(3000, () => {
  console.log("app running at port 3000");
});
