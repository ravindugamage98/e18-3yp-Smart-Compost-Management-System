const mongoose = require("mongoose");
const validator = require("validator");

// 2nd model
const binSchema = mongoose.Schema({
    binNumber: {
        type: Number,
        required: true
    },
    binLocation: {
        type: String,
        required: true,
        trim: true,
    },
    compostStatus: {
        type: String,
        required: true,
        trim: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    }
})

binSchema.virtual("BinData", {
    ref: "Bin_Data",
    localField: "_id",
    foreignField: "owner"
});
// const Bin = mongoose.model("Bin", {
//     binNumber: {
//         type: Number,
//         required: true
//     },
//     binLocation: {
//         type: String,
//         required: true,
//         trim: true,
//     },
//     compostStatus: {
//         type: String,
//         required: true,
//         trim: true,
//     }
    
// });

const Bin = mongoose.model("Bin", binSchema);

module.exports = Bin;