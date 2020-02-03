const express = require('express')
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongo = require('./mongo-connector')
const path = require('path')
const {PORT, SESSION_SECRET, PRODUCTION, BUILD_PATH} = require('./config');
const bodyParser = require('body-parser');

const initialize = async() => {
    const app = express()
    const {MONGO_URI} = require('./config');
    await mongo.connect()

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
        proxy: true,
        store: new MongoStore({
            collection: 'cookieSessions',
            client: mongo.db.client,
            url: MONGO_URI
        })
    }));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}) );

    if (!PRODUCTION) {
        const cors = require('cors')
        app.use(cors({origin: '*'}))
    }

    require('./api-connector').connect(app, mongo)

    const buildPath = path.join(__dirname, "../client/dist/client")
    app.use(express.static(buildPath));
    app.get('/*', (req, res) => {
        res.sendFile(path.join(buildPath, 'index.html'));
    });

    app.listen(PORT, () => {
        console.log(`App listening to port %s`, PORT)
    })

}

initialize().catch(error => {
    console.error(error);
});