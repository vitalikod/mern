import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const secretKey = "ksdasoauijidjqsiclmqowkqlskd548451864wf4aw8d4zs5d4w";

export const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const isUser = await User.findOne({ username });
    if (isUser) {
      return res.json({ messege: `їм'я вже зайнято` });
    }

    const salt = bcrypt.genSaltSync(6);
    const hash = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      password: hash,
    });

    await newUser.save();

    res.json({
      newUser,
      messege: "ви вдало зареєструвались",
    });
  } catch (error) {
    res.json({ messege: "зявилась помилка при реєстраціі" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const isUser = await User.findOne({ username });
    if (!isUser) {
      res.json({ messege: "такого юзера не існуе" });
    }
    const isPassword = await bcrypt.compare(password, isUser.password);
    if (!isPassword) {
      res.json({ messege: "неправильний пароль" });
    }
    const token = jwt.sign({ id: isUser._id }, secretKey, { expiresIn: "30d" });
    res.json({
      token,
      isUser,
      messege: "ви увійшли до системи",
    });
  } catch (error) {
    res.json({ messege: "помилка при авторізації" });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = User.findById(req.userid);
    if (!user) {
      res.json({ messege: "такого юзера не існуе" });
    }
    const token = jwt.sign({ id: isUser._id }, secretKey, { expiresIn: "30d" });
    res.json({
      user,
      token,
    });
  } catch (error) {
    res.json({ messege: "немає доступу" });
  }
};
