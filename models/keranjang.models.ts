import { model, Model, Schema, SchemaTypes } from "mongoose";
import I_keranjang from "../interface/keranjang.interface";

const keranjangSchema = new Schema(
  {
    Id_User: { type: Schema.Types.ObjectId, ref: "User_Pembeli" },
    Item: [{ type: Schema.Types.ObjectId, ref: "Item" }],
    itemName: { type: String, default: '' },
    price: { type: Number, default: 0 },
    quantity: { type: Number, default: 0 }
  },
  {
    versionKey: false,
  }
);

const Keranjang: Model<I_keranjang> = model<I_keranjang>(
  "Keranjang",
  keranjangSchema
);
export default Keranjang;
