"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const hotelSchema = new mongoose_1.default.Schema({
    /* Hotel Display */
    display: {
        title: { type: String, required: true },
        city: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: String, required: true },
    },
    /* Hotel Page */
    page: {
        title_hp: { type: String, required: true },
        description_hp: { type: String, required: true },
    },
    /* Hotel Pictures */
    hotel_img: {
        data: Buffer,
        contentType: String,
    },
    hall_img: {
        data: Buffer,
        contentType: String,
    },
    room_img: {
        data: Buffer,
        contentType: String,
    },
    bath_img: {
        data: Buffer,
        contentType: String,
    },
    food_img: {
        data: Buffer,
        contentType: String,
    },
    other_img: {
        data: Buffer,
        contentType: String,
    },
});
const Hotel = mongoose_1.default.model('Hotel', hotelSchema);
exports.default = Hotel; // Change this line
