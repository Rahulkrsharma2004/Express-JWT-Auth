const mongoose = require("mongoose")
const dotenv = require("dotenv").config()

const connection = mongoose.connect(process.env.mongoURL)

module.exports = {connection}

