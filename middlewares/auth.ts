import { Express, NextFunction, Response } from "express";
import jwt from "jsonwebtoken";

import I_auth from "../interface/auth.interface";

class auth {
  //------------------------------- Authentication Login ---//
  static authentication(req: I_auth, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        throw { name: "MISSING_TOKEN" };
      }
      const decodedToken = <any>jwt.verify(token, "secretpass");
      req.userData = <any>{ Email: decodedToken.Email, id: decodedToken.id };
      next();
    } catch (error) {
      res.status(401).json({ Message: "You Are Not Authenticated!" });
    }
  }

  //------------------------------- Authorization ---//
  static async authorization(req: I_auth, res: Response, next: NextFunction) {
    const { id }: any = req.userData;
    const { Id_Dev } = req.params;

    try {
      if (id === Id_Dev) {
        next();
      } else {
        throw { name: "UNAUTHORIZED_TOKEN" };
      }
    } catch (error) {
      res.status(401).json({ Message: "You Are Not Authorized!" })
    }
  }
}

export default auth;
