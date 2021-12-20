import { Express, Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import I_auth from "../interface/auth.interface";
import userSchema from "../models/user.models";
import keranjangSchema from "../models/keranjang.models";
import itemSchema from "../models/item.models";

class userControllers {
  static async userRegister(req: Request, res: Response, next: NextFunction) {
    const { Username, Email, Password, Keranjang } = req.body;

    const hashPass = bcrypt.genSaltSync(10);
    const hashedPass = bcrypt.hashSync(Password, hashPass);

    try {
      if (Username === "" && Email === "" && Password === "") {
        throw { name: "UNAUTH_REGISTER" };
      }
      const newCart: any = await keranjangSchema.create({});
      const result: any = await userSchema.create({
        Username: Username,
        Email: Email,
        Password: hashedPass,
        Keranjang: newCart,
      });
      const foundId: any = await userSchema.findById(result.id);
      await keranjangSchema.findByIdAndUpdate(newCart, {
        $push: { Id_User: foundId },
      });
      res.status(200).json({
        Message: "Succesfully Registered! Please Login and Buy Something",
      });
    } catch (error) {
      next(error);
    }
  }

  static async userLogin(req: Request, res: Response, next: NextFunction) {
    const { Email, Password } = req.body;

    try {
      const result = await userSchema.findOne({ Email: Email });
      if (!result) {
        throw { name: "UNAUTH_EMAIL" };
      }
      const passValidation = bcrypt.compareSync(Password, result.Password);
      if (!passValidation) {
        throw { name: "UNAUTH_PASSWORD" };
      }
      const token = jwt.sign(
        {
          id: result.id,
          Username: result.Username,
          Email: result.Email,
        },
        "secretpass",
        { expiresIn: "2h" }
      );
      res.status(200).json({
        token: token, userId: result.id
      });
    } catch (error) {
      next(error);
    }
  }

  static async listItem(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await itemSchema
        .find()
        .select("Foto_Item Nama_Item Harga_Item Stock_Item");
      res.status(200).json( result );
    } catch (error) {
      next(error);
    }
  }

  static async detailItem(req: Request, res: Response, next: NextFunction) {
    const { Id_Item } = req.params;

    try {
      const result = await itemSchema.findById(Id_Item);
      res.status(200).json({ Detail_Item: result });
    } catch (error) {
      next(error);
    }
  }

  static async listKeranjangUser(
    req: I_auth,
    res: Response,
    next: NextFunction
  ) {
    const { Id_Keranjang } = req.params;
    try {
      const result = await keranjangSchema
        .findById(Id_Keranjang)
        .select("Item")
        .populate({ path: "Item", select: "Nama_Item Harga_Item" });
      res.status(200).json({ List_Keranjang: result });
    } catch (error) {
      next(error);
    }
  }

  static async hapusItem(req: I_auth, res: Response, next: NextFunction) {
    const { Id_Keranjang } = req.params;
    const { Id_Item } = req.body;

    try {
      await itemSchema.findById(Id_Item);
      await keranjangSchema.findByIdAndUpdate(
        Id_Keranjang,
        {
          $pull: { Item: Id_Item },
        },
        { new: true }
      );
      res.status(200).json({ Message: "Item Dikeranjang Berhasil Dihapus!" });
    } catch (error) {
      next(error);
    }
  }

  static async order(req: I_auth, res: Response, next: NextFunction) {
    const { Id_Keranjang } = req.params;
    const { Id_Item } = req.body;

    try {
      const foundKeranjang = await keranjangSchema.findById(Id_Keranjang);
      const foundItem = await itemSchema.findById(Id_Item);

      await keranjangSchema.findByIdAndUpdate(Id_Keranjang, {
        $pull: { Item: Id_Item },
      });
      res.status(200).json({
        Meesage: "Order Sukses!",
        Dear_User: "Silahkan Lanjut Untuk mengkonfirmasi pembayaran",
      });
    } catch (error) {
      next(error);
    }
  }
}

export default userControllers;
