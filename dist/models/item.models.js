"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var itemSchema = new mongoose_1.Schema({
    Foto_Item: { type: String },
    Nama_Item: { type: String, required: true },
    Harga_Item: { type: String, required: true },
    Stock_Item: { type: Number, default: 0, required: true },
    Deskripsi_Item: { type: String, required: true },
    Penjual: { type: String, required: true },
}, {
    versionKey: false,
});
var Item = (0, mongoose_1.model)("Item", itemSchema);
exports.default = Item;
