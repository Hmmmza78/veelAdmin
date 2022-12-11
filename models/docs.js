const mongoose = require("mongoose");

const docsSchema = new mongoose.Schema({
    cnicFront: {
        type: String,
        required: true,
    },
    cnicBack: {
        type: String,
        required: true,
    },
    licenseFront: {
        type: String,
        required: true
    },
    licenseBack: {
        type: String,
        required: true
    },
    numberPlate: {
        type: String,
        required: true
    },
    registrationDoc: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: null
    }
}, {
    collection: "docs",
});

const model = mongoose.model("docsSchema", docsSchema);

module.exports = model;