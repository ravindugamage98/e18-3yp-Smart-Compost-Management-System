const mongoose = require("mongoose");
const validator = require("validator");

// 1st model
const Bin_Data = mongoose.model("Bin_Data", {
    binNumber: {
        type: Number,
        required: true
    },
    day: {
        type: Number,
        required: true,
        trim: true,
        default: 0
    },
    quarter: {
        type: Number,
        required: true,
        min: 0,
        max: 4,
        default: 0
    },
    temperatureL1: {
        type: Number,
        required: true,
        trim: true,
        default: 0
    },
    temperatureL2: {
        type: Number,
        required: true,
        trim: true,
        default: 0
    },
    humidityL1: {
        type: Number,
        required: true,
        trim: true,
        default: 0
    },
    humidityL2: {
        type: Number,
        required: true,
        trim: true,
        default: 0
    },
    compostStatus: {
        type: String,
        required: true,
        trim: true,
        default: "No"
    },
    methaneOutput: {
        type: Number,
        required: true,
        trim: true,
        default: 0

    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Bin"
    }
});

module.exports = Bin_Data;