"use strict";
// src/index.js
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const Hotel = require('./models/HotelModel');
const app = (0, express_1.default)();
// Parse incoming JSON request.
app.use(express_1.default.json());
const router = express_1.default.Router();
const mongoURI = 'mongodb+srv://Cluster46730:VE9vWGN0YkFm@cluster46730.bv6pq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster46730';
mongoose_1.default.connect(mongoURI)
    .then(() => {
    console.log('Connected to MongoDB Atlas');
})
    .catch(err => {
    console.error('MongoDB connection error:', err);
});
// TEST BLOCK
const jsonTest = {
    message: "Hello, world!",
    state: 500,
    app: "Hotel 404"
};
app.use(router);
app.get('/', (req, res) => {
    res.send(jsonTest);
});
// END OF TEST BLOCK
// Start server
app.listen(7700, () => {
    console.log("Listening on port 7700");
});
