require("dotenv").config();
const mongoose = require("mongoose");
const connect = () => {
        mongoose.connect(process.env.DB_URL, { ignoreUndefined: true }).catch((err) => {
        console.error(err);
        res.status(400)
        });
        };

module.exports = connect;