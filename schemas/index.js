const mongoose = require("mongoose");
mongoose.set('strictQuery',true)

const connect = () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017/node_new1")
    .catch(err => console.log(err));
};

mongoose.connection.on("error", err => {
  console.error("몽고디비 연결 에러", err);
});

module.exports = connect;