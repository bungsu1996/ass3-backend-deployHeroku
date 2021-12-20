import mongoose from "mongoose";

class connectDB {
  constructor() {}
  public static connect = async () => {
    try {
      const dbPathUrl =
        "mongodb+srv://hamzah1996:hamzah1996@assigment3.e6dhy.mongodb.net/E-Commerce?retryWrites=true&w=majority";
      await mongoose.connect(`${dbPathUrl}`);
      console.log("Database Mongoose Atlas Connected");
    } catch (error) {
      console.log("Mongoose Connection Failed");
      console.error.bind(console, "Mongoose Error");
    }
  };
}

export default connectDB;
