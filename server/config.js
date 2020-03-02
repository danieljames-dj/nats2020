const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '.env') })

module.exports = {
    PORT: process.env.PORT || 3000,
    CLIENT_ID: process.env.CLIENT_ID || "getfromenv",
    CLIENT_SECRET: process.env.CLIENT_SECRET || "getfromenv",
    SESSION_SECRET: process.env.SESSION_SECRET || "getfromenv",
    PRODUCTION: process.env.PRODUCTION === "true",
    BETA_BUILD: process.env.BETA_BUILD === "true",
    MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/nats2020",
    RAZOR_KEY_SECRET: process.env.RAZOR_KEY_SECRET || "test",
    RAZOR_KEY_ID: process.env.RAZOR_KEY_ID || "test",
    INSTAMOJO_API_KEY: process.env.INSTAMOJO_API_KEY || "test",
    INSTAMOJO_AUTH_KEY: process.env.INSTAMOJO_AUTH_KEY || "test"

}