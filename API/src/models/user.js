const path = require("path");
const fs = require("fs");

const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcryptjs");
const ObjectId = require("mongodb").ObjectId;

const userSchema = mongoose.Schema({
    companyName: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true,
        validate: (value) => {
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email Address.");
            }
        }
    },
    password: {
        type: String,
        min: 7,
        trim: true,
        validate: (value) => {
            if(value.toLowerCase().includes("password")){
                throw new Error("Password should not contain the key password.");
            }
        }
    },
    imagePath: {
        type: String,
        default: "profile.png"
    },
    confirmed:{
        type: Boolean,
        default: false
    },
    secret: {
        type: String
    }
});

userSchema.virtual("tasks", {
    ref: "Task",
    localField: "_id",
    foreignField: "owner"
});

userSchema.pre("save", async function(next) {
    const user = this;

    if(user.isModified("password")){
        user.password = await bcryptjs.hash(user.password, 8);
    }

    // user.password = await bcryptjs.hash(user.password, 8);

    next();
});

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email: email});

    if(!user){
        return {error: "Invalid credentials"};
    }

    const isMatch = await bcryptjs.compare(password, user.password);

    if(!isMatch){
        return {error: "Invalid credentials"};
    }

    if(!user.confirmed){
        return {error: "Please confirm your email account."};
    }

    return user;
}

userSchema.statics.getUserPublicData = (user) => {
    return {
        _id: user._id,
        companyName: user.companyName,
        email: user.email,
        location: user.location,
        imagePath: user.imagePath
    }
}

userSchema.statics.uploadAvatar = (file) => {
    const fileName = file.name;

    const allowedFiles = ["jpg", "jpeg", "JPEG", "png"];
    const fileExtension = fileName.split(".").pop();

    if(!allowedFiles.includes(fileExtension)){
        return {error: "Please upload image files"}
    }

    const newFileName = new ObjectId().toHexString() + "." + fileExtension;
    var result = {fileName: newFileName};

    file.mv(path.resolve("./public/images/" + newFileName), (e) => {
        if(e){
            result.error = "Something went wrong. Unable to upload profile image."
        }
    });

    return result;
}

userSchema.statics.deleteAvatar = async (fileName) => {
    if(fileName === "profile.png"){
        return "";
    }

    var result = "File removed successfully";

    await fs.unlink("./public/images/" + fileName, (e) => {
        if(e){
            result = "Unable to remove file";
        }
    });

    return result;
}

const User = mongoose.model("User", userSchema);

module.exports = User;