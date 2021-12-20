import { Schema, model, Model } from "mongoose";
import I_user from "../interface/user.interface";

const userSchema = new Schema(
  {
    Foto: { type: String },
    Username: { type: String, required: true, unique: true },
    Nama_Lengkap: { type: String },
    Email: { type: String, required: true, unique: true },
    Password: { type: String, required: true, minLength: 8 },
    Tanggal_Lahir: { type: String },
    Jenis_Kelamin: { type: String },
    NoTelp: { type: String },
    Alamat: { type: String },
    Keranjang: { type: Schema.Types.ObjectId, ref: "Keranjang" },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const User: Model<I_user> = model<I_user>("User_Pembeli", userSchema);
export default User;
