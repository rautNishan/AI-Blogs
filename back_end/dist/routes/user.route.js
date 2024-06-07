"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const HttpExceptions_1 = require("../exceptions/HttpExceptions");
exports.userRouter = express_1.default.Router();
//get user
exports.userRouter.get("/", (req, res, next) => {
    // res.send("This is User Get Router");
    console.log("This is Get User");
    res.send({
        message: "This is Message",
    });
});
exports.userRouter.get("/err", (req, res) => {
    console.log("This is in error route");
    throw new HttpExceptions_1.HttpException(400, "Test error");
});
