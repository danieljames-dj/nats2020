module.exports = function(req, res, db) {
    result = {}
    if (req.session.isLoggedIn) {
        db.registrations.findOne({
            _id: req.session.userId
        }).then(user => {
            res.send({
                details: user.details,
                regStatus: user.regStatus,
                regPaid: user.regPaid
            })
        })
    } else {
        res.send({})
    }
}