const express = require("express");
const Message = require("../models/Message");
const messageRouter = express.Router();

messageRouter.get("/", async (req, res) => {
    const messages = await Message.find({}).select("title");
    return res.send({
        success: true,
        messages
    });
});

messageRouter.post("/", async (req, res) => {
    try {
        const { title, message } = req.body;
        if (!title, !message) {
            return res.status(403).send({
                success: false,
                message: "fill in all reqiured info"
            });
        }

        const newMessage = new Message({
            title,
            message
        });

        const mess = await newMessage.save();

        res.send({
            success: true,
            message: mess
        });
    }
    catch (err) {
        console.log(err);
    }
});

messageRouter.get("/:id", async (req, res) => {
    const message = await Message.findById(req.params.id);
    res.send({
        success: true,
        message
    });
});


module.exports = messageRouter;