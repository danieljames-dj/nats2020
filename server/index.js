const express = require('express')
const session = require('express-session');
const path = require('path')
const {PORT, SESSION_SECRET, PRODUCTION, BUILD_PATH} = require('./config');

const app = express()

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000
    },
    proxy: true
}));

if (!PRODUCTION) {
	const cors = require('cors')
	app.use(cors({origin: '*'}))
}

const mongo = require('./mongo-connector')
mongo.connect()
require('./api-connector').connect(app, mongo)

const buildPath = path.join(__dirname, BUILD_PATH)
app.use(express.static(buildPath));
app.get('/*', (req, res) => {
	res.sendFile(path.join(buildPath, 'index.html'));
});

app.listen(PORT, () => {
	console.log(`App listening to port %s`, PORT)
})
