import { Express, Router } from "express";
import userController from "../controllers/user.controllers";

import auth from "../middlewares/auth";

class userRoutes {
  public userRoute: Router;
  constructor() {
    this.userRoute = Router();
    this.userRegisterAndLogin();
    this.userSeeItem();
    this.authentication();
    this.userKeranjang();
  }
  public userRegisterAndLogin = () => {
    this.userRoute.post("/register", userController.userRegister);
    this.userRoute.post("/login", userController.userLogin);
  };
  public userKeranjang = () => {
    this.userRoute.get(
      "/keranjang/:Id_Keranjang",
      userController.listKeranjangUser
    );
    this.userRoute.patch(
      "/keranjang/hapus/:Id_Keranjang",
      userController.hapusItem
    );
    this.userRoute.patch("/order/:Id_Keranjang", userController.order);
  };
  public authentication = () => {
    this.userRoute.use(auth.authentication);
  };
  public userSeeItem = () => {
    this.userRoute.get("/listItem", userController.listItem);
    this.userRoute.get("/detailItem/:Id_Item", userController.detailItem);
  };
}

const userRouter = new userRoutes().userRoute;
export { userRouter };
