module.exports = function(req, res, db) {
    result = {}
    if (req.session.isLoggedIn && req.session.userId != undefined) {
        result.isLoggedIn = req.session.isLoggedIn
    }
    if (req.session.token) {
        result.token = req.session.token
    }
    res.send(result)
}