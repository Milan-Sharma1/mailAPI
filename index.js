const express = require("express");
const { mailer } = require("./mail");
app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/mail", mailer);

app.listen(process.env.PORT || 8000, () => {
  console.log(`App Started at port ${process.env.PORT}`);
});
