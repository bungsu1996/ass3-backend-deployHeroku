import express, { NextFunction, Request, Response } from "express";
import I_auth from "../interface/auth.interface";

import keranjangSchema from "../models/keranjang.models";
import userSchema from "../models/user.models";
import itemSchema from "../models/item.models";
import Keranjang from "../models/keranjang.models";

class keranjangUser {
  static async addItemToCart(req: I_auth, res: Response, next: NextFunction) {
    const { id }: any = req.userData;
    const { IdKeranjang, IdItem, jumlahItem } = req.body;

    try {
      if (jumlahItem === null || jumlahItem <= 0) {
        throw { name: "DONT_NULL" };
      }
      const test = await userSchema.findById(id);
      // console.log(test);
      const cek = await userSchema.findOne({Keranjang});
      console.log(cek);
      
      
      const foundItem: any = await itemSchema.findById(IdItem);
      if (foundItem.Stock_Item === 0 || foundItem.Stock_Item < jumlahItem) {
        throw { name: "STOCK_0" };
      }
      const result = await keranjangSchema.findByIdAndUpdate(IdKeranjang,
        {
          $push: { Item: foundItem, jumlahItem: jumlahItem },
        },
        { new: true }
      );
      res.status(200).json({
        Message: "Berhasil Memasukkan Item Kedalam Keranjang",
      });
    } catch (error) {
      next(error);
    }
  }
}

export default keranjangUser;
