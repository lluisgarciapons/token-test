const express = require("express");
const mongoose = require('mongoose');
require('dotenv').config();
const authRouter = require("./api/authRouter");
const userRouter = require("./api/userRouter");
const messageRouter = require("./api/messageRouter");
const { checkToken, errorHandler } = require("./middleware");
const cors = require("cors");

const app = express();

const { env: { PORT, DB_URI } } = process;

mongoose.connect(DB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
}).then(() => {
    console.log("Database connected");
}).catch(err => {
    console.log(err);
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRouter);
app.use("/api/user", checkToken, userRouter);
app.use("/api/message", checkToken, messageRouter);
app.use('*', (req, res) => {
    res.sendStatus(404);
});
app.use(errorHandler);


app.listen(PORT || 5000, () => console.log("Now listening for requests on port 5000"));
