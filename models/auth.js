const mongoose = require("mongoose");

const authSchema = new mongoose.Schema({
    phone: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        required: true
        // rider OR delivery
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    rideCategory: {
        type: String,
        required: true
        // vehicle type
    },
    city: {
        type: String,
        required: true
    },
    vehicleName: {
        type: String,
        required: true,
        // model of vehicle
    },
    vehicleNumber: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: null
    },
    image: {
      type: String,
    //   default: "",
      required: false
    },
}, {
    collection: "authInfo",
});

const model = mongoose.model("authSchema", authSchema);

module.exports = model;