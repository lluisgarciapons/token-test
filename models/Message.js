const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        required: true
    },
    message: {
        type: String,
        required: true,
    }

});


module.exports = mongoose.model("Message", MessageSchema);
