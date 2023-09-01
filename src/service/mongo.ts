import mongoose from "mongoose";

export async function connectToDB() {
  try {
    // const url = process.env.MONGO_SERVER + process.env.MONGO_DATABASE;
    // await mongoose.connect(url, { dbName: process.env.MONGO_DATABASE });
    // console.log(url);
    switch (mongoose.connection.readyState) {
      case 1:
      case 2:
        // console.log("mongoose connected already");
        break;

      default:
        const url = process.env.MONGO_SERVER || "" + process.env.MONGO_DATABASE;
        await mongoose.connect(url, { dbName: process.env.MONGO_DATABASE });
        // console.log(url);
    }
  } catch (error) {
    // console.log("from mongo");
    // process.exit(1);
  }
}
