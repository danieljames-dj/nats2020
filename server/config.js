const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '.env') })

module.exports = {
    PORT: process.env.PORT || 3000,
    CLIENT_ID: process.env.CLIENT_ID || "getfromenv",
    CLIENT_SECRET: process.env.CLIENT_SECRET || "getfromenv",
    SESSION_SECRET: process.env.SESSION_SECRET || "getfromenv",
    PRODUCTION: process.env.PRODUCTION === "true",
    BETA_BUILD: process.env.BETA_BUILD === "true",
    WCA_OAUTH_REDIRECT_URI: process.env.WCA_OAUTH_REDIRECT_URI || "http://localhost:3000/api/auth/callback",
    MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/nats2020",
    BUILD_PATH: process.env.BETA_BUILD === "true" ? "../client/dist/client_beta" : "../client/dist/client"
}