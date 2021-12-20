import express, { NextFunction, Request, Response } from "express";
import I_auth from "../interface/auth.interface";

import keranjangSchema from "../models/keranjang.models";
import userSchema from "../models/user.models";
import itemSchema from "../models/item.models";

class keranjangUser {
  static async addItemToCart(req: I_auth, res: Response, next: NextFunction) {
    const { id }: any = req.userData;
    const { IdKeranjang, IdItem, jumlahItem } = req.body;

    try {
      if (jumlahItem === null || jumlahItem <= 0) {
        throw { name: "DONT_NULL" };
      }
      await userSchema.findById(id);
      const foundItem: any = await itemSchema.findById(IdItem);
      // console.log(foundItem);
      if (foundItem.Stock_Item === 0 || foundItem.Stock_Item < jumlahItem) {
        throw { name: "STOCK_0" };
      }
      // const result = await userSchema.findByIdAndUpdate(id, {
      //   $push: { "Keranjang": IdItem },
      // });
      // console.log(result);
      const result = await keranjangSchema.findByIdAndUpdate(IdKeranjang,
        {
          $push: { Item: foundItem, jumlahItem: jumlahItem },
        },
        { new: true }
      );
      // await itemSchema.findByIdAndUpdate(
      //   IdItem,
      //   { $inc: { Stock_Item: -jumlahItem } },
      //   { new: true }
      // // );
      res.status(200).json({
        Message: "Berhasil Memasukkan Item Kedalam Keranjang",
        Dear_User: "Silahkan Cek Keranjang Anda Untuk Mulai Mengorder",
      });
    } catch (error) {
      next(error);
    }
  }
}

export default keranjangUser;
