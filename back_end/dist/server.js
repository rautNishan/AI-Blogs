"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = require("./routes/user.route");
const global_filter_error_1 = require("./middlewares/error/global.filter.error");
const app = (0, express_1.default)();
const port = 3000;
app.use("/user", user_route_1.userRouter);
app.get("/", (req, res) => {
    res.send("This is Js is ts");
});
app.use(global_filter_error_1.GlobalExceptionFilter);
app.listen(port, () => console.log(`Listing to port ${3000}`));
