module.exports = function(req, res, db) {
    result = []
    if (req.session.isLoggedIn) {
        db.merchandise.find({
            userId: req.session.userId
        }).toArray().then(users => {
            var responseArray = [];
            for (var user of users) {
                responseArray.push({"merchDetails": user.merchdetails,
                                    "regPaid": user.regPaid});
            };
            res.send(responseArray);
        })
    } else {
        res.send([])
    }
}