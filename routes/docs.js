const express = require('express');
const router = express.Router();
const {
    multipleUpload
} = require("../functions/upload");

router.get("/test", (req, res) => {
    res.json({
        success: true,
        message: "Success"
    });
});
router.post(
    "/multiple",
    multipleUpload, (req, res, next) => {
        Object.keys(req.files).forEach((key) => {
            console.log((req.files[key][0]));
        });
        res.status(200).json({
            message: "success"
        })
    })


module.exports = router;