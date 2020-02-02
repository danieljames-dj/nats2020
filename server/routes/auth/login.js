const {CLIENT_ID} = require('../../config');

module.exports = function(req, res, db) {
    redirect = req.query.redirect || ""
    origin = req.query.origin || ""
    res.redirect(getLoginURL(redirect, origin))
}

function getLoginURL(redirect) {
    let wcaAuthUrl = "https://www.worldcubeassociation.org/oauth/authorize"
    let redirect_uri = encodeURIComponent(origin + "/api/auth/callback?redirect=" + redirect + "&origin=" + origin)
    return wcaAuthUrl + "?client_id=" + CLIENT_ID + "&redirect_uri=" + redirect_uri + "&response_type=code&scope=public+dob+email"
}