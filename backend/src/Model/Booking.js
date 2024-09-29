"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bookingSchema = new mongoose_1.default.Schema({
    id: {
        type: Number,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    from_date: {
        type: String,
        required: true
    },
    to_date: {
        type: String,
        required: true
    },
    cost: {
        type: Number,
        required: true
    }
});
exports.default = bookingSchema;
