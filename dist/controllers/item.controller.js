"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var item_models_1 = __importDefault(require("../models/item.models"));
var itemUser = /** @class */ (function () {
    function itemUser() {
    }
    itemUser.itemBaru = function (req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var protocol, host, url, _b, Nama_Item, Harga_Item, Stock_Item, Deskripsi_Item, Penjual, result, error_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        protocol = req.protocol;
                        host = req.get("host");
                        url = protocol + "://" + host;
                        _b = req.body, Nama_Item = _b.Nama_Item, Harga_Item = _b.Harga_Item, Stock_Item = _b.Stock_Item, Deskripsi_Item = _b.Deskripsi_Item, Penjual = _b.Penjual;
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, item_models_1.default.create({
                                Foto_Item: url + "/uploads/" + ((_a = req.file) === null || _a === void 0 ? void 0 : _a.filename),
                                Nama_Item: Nama_Item,
                                Harga_Item: Harga_Item,
                                Stock_Item: Stock_Item,
                                Deskripsi_Item: Deskripsi_Item,
                                Penjual: Penjual,
                            })];
                    case 2:
                        result = _c.sent();
                        res.status(200).json({
                            Message: "Item Sudah Ditambahkan Ke Database",
                            Data_Item: result,
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _c.sent();
                        next(error_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    itemUser.updateItem = function (req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var protocol, host, url, Id_Item, _b, Nama_Item, Harga_Item, Stock_Item, Deskripsi_Item, result, error_2;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        protocol = req.protocol;
                        host = req.get("host");
                        url = protocol + "://" + host;
                        Id_Item = req.params.Id_Item;
                        _b = req.body, Nama_Item = _b.Nama_Item, Harga_Item = _b.Harga_Item, Stock_Item = _b.Stock_Item, Deskripsi_Item = _b.Deskripsi_Item;
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, item_models_1.default.findByIdAndUpdate(Id_Item, {
                                Foto_Item: url + "/uploads/" + ((_a = req.file) === null || _a === void 0 ? void 0 : _a.filename),
                                Nama_Item: Nama_Item,
                                Harga_Item: Harga_Item,
                                Stock_Item: Stock_Item,
                                Deskripsi_Item: Deskripsi_Item,
                            }, { new: true })];
                    case 2:
                        result = _c.sent();
                        res
                            .status(200)
                            .json({ Message_Develover: "Item Berhasil DiUpdate", Item: result });
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _c.sent();
                        next(error_2);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    itemUser.deleteItem = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var Id_Item, result, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        Id_Item = req.params.Id_Item;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, item_models_1.default.findByIdAndDelete(Id_Item)];
                    case 2:
                        result = _a.sent();
                        res
                            .status(200)
                            .json({ Message_Develover: "Item Product Berhasil DiHapus!" });
                        return [3 /*break*/, 4];
                    case 3:
                        error_3 = _a.sent();
                        next(error_3);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return itemUser;
}());
exports.default = itemUser;
