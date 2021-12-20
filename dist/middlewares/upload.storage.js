"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var multer_1 = __importDefault(require("multer"));
var MIME_TYPE_MAP = {
    "image/png": "png",
    "image/PNG": "png",
    "image/jpeg": "jpg",
    "image/jpg": "jpg",
};
var storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        var isValid = MIME_TYPE_MAP[file.mimetype];
        var error = new Error("Invalid Mime Type Ekstension");
        if (isValid) {
            error = null;
        }
        cb(error, "uploads");
    },
    filename: function (req, file, cb) {
        var name = file.originalname.toLowerCase().split(" ").join("-");
        var extension = MIME_TYPE_MAP[file.mimetype];
        cb(null, name + Date.now() + "." + extension);
    },
});
var uploads = (0, multer_1.default)({ storage: storage });
exports.default = uploads;
