const express = require("express");
const { getJoke, getJokesTypes } = require("./services/jokes");
const path = require("path");

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", async (req, res) => {
  res.sendFile(path.join(__dirname, "/index.html"));
});

app.get("/getJoke", async (req, res) => {
  res.json({ data: await getJoke(req.query.jokesType, req.query.jokes) });
});

app.get("/getJokesTypes", async (req, res) => {
  res.json({ data: await getJokesTypes() });
});

app.get("*", function (req, res) {
  res.status(404).send("404");
});

app.listen(port, () => {
  console.log(`Joke Server listening at http://localhost:${port}`);
});
