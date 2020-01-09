module.exports = function(req, res, db) {
    logout(req, res, db)
}

async function logout(req, res, db) {
    const { value: user } = await db.registrations.findOneAndUpdate(
        { _id: req.session.userId },
        {$set: {
            natsToken: "",
            wcaToken: ""
        }},
        { upsert: true, returnOriginal: false }
    )
    req.session.isLoggedIn = false
    req.session.token = ""
    res.send({})
}