"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.itemRouter = void 0;
var express_1 = require("express");
var item_controller_1 = __importDefault(require("../controllers/item.controller"));
var upload_storage_1 = __importDefault(require("../middlewares/upload.storage"));
var itemRoutes = /** @class */ (function () {
    function itemRoutes() {
        var _this = this;
        this.itemController = function () {
            _this.itemRoute.post("/develover/itemBaru", upload_storage_1.default.single("Foto_Item"), item_controller_1.default.itemBaru);
            _this.itemRoute.patch("/develover/updateItem/:Id_Item", upload_storage_1.default.single("Foto_Item"), item_controller_1.default.updateItem);
            _this.itemRoute.delete("/develover/deleteItem/:Id_Item", item_controller_1.default.deleteItem);
        };
        this.itemRoute = (0, express_1.Router)();
        this.itemController();
    }
    return itemRoutes;
}());
var itemRouter = new itemRoutes().itemRoute;
exports.itemRouter = itemRouter;
