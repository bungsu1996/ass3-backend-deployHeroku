import { Request, Response, NextFunction, ErrorRequestHandler} from "express";

class errHandler {
  static handle(err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) {
    let name: string = err.name;
    let code: number = 0;
    let message: string = "";

    switch (name) {
      case "UNAUTH_REGISTER":
        code = 401;
        message = "Gagal Untuk Daftar! Silahkan Isi Kembali, Jangan Kosongkan Email, Password dan NoTelp!";
        break;
      case "UNAUTH_LOGIN":
        code = 401;
        message = "Gagal Untuk Login! Email Dan Password Tidak Benar!";
        break;
      case "UNAUTH_EMAIL":
        code = 401;
        message = "Email Yang Anda Masukkan Salah!";
        break;
      case "UNAUTH_PASSWORD":
        code = 401;
        message = "Password Yang Anda Masukkan Salah!";
        break;
      case "MISSING_TOKEN":
        code = 401;
        message = "Hilang Akses Token!";
        break;
      case "DONT_NULL":
        code = 401;
        message = "Jumlah Item Yang Anda Masukkan Tidak Benar!";
        break;
      case "STOCK_0":
        code = 401;
        message = "Stock Item Tersebut Telah Habis!";
        break;
      default:
        code = 500;
        message = "Internal Server Error";
        break;
    }
    res.status(code).json({ Success: false, Message: message });
  }
};

export { errHandler };