const express = require('express')
const path = require('path')
const fetch = require('node-fetch');
require('dotenv').config({ path: path.join(__dirname, '.env') })

const app = express()

if (!process.env.PRODUCTION != 'true') {
	const cors = require('cors')
	app.use(cors({origin: '*'}))
}

const buildPath = path.join(__dirname, '../client/dist/client')
app.use(express.static(buildPath));
app.get('/*', (req, res) => {
	res.sendFile(path.join(buildPath, 'index.html'));
});

app.get('/api/getAccessToken', (req, res) => {
	tokenResponseJson = getAccessToken(req.query.code, res)
})

async function getAccessToken(code, res) {
	const params = new URLSearchParams({
		client_id: process.env.client_id,
		client_secret: process.env.client_secret,
		redirect_uri: "http://localhost:4200",
		code,
		grant_type: 'authorization_code',
	});
	const tokenResponse = await fetch(
		`https://www.worldcubeassociation.org/oauth/token?${params.toString()}`,
		{ method: 'POST', multipart: true }
	)
	tokenResponseJson = await tokenResponse.json()
	res.send(tokenResponseJson)
}

app.listen(process.env.PORT || 3000, () => {
	console.log(`App listening to port %s`, process.env.PORT || 3000)
})
