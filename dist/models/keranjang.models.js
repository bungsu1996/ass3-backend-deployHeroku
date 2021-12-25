"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var keranjangSchema = new mongoose_1.Schema({
    Id_User: { type: mongoose_1.Schema.Types.ObjectId, ref: "User_Pembeli" },
    Item: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Item" }],
    itemName: { type: String, default: '' },
    price: { type: Number, default: 0 },
    quantity: { type: Number, default: 0 }
}, {
    versionKey: false,
});
var Keranjang = (0, mongoose_1.model)("Keranjang", keranjangSchema);
exports.default = Keranjang;
