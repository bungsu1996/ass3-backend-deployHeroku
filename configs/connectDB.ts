import mongoose from "mongoose";

class connectDB {
  constructor() {}
  public static connect = async () => {
    try {
      const dbPathUrl =
        "mongodb+srv://hamzah1996:hamzah1996@assigment3.e6dhy.mongodb.net/E-Commerce?retryWrites=true&w=majority";
      const connectOptions = {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      };
      await mongoose.connect(`${dbPathUrl}`);
      console.log("Database Mongoose Atlas Connected");
    } catch (error) {
      console.log(error);
    }
  };
}

export default connectDB;
