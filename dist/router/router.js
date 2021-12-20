"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var user_routes_1 = require("./user.routes");
var keranjang_routes_1 = require("./keranjang.routes");
var item_routes_1 = require("./item.routes");
var Routes = /** @class */ (function () {
    function Routes() {
        var _this = this;
        this.userRoute = function () {
            _this.router.use(user_routes_1.userRouter);
        };
        this.keranjangRoute = function () {
            _this.router.use(keranjang_routes_1.keranjangRouter);
        };
        this.itemRoute = function () {
            _this.router.use(item_routes_1.itemRouter);
        };
        this.router = (0, express_1.Router)();
        this.itemRoute();
        this.userRoute();
        this.keranjangRoute();
    }
    return Routes;
}());
exports.default = new Routes().router;
