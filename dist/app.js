"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var connectDB_1 = __importDefault(require("./configs/connectDB"));
var cors_1 = __importDefault(require("cors"));
var router_1 = __importDefault(require("./router/router"));
var errHandler_1 = require("./middlewares/errHandler");
var path_1 = __importDefault(require("path"));
var morgan_1 = __importDefault(require("morgan"));
var App = /** @class */ (function () {
    function App() {
        var _this = this;
        this.plugin = function () {
            connectDB_1.default.connect();
            _this.app.use((0, cors_1.default)());
            _this.app.use(function (req, res, next) {
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
                res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
                next();
            });
            _this.app.use(express_1.default.json());
            _this.app.use(express_1.default.urlencoded({ extended: true }));
            _this.app.use((0, morgan_1.default)('tiny'));
            _this.app.use("/uploads", express_1.default.static(path_1.default.join("uploads")));
        };
        this.route = function () {
            _this.app.get("/", function (req, res) {
                res.header("Content-type", "text/html");
                return res.end("<h1>Al Barr Mart</h1>");
            });
            _this.app.use("/albarrmart", router_1.default);
        };
        this.errorHandler = function () {
            _this.app.use(errHandler_1.errHandler.handle);
        };
        this.app = (0, express_1.default)();
        this.plugin();
        this.route();
        this.errorHandler();
    }
    return App;
}());
var app = new App().app;
exports.default = app;
