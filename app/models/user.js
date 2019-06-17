const mongoose = require("mongoose");
//FOR TESTING PURPOSES.
const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            maxlength: 50
        },
        lastName: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 50
        },
        email: {
            type: String,
            required: true,
            unique: true
        }
    },
    {
        timestamps: true
    }
);
exports.User = mongoose.model("User", userSchema);
