const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
    imgPath: {
        type: String,
        required: false,
    },
    nama: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Category", categorySchema, "category");
