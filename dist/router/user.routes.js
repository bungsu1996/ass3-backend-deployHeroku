"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
var express_1 = require("express");
var user_controllers_1 = __importDefault(require("../controllers/user.controllers"));
var auth_1 = __importDefault(require("../middlewares/auth"));
var userRoutes = /** @class */ (function () {
    function userRoutes() {
        var _this = this;
        this.userRegisterAndLogin = function () {
            _this.userRoute.post("/register", user_controllers_1.default.userRegister);
            _this.userRoute.post("/login", user_controllers_1.default.userLogin);
        };
        this.userKeranjang = function () {
            _this.userRoute.get("/keranjang", user_controllers_1.default.listKeranjangUser);
            _this.userRoute.patch("/keranjang/hapus/:Id_Keranjang", user_controllers_1.default.hapusItem);
            _this.userRoute.patch("/order/:Id_Keranjang", user_controllers_1.default.order);
        };
        this.authentication = function () {
            _this.userRoute.use(auth_1.default.authentication);
        };
        this.userSeeItem = function () {
            _this.userRoute.get("/listItem", user_controllers_1.default.listItem);
            _this.userRoute.get("/listItem/productpilihan", user_controllers_1.default.listItem6);
            _this.userRoute.get("/listItem/productpilihan2", user_controllers_1.default.listItemDiskon);
            _this.userRoute.get("/detailItem/:Id_Item", user_controllers_1.default.detailItem);
        };
        this.userRoute = (0, express_1.Router)();
        this.userRegisterAndLogin();
        this.userSeeItem();
        this.authentication();
        this.userKeranjang();
    }
    return userRoutes;
}());
var userRouter = new userRoutes().userRoute;
exports.userRouter = userRouter;
