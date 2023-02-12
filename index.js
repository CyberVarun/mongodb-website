const { MongoClient } = require("mongodb");
const express = require("express");
const path = require("path");
const app = express();
const uri = process.env.URI; // URL of Database
const client = new MongoClient(uri);
const port = process.env.PORT || 8080;
const database = client.db("login"); // Database name
const collec = database.collection("credentials"); // Collection name

app.use(express.static(path.join(__dirname, "public"))); // To serve static files
app.use(express.json()); // To parse all data coming to server in JSON

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*"); // To allow all origins
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE"); // To allow all methods
  res.setHeader("Access-Control-Allow-Headers", "Content-Type"); // To allow all headers
  res.setHeader("Access-Control-Allow-Credentials", true); // To allow credentials
  next();
});

// function to check whether the email & pass is correct or not.
async function check(email, password) {
  var stats;
  var query = { email: email };
  var find = await collec.findOne(query); // This will check if provided email is valid or not.

  // If email is valid then only go futher else return.
  if (!find) {
    return;
  }
  // If email is valid then check for password.
  try {
    query = { email: email, password: password }; // Query to check password
    find = await collec.findOne(query); // This will check if provided password is valid or not.
    // This will verify email & password is correct or not. If correct return 200 else 404(not found) means password is incorrect.
    if (find.email == email && find.password == password) {
      stats = 200; // 200 means email & password is correct.
    } else {
      stats = 404; // 404 means password is incorrect.
    }
    return stats;
  } catch (err) {
    console.log(err);
    return;
  }
}

app.get("/", (_req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

// API to check credentials
app.post("/cred", (req, res) => {
  var cred = req.body; // To access body of request
  var email = cred.email; // To access email in body of request
  var password = cred.password; // To access password in body of request

  // Check whether email & password is correct or not.
  check(email, password).then((result) => {
    if (result == 200) {
      console.log("succes");
      res.send("200"); // Send 200 if email & password is correct.
    } else {
      console.log("failed");
      res.send("404"); // Send 404 if email & password is incorrect.
    }
  });
});

// server listening port
app.listen(port);
console.log("Server started at http://localhost:" + port);
