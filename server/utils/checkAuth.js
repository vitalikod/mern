import jwt from "jsonwebtoken";
import { secretKey } from "../controllers/auth.js";

export const checkAuth = (req, res, next) => {
  const token = (req.headers.authorization || "").replace(/bearer\s?/, "");
  if (token) {
    try {
      const decoded = jwt.verify(token, secretKey);
      req.userid = decoded.id;
      next();
    } catch (error) {
      return res.json({ messege: "доступ відсутній" });
    }
  } else {
    return res.json({ messege: "доступ відсутній" });
  }
};
