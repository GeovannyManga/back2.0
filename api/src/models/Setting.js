const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SettingSchema = Schema({
    resetSeats: {type: Boolean, default: false,}
});

module.exports = mongoose.model("setting", SettingSchema);
