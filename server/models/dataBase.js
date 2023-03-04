import mongoose from "mongoose";

const uri = "mongodb://127.0.0.1:27017/react_mern_2023";

const option = {
  useNewUrlParser: true,
  useUniFiedTopology: true,
};

mongoose.connect(uri, option);

const db = mongoose.connection;

export default db;
