import express, { Application, NextFunction, Request, Response } from "express";
import connectDB from "./configs/connectDB";
import cors from "cors";
import routes from "./router/router";
import { errHandler } from "./middlewares/errHandler";
import path from "path";
import morgan from "morgan";
class App {
  public app: Application;
  constructor() {
    this.app = express();
    this.plugin();
    this.route();
    this.errorHandler();
  }
  protected plugin = () => {
    connectDB.connect();
    this.app.use(cors());
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(morgan('tiny'))
    this.app.use("/uploads", express.static(path.join("uploads")));
  };
  protected route = () => {
    this.app.get("/", (req: Request, res: Response) => {
      res.header("Content-type", "text/html");
      return res.end("<h1>Al Barr Mart</h1>");
    });
    this.app.use("/albarrmart", routes);
  };
  protected errorHandler = () => {
    this.app.use(errHandler.handle);
  };
}

const app = new App().app;
export default app;
