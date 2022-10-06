// const mongoose = require("mongoose");
// const config = require("../config");

// const connect = () => {
// mongoose.connect("mongodb+srv://jihyeun_moon:wlgus5490@cluster0.1nmoovx.mongodb.net/?retryWrites=true&w=majority", { ignoreUndefined: true })
//         .catch((err) => {
// console.error(err);
// });
// };

require("dotenv").config();
const mongoose = require("mongoose");
const connect = () => {
        mongoose.connect(process.env.DB_URL, { ignoreUndefined: true }).catch((err) => {
        console.error(err);
        res.status(400)
        });
        };

module.exports = connect;