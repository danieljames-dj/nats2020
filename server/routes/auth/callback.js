const {URLSearchParams} = require('url')
const fetch = require('node-fetch');
const md5 = require('md5');
const {CLIENT_ID, CLIENT_SECRET, WCA_OAUTH_REDIRECT_URI} = require('../../config');

module.exports = function(req, res, db) {
    getAccessToken(req, res, db)
}

async function getAccessToken(req, res, db) {
    const code = req.query.code
	const params = new URLSearchParams({
		client_id: CLIENT_ID,
		client_secret: CLIENT_SECRET,
		redirect_uri: WCA_OAUTH_REDIRECT_URI,
		code,
		grant_type: 'authorization_code',
    });
	const tokenResponse = await fetch(
		`https://www.worldcubeassociation.org/oauth/token?${params.toString()}`,
		{ method: 'POST', multipart: true }
	)
	tokenResponseJson = await tokenResponse.json()
    if (tokenResponseJson.access_token) {
        setDetails(tokenResponseJson.access_token, req, res, db)
    } else {
        res.redirect("/")
    }
}

async function setDetails(token, req, res, db) {
    const userResponse = await fetch(
		`https://www.worldcubeassociation.org/api/v0/me`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + token
            }
        }
    )
    userResponseJson = await userResponse.json()
    db.registrations.find({_id: userResponseJson.me.id}).toArray(function(err, result) {
        if (!err) {
            if (result.length == 0) {
                createNewAccount(token, req, res, db)
            } else {
                loginWithNewAuth(token, req, res, db)
            }
        }
    })
}

function createNewAccount(token, req, res, db) {
    const natsToken = generateToken()
    db.registrations.insertOne({
        _id: userResponseJson.me.id,
        natsToken: md5(natsToken),
        wcaToken: token
    }, function(err, result) {
        if (!err) {
            req.session.userId = userResponseJson.me.id
            req.session.isLoggedIn = true
            req.session.token = natsToken
        }
        res.redirect("/")
    })
}

async function loginWithNewAuth(token, req, res, db) {
    const natsToken = generateToken()
    const { value: user } = await db.registrations.findOneAndUpdate(
        { _id: userResponseJson.me.id },
        {$set: {
            natsToken: md5(natsToken),
            wcaToken: token
        }},
        { upsert: true, returnOriginal: false }
    )
    req.session.userId = user._id
    req.session.isLoggedIn = true
    req.session.token = natsToken
    res.redirect("/")
}

function generateToken() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}