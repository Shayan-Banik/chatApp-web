import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

export const generateToken = (id, res) => {
  const token = jwt.sign({ id }, config.JWT_SECRET, {
    expiresIn: "7d",
  });

  const isDev = process.env.NODE_ENV === "development";

  res.cookie("token", token, {
    httpOnly: true,
    // In development we run on http so `secure` must be false.
    // Use `sameSite: 'lax'` locally so the browser will send the cookie
    // for same-site navigations and XHR from the frontend dev server.
    // In production (non-dev) we use `sameSite: 'none'` and `secure: true`.
    secure: !isDev,
    sameSite: isDev ? "lax" : "none",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7days
  });

  return token;
};
