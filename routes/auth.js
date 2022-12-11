const express = require('express')
const router = express.Router();
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

const {
    upload, multipleUpload
} = require("../functions/upload")

// const User = require("../models/user");
const {
    append
} = require('express/lib/response');

router.post("/register", multipleUpload, async (req, res, next) => {
    let {
        phone,
        email,
        type,
        firstName,
        lastName,
        gender,
        rideCategory,
        city,
        vehicleName,
        vehicleNumber
    } = req.body;

    User.find({
        $or: [{
            phone
            // email
        }]

    }, async (err, result) => {
        if (err) {
            throw err;
        } else {
            if (result.length > 0) {
                res.json({
                    status: "fail",
                    message: "User already exists!"
                });
            } else {
                try {
                    const data = await User.create({
                        phone,
                        email,
                        type,
                        firstName,
                        lastName,
                        gender,
                        rideCategory,
                        city,
                        vehicleName,
                        vehicleNumber
                    });
                    res.json({
                        status: "success",
                        data
                    })
                } catch (error) {
                    res.json(error.message);
                }
            }
        }
    });
});

router.post(
    "/documents",
    multipleUpload, (req, res, next) => {
        let data = {};
        Object.keys(req.files).forEach((key) => {
            let path = req.files[key][0].path.slice(7);
            data[key] = path;
        });
        // console.log(req.files);
        console.log(data);
        res.status(200).json({
            status: "success",
            data
        });
    });

router.post("/login", async (req, res) => {
    let {
        phone,
    } = req.body;
    User.findOne({
        phone
    }, async (err, result) => {
        if (err) throw err;
        if (result != null) {
            res.json({
                status: "success"
            });
        } else {
            res.json({
                status: "fail"
            })
        }
    })
});

router.post("/checkPhone", async (req, res) => {
    let { phone } = req.body;
    let dataOld = await User.find({
        phone
    });
    if (dataOld.length > 0) {
        res.json({
            status: "registered"
        });
    } else {
        res.json({
            status: "not-registered"
        });
    }
});

router.post("/delete", async (req, res) => {
    let {
        uid
    } = req.body;
    try {
        response = await User.findByIdAndDelete(uid);
        res.json({
            status: "success"
        });
    } catch (e) {
        res.json({
            status: "internal server error!"
        });
        console.log(e);
    }
});

router.get("/allUsers", async (req, res) => {
    try {
        users = await User.find();
        users.forEach(user => {
            user.password = "";
        });
        res.json({
            users
        });
    } catch (e) {
        res.json({
            status: "internal server error!"
        });
    }
});


router.get("/logout", (req, res) => {
    res.cookie("token", "", {
        httpOnly: true
    }).json({
        status: "Under development"
    });
});

// this block must be at the end
router.get("/:id", async (req, res) => {
    let {
        id
    } = req.params;
    try {
        user = await User.findById(id);
        user.password = "";
        res.json({
            user
        });
    } catch (e) {
        res.json({
            status: "internal server error!"
        });
    }
})

// section for middlewares


module.exports = router;