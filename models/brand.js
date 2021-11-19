const mongoose = require("mongoose");

const brandSchema = mongoose.Schema({
    nama: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Brand", brandSchema, "brand");
