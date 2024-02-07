import mongoose from "mongoose";

mongoose.set("strictQuery", true);

const DataBaseConnect = async (url) => {
  return mongoose.connect(url);
};

export default DataBaseConnect;
