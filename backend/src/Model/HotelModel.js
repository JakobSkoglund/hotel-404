"use strict";
exports.__esModule = true;
exports.Hotel = void 0;
var mongoose_1 = require("mongoose");
var hotelSchema = new mongoose_1["default"].Schema({
    /* Hotel Display */
    display: {
        title: { type: String, required: true },
        city: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        image: { type: String, "default": "https://png.pngtree.com/png-vector/20190917/ourmid/pngtree-not-found-outline-icon-vectors-png-image_1737857.jpg" }
    },
    /* Hotel Page */
    page: {
        title: { type: String, required: true },
        description: { type: String, required: true }
    },
    /* Hotel Pictures */
    hotel_img: {
        url: { type: String, required: true } // Make sure this stores the image URL directly
    },
    hall_img: {
        url: { type: String }
    },
    room_img: {
        url: { type: String }
    },
    bath_img: {
        url: { type: String }
    },
    food_img: {
        url: { type: String }
    },
    other_img: {
        url: { type: String }
    }
});
exports.Hotel = mongoose_1["default"].model('Hotel', hotelSchema);
