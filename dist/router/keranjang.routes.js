"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.keranjangRouter = void 0;
var express_1 = require("express");
var keranjang_controller_1 = __importDefault(require("../controllers/keranjang.controller"));
var keranjangRoutes = /** @class */ (function () {
    function keranjangRoutes() {
        var _this = this;
        this.addToCart = function () {
            _this.keranjangRoute.post("/masukkanKeranjang", keranjang_controller_1.default.addItemToCart);
        };
        this.keranjangRoute = (0, express_1.Router)();
        this.addToCart();
    }
    return keranjangRoutes;
}());
var keranjangRouter = new keranjangRoutes().keranjangRoute;
exports.keranjangRouter = keranjangRouter;
