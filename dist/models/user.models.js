"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var userSchema = new mongoose_1.Schema({
    Foto: { type: String },
    Username: { type: String, required: true, unique: true },
    Nama_Lengkap: { type: String },
    Email: { type: String, required: true, unique: true },
    Password: { type: String, required: true, minLength: 8 },
    Tanggal_Lahir: { type: String },
    Jenis_Kelamin: { type: String },
    NoTelp: { type: String },
    Alamat: { type: String },
    Keranjang: { type: mongoose_1.Schema.Types.ObjectId, ref: "Keranjang" },
}, {
    versionKey: false,
    timestamps: true,
});
var User = (0, mongoose_1.model)("User_Pembeli", userSchema);
exports.default = User;
