"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.name = name;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function name(hotelName, details) {
    return __awaiter(this, void 0, void 0, function* () {
        //make imagePaths include all paths to all the hotel pictures based on hotel name
        const imagePaths = {
            hotel: path_1.default.join(__dirname, `../images/hotel_${hotelName}.png`),
            hall: path_1.default.join(__dirname, `../images/hall_${hotelName}.png`),
            room: path_1.default.join(__dirname, `../images/room_${hotelName}.png`),
            bath: path_1.default.join(__dirname, `../images/bath_${hotelName}.png`),
            food: path_1.default.join(__dirname, `../images/food_${hotelName}.png`),
            other: path_1.default.join(__dirname, `../images/other_${hotelName}.png`)
        };
        const buffers = {};
        for (const [key, imagePath] of Object.entries(imagePaths)) {
            try {
                buffers[key] = {
                    data: fs_1.default.readFileSync(imagePath),
                    contentType: "image/png",
                };
            }
            catch (error) {
            }
        }
    });
}
