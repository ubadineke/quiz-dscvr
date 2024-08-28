"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = randomSixDigitNumber;
function randomSixDigitNumber() {
    return Math.floor(100000 + Math.random() * 900000);
}
