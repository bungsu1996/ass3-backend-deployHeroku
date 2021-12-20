import app from "./app";
import { Application } from "express";
import dotenv from "dotenv"
dotenv.config()
class Server {
  public app: Application;
  constructor() {
    this.app = app;
  }
}

const server = new Server().app
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server Running At  ${port}`);
});