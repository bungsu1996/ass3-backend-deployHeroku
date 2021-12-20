import { Express, Router } from "express";
import itemController from "../controllers/item.controller";
import uploads from "../middlewares/upload.storage";

class itemRoutes {
  public itemRoute: Router;
  constructor() {
    this.itemRoute = Router();
    this.itemController();
  }
  public itemController = () => {
    this.itemRoute.post("/develover/itemBaru", uploads.single("Foto_Item"), itemController.itemBaru);
    this.itemRoute.patch("/develover/updateItem/:Id_Item", uploads.single("Foto_Item"),itemController. updateItem);
    this.itemRoute.delete("/develover/deleteItem/:Id_Item", itemController.deleteItem);
  };
}

const itemRouter = new itemRoutes().itemRoute;
export { itemRouter };
