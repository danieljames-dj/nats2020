module.exports = function(req, res, db) {
    result = []
    if (req.session.isLoggedIn) {
        db.accommodation.find({
            userId: req.session.userId
        }).toArray().then(users => {
            var responseArray = [];
            for (var user of users) {
                responseArray.push({"accomdetails": JSON.parse(user.accomdetails.accomodationData),
                                    "regPaid": user.regPaid});
            };
            res.send(responseArray);
        })
    } else {
        res.send({})
    }
}