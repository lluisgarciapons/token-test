const express = require("express");
const User = require("../models/User");
const userRouter = express.Router();

userRouter.get("/currentUser", async (req, res) => {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
        return res.status(404).send({
            success: false,
            message: "User not found"
        });
    }
    return res.send({
        success: true,
        user
    });
});


module.exports = userRouter;