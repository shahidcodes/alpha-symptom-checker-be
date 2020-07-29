const request = require("request-promise");
const express = require("express");
const app = express();

const ApiMedicHost = "https://sandbox-healthservice.priaid.ch";
const AuthHost = "https://sandbox-authservice.priaid.ch";

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send({ ok: 1 });
});

app.post("/login", (req, res) => {
  request({
    method: "POST",
    uri: `${AuthHost}/login`,
    headers: req.headers,
    json: true
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

app.post("/symptoms", (req, res) => {
  request({
    method: "GET",
    uri: `${ApiMedicHost}/symptoms`,
    headers: req.headers,
    json: true,
    query: req.query
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

app.post("/diagnosis", (req, res) => {
  request({
    method: "GET",
    uri: `${ApiMedicHost}/diagnosis`,
    headers: req.headers,
    json: true,
    query: req.query
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
