const express = require('express');
const app = express();
const port = 3001;
const mainRouter = require("./routes/index");
const connect = require("./schemas/index");
connect()

app.use(express.json());
app.use("/", [mainRouter]);


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(port, '포트로 서버가 열렸어요!');
});