import { model, Model, Schema } from "mongoose";
import I_item from "../interface/item.interface";

const itemSchema = new Schema(
  {
    Foto_Item: { type: String },
    Nama_Item: { type: String, required: true },
    Harga_Item: { type: String, required: true },
    Stock_Item: { type: Number, default: 0, required: true },
    Deskripsi_Item: { type: String, required: true },
    Penjual: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

const Item: Model<I_item> = model<I_item>("Item", itemSchema);
export default Item;
