const {CLIENT_ID, WCA_OAUTH_REDIRECT_URI} = require('../../config');

module.exports = function(req, res, db) {
    res.redirect(getLoginURL())
}

function getLoginURL() {
    let wcaAuthUrl = "https://www.worldcubeassociation.org/oauth/authorize"
    let redirect_uri = encodeURIComponent(WCA_OAUTH_REDIRECT_URI)
    return wcaAuthUrl + "?client_id=" + CLIENT_ID + "&redirect_uri=" + redirect_uri + "&response_type=code&scope=public+dob+email"
}