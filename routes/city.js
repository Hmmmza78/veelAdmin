const express = require('express');
const router = express.Router();

const City = require("../models/city");

router.post("/new", async (req, res) => {
    try {
        let {
            name
        } = req.body;
        const old = await City.find({ name });
        if (old.length > 0) {
            res.status(400).json({
                error: "City already exists"
            });
            return;
        }
        try {
            const city = await City.create({ name });
            res.json({ status: "success", city });
        } catch (err) {
            res.status(500).json({
                message: "internal server error"
            });
        }
    } catch (err) {
        res.status(400).json({ message: "provide correct parameters" })
    }
});

router.post("/toggleCity", async (req, res) => {
    try {
        let {
            id
        } = req.body;
        const old = await City.findById(id);
        // console.log(!old.enabled);
        try {
            let city = await City.findByIdAndUpdate(id, { enabled: !old.enabled });
            city.enabled = !old.enabled;
            res.json({ status: "success", city });
        } catch (err) {
            res.status(500).json({
                status: "fail",
                message: "internal server error"
            });
            return;
        }
    } catch (err) {
        res.status(400).json({ message: "provide correct parameters" })
    }
});

router.post("/edit", async (req, res) => {
    try {
        let {
            id,
            name
        } = req.body;
        try {
            const city = await City.findByIdAndUpdate(id, { name });
            res.json({ status: "success", city });
        } catch (err) {
            res.status(500).json({
                message: "internal server error"
            });
        }
    } catch (err) {
        res.status(400).json({ message: "provide correct parameters" })
    }
});

router.post("/delete", async (req, res) => {
    try {
        let {
            id,
        } = req.body;
        try {
            const city = await City.findByIdAndDelete(id);
            res.json({ status: "success", message: "city deleted" });
        } catch (err) {
            res.status(500).json({
                message: "internal server error"
            });
        }
    } catch (err) {
        res.status(400).json({ message: "provide correct parameters" })
    }
});

router.get("/allCities", async (req, res) => {
    try {
        let cities = await City.find();
        res.json({ status: "success", cities });
    } catch (err) {
        res.status(500).json({
            status: "fail",
            message: "internal server error"
        });
    }
});

router.get("/:id", async (req, res) => {
    try {
        let { id } = req.params;
        try {
            let city = await City.findById(id);
            res.json({ status: "success", city });
        } catch (err) {
            res.status(500).json({
                status: "fail",
                message: "internal server error"
            });
            return;
        }
    } catch (err) {
        res.json({ status: "fail", message: "provide correct parameters" })
    }
});

module.exports = router;