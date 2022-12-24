const express = require("express");
const cors = require("cors");
const { test, register, login, checkUser } = require("./src/controller/auth");
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

app.get("/test", test);
app.post("/register", register);
app.post("/login", login);
app.get("/check?", checkUser);

app.listen(3000, () => {
  console.log("app running at port 3000");
});
