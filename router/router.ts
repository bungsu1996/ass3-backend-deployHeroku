import express, { Router } from "express";

import { userRouter } from "./user.routes";
import { keranjangRouter } from "./keranjang.routes";
import { itemRouter } from "./item.routes";

class Routes {
  public router: Router;
  constructor() {
    this.router = Router();
    this.itemRoute();
    this.userRoute();
    this.keranjangRoute();
  }
  public userRoute = () => {
    this.router.use(userRouter);
  };
  public keranjangRoute = () => {
    this.router.use(keranjangRouter);
  };
  public itemRoute = () => {
    this.router.use(itemRouter);
  };
}

export default new Routes().router;
