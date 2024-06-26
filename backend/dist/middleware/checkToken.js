"use strict";
import config from "../config.js";
import { jwtVerify } from "../utils.js";
/**
 * @example
 * app.get("/example", checkToken, (req, res) => {
 *   ...
 * })
 */
export const checkToken = (req, res, next) => {
    const token = req.cookies?.token;
    if (!token) {
        return res.status(403).json({ msg: config.msg.server.denied });
    }
    try {
        jwtVerify(token);
        next();
    }
    catch (err) {
        res.status(401).json({ msg: config.msg.server.invalidToken });
    }
};
