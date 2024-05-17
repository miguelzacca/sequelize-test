"use strict";

import jwt from "jsonwebtoken";
import config from "../config.js";

/**
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @example
 * app.get("/example", checkToken, (req, res) => {
 *   ...
 * })
 * @returns {NextFunction | null}
 */
export const checkToken = (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(403).json({ msg: config.msg.server.denied });
  }

  try {
    const secret = config.env.SECRET;
    jwt.verify(token, secret);
    next();
  } catch (err) {
    res.status(401).json({ msg: config.msg.server.unauthorized });
  }
};