const Razorpay = require('razorpay')
const Insta = require('instamojo-nodejs')
const {RAZOR_KEY_SECRET, RAZOR_KEY_ID} = require('../../config');
const {INSTAMOJO_API_KEY, INSTAMOJO_AUTH_KEY} = require('../../config');

module.exports = function(req, res, db) {
    if (req.query.merchData) {
        merchData = JSON.parse(req.query.merchData);
        
        Insta.setKeys(INSTAMOJO_API_KEY,INSTAMOJO_AUTH_KEY);
        // Insta.isSandboxMode(true); //Used to test with test.instamojo.com. Remove in production

        var instaPaymentData = new Insta.PaymentData();
        instaPaymentData.purpose = 'Nats20 Merchandise Payment';
        instaPaymentData.amount = merchData.amount;
        instaPaymentData.webhook = req.query.webhook;
        instaPaymentData.currency = 'INR';

        if (req.session.isLoggedIn == true) {
            Insta.createPayment(instaPaymentData, function(error, response) {
                if (error) {
                    res.status(error.statusCode).send(error);
                } else {
                    createOrder(req, res, db, response)
                }
            });

        } else {
            res.send({
                error: "session timed out"
            })
        }
    } else {
        res.status(503).send()
    }
}

async function createOrder(req, res, db, order) {
    console.log(order)
    order = JSON.parse(order)
    console.log(order.payment_request)
    db.merchandise.insertOne({
        userId: req.session.userId,
        merchdetails: JSON.parse(req.query.merchData),
        lastPaymentId: order.payment_request.id
    }, function(err, result) {
        if (!err) {
            res.send(order)
        } else {
            res.send(err)
        }
    })
}