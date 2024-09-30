"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { MONGO_URI } = process.env;
if (!MONGO_URI) {
    throw new Error("MongoDB URI not found in environment variables.");
}
const connectDB = async () => {
    try {
        const { connection } = await mongoose_1.default.connect(MONGO_URI);
        if (connection.readyState === 1) {
            console.log("MongoDB connected successfully");
            return Promise.resolve(true);
        }
        else {
            throw new Error("MongoDB connection failed");
        }
    }
    catch (error) {
        console.error("Error connecting to MongoDB:", error);
        return Promise.reject(false);
    }
};
exports.connectDB = connectDB;
