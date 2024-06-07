"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseInterCeptor = void 0;
function ResponseInterCeptor(req, res, next) {
    const originalResponse = res.json;
    res.json = function (incomingData) {
        if (res.statusCode < 400) {
            const response = {
                date: new Date(),
                path: req.url,
                message: "This is Message",
                data: incomingData,
            };
            return originalResponse.call(this, response);
        }
        else {
            return originalResponse.call(this, incomingData);
        }
    };
    next();
}
exports.ResponseInterCeptor = ResponseInterCeptor;
