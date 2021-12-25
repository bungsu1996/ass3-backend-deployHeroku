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
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var user_models_1 = __importDefault(require("../models/user.models"));
var keranjang_models_1 = __importDefault(require("../models/keranjang.models"));
var item_models_1 = __importDefault(require("../models/item.models"));
var userControllers = /** @class */ (function () {
    function userControllers() {
    }
    userControllers.userRegister = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, Username, Email, Password, hashPass, hashedPass, newCart, result, foundId, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, Username = _a.Username, Email = _a.Email, Password = _a.Password;
                        hashPass = bcryptjs_1.default.genSaltSync(10);
                        hashedPass = bcryptjs_1.default.hashSync(Password, hashPass);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 6, , 7]);
                        if (Username === "" && Email === "" && Password === "") {
                            throw { name: "UNAUTH_REGISTER" };
                        }
                        return [4 /*yield*/, keranjang_models_1.default.create({})];
                    case 2:
                        newCart = _b.sent();
                        return [4 /*yield*/, user_models_1.default.create({
                                Username: Username,
                                Email: Email,
                                Password: hashedPass,
                                Keranjang: newCart,
                            })];
                    case 3:
                        result = _b.sent();
                        return [4 /*yield*/, user_models_1.default.findById(result.id)];
                    case 4:
                        foundId = _b.sent();
                        return [4 /*yield*/, keranjang_models_1.default.findByIdAndUpdate(newCart, {
                                $push: { Id_User: foundId },
                            })];
                    case 5:
                        _b.sent();
                        res.status(200).json({
                            Message: "Succesfully Registered! Please Login and Buy Something",
                        });
                        return [3 /*break*/, 7];
                    case 6:
                        error_1 = _b.sent();
                        next(error_1);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    userControllers.userLogin = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, Email, Password, result, passValidation, token, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, Email = _a.Email, Password = _a.Password;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, user_models_1.default.findOne({ Email: Email })];
                    case 2:
                        result = _b.sent();
                        if (!result) {
                            throw { name: "UNAUTH_EMAIL" };
                        }
                        passValidation = bcryptjs_1.default.compareSync(Password, result.Password);
                        if (!passValidation) {
                            throw { name: "UNAUTH_PASSWORD" };
                        }
                        token = jsonwebtoken_1.default.sign({
                            id: result.id,
                            Username: result.Username,
                            Email: result.Email,
                        }, "secretpass", { expiresIn: "2h" });
                        res.status(200).json({
                            token: token,
                            userId: result.id,
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _b.sent();
                        next(error_2);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    userControllers.listItem = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, item_models_1.default
                                .find()
                                .select("Foto_Item Nama_Item Harga_Item Stock_Item")];
                    case 1:
                        result = _a.sent();
                        res.status(200).json(result);
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _a.sent();
                        next(error_3);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    userControllers.listItem6 = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, item_models_1.default.find().limit(6)];
                    case 1:
                        result = _a.sent();
                        res.status(200).json(result);
                        return [3 /*break*/, 3];
                    case 2:
                        error_4 = _a.sent();
                        next(error_4);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    userControllers.listItemDiskon = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, item_models_1.default.find({ Stock_Item: { $lte: 8 } })];
                    case 1:
                        result = _a.sent();
                        res.status(200).json(result);
                        return [3 /*break*/, 3];
                    case 2:
                        error_5 = _a.sent();
                        next(error_5);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    userControllers.detailItem = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var Id_Item, result, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        Id_Item = req.params.Id_Item;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, item_models_1.default.findById(Id_Item)];
                    case 2:
                        result = _a.sent();
                        res.status(200).json({ Detail_Item: result });
                        return [3 /*break*/, 4];
                    case 3:
                        error_6 = _a.sent();
                        next(error_6);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    userControllers.listKeranjangUser = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var id, foundUser, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.userData.id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, user_models_1.default
                                .findById(id)
                                .select("Keranjang")
                                .populate({
                                path: "Keranjang",
                                select: "Item",
                            })];
                    case 2:
                        foundUser = _a.sent();
                        res.status(200).json(foundUser);
                        return [3 /*break*/, 4];
                    case 3:
                        error_7 = _a.sent();
                        next(error_7);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    userControllers.hapusItem = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var Id_Keranjang, Id_Item, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        Id_Keranjang = req.params.Id_Keranjang;
                        Id_Item = req.body.Id_Item;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, item_models_1.default.findById(Id_Item)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, keranjang_models_1.default.findByIdAndUpdate(Id_Keranjang, {
                                $pull: { Item: Id_Item },
                            }, { new: true })];
                    case 3:
                        _a.sent();
                        res.status(200).json({ Message: "Item Dikeranjang Berhasil Dihapus!" });
                        return [3 /*break*/, 5];
                    case 4:
                        error_8 = _a.sent();
                        next(error_8);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    userControllers.order = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var Id_Keranjang, Id_Item, foundKeranjang, foundItem, error_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        Id_Keranjang = req.params.Id_Keranjang;
                        Id_Item = req.body.Id_Item;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        return [4 /*yield*/, keranjang_models_1.default.findById(Id_Keranjang)];
                    case 2:
                        foundKeranjang = _a.sent();
                        return [4 /*yield*/, item_models_1.default.findById(Id_Item)];
                    case 3:
                        foundItem = _a.sent();
                        return [4 /*yield*/, keranjang_models_1.default.findByIdAndUpdate(Id_Keranjang, {
                                $pull: { Item: Id_Item },
                            })];
                    case 4:
                        _a.sent();
                        res.status(200).json({
                            Meesage: "Order Sukses!",
                            Dear_User: "Silahkan Lanjut Untuk mengkonfirmasi pembayaran",
                        });
                        return [3 /*break*/, 6];
                    case 5:
                        error_9 = _a.sent();
                        next(error_9);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return userControllers;
}());
exports.default = userControllers;
