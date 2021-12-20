import multer from "multer";

const MIME_TYPE_MAP: any = {
  "image/png": "png",
  "image/PNG": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid Mime Type Ekstension");
    if (isValid) {
      error = null!;
    }
    cb(error, "uploads");
  },
  filename: function (req, file, cb) {
    const name = file.originalname.toLowerCase().split(" ").join("-");
    const extension = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + Date.now() + "." + extension);
  },
});

const uploads = multer({ storage: storage });
export default uploads;
