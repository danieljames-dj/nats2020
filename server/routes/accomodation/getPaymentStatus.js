module.exports = function(req, res, db) {
    result = {}
    if (req.session.isLoggedIn) {
        db.accommodation.findOne({
            _id: req.session.userId
        }).then(user => {
            res.send({
                details: user,
                regStatus: user.regStatus,
                regPaid: user.regPaid
            })
        })
    } else {
        res.send({})
    }
}