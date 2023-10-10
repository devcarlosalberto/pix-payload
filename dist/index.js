"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.payload = void 0;
const payload_class_1 = __importDefault(require("./payload.class"));
function payload(props) {
    return new payload_class_1.default(props).get();
}
exports.payload = payload;
