import { NextFunction, Request, Response } from "express";

import itemSchema from "../models/item.models";

class itemUser {
  static async itemBaru(req: Request, res: Response, next: NextFunction) {
    const protocol = req.protocol;
    const host = req.get("host");
    const url = protocol + "://" + host;
    const { Nama_Item, Harga_Item, Stock_Item, Deskripsi_Item, Penjual } =
      req.body;

    try {
      const result = await itemSchema.create({
        Foto_Item: url + "/uploads/" + req.file?.filename,
        Nama_Item: Nama_Item,
        Harga_Item: Harga_Item,
        Stock_Item: Stock_Item,
        Deskripsi_Item: Deskripsi_Item,
        Penjual: Penjual,
      });
      res.status(200).json({
        Message: "Item Sudah Ditambahkan Ke Database",
        Data_Item: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateItem(req: Request, res: Response, next: NextFunction) {
    const protocol = req.protocol;
    const host = req.get("host");
    const url = protocol + "://" + host;
    const { Id_Item } = req.params;
    const { Nama_Item, Harga_Item, Stock_Item, Deskripsi_Item } = req.body;

    try {
      const result = await itemSchema.findByIdAndUpdate(
        Id_Item,
        {
          Foto_Item: url + "/uploads/" + req.file?.filename,
          Nama_Item: Nama_Item,
          Harga_Item: Harga_Item,
          Stock_Item: Stock_Item,
          Deskripsi_Item: Deskripsi_Item,
        },
        { new: true }
      );
      res
        .status(200)
        .json({ Message_Develover: "Item Berhasil DiUpdate", Item: result });
    } catch (error) {
      next(error);
    }
  }

  static async deleteItem(req: Request, res: Response, next: NextFunction) {
    const { Id_Item } = req.params;

    try {
      const result = await itemSchema.findByIdAndDelete(Id_Item);
      res
        .status(200)
        .json({ Message_Develover: "Item Product Berhasil DiHapus!" });
    } catch (error) {
      next(error);
    }
  }
}

export default itemUser;
