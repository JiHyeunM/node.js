const mongoose = require("mongoose");
// const config = require("../config");

const connect = () => {
mongoose.connect("mongodb+srv://jihyeun_moon:wlgus5490@cluster0.1nmoovx.mongodb.net/?retryWrites=true&w=majority", { ignoreUndefined: true })
        .catch((err) => {
console.error(err);
});
};

module.exports = connect;