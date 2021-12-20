import { Express, Router } from "express";
import keranjangController from "../controllers/keranjang.controller";

class keranjangRoutes {
  public keranjangRoute: Router;
  constructor() {
    this.keranjangRoute = Router();
    this.addToCart();
  }
  public addToCart = () => {
    this.keranjangRoute.post(
      "/masukkanKeranjang",
      keranjangController.addItemToCart
    );
  };
}

const keranjangRouter = new keranjangRoutes().keranjangRoute;
export { keranjangRouter };
