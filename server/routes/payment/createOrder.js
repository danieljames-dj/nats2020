const Razorpay = require('razorpay')
const Insta = require('instamojo-nodejs')
const {RAZOR_KEY_SECRET, RAZOR_KEY_ID} = require('../../config');
const {INSTAMOJO_API_KEY, INSTAMOJO_AUTH_KEY} = require('../../config');

module.exports = function(req, res, db) {
    if (req.query.events) {
        events = JSON.parse(req.query.events)

        Insta.setKeys(INSTAMOJO_API_KEY,INSTAMOJO_AUTH_KEY);
        Insta.isSandboxMode(true); //Used to test with test.instamojo.com. Remove in production

        // var instance = new Razorpay({
        //     key_id: RAZOR_KEY_ID,
        //     key_secret: RAZOR_KEY_SECRET
        // })
        // var options = {
        //     amount: (events.length * 50 + getBaseFee()) * 100,
        //     currency: "INR",
        //     receipt: "order_receipt",
        //     payment_capture: '0'
        // };

        var instaPaymentData = new Insta.PaymentData();
        instaPaymentData.purpose = 'Nats20 Competitor Registration';
        instaPaymentData.amount = (events.length * 50 + getBaseFee());
        instaPaymentData.webhook = req.query.webhook;
        instaPaymentData.currency = 'INR';
        console.log(req.query.webhook)



        if (req.session.isLoggedIn == true) {

            Insta.createPayment(instaPaymentData, function(error, response) {
                if (error) {
                    res.status(error.statusCode).send(error);
                } else {
                    createOrder(req, res, db, events, response)
                }
            });

            // instance.orders.create(options, function(err, order) {
            //     if (err) {
            //         res.status(err.statusCode).send(err)
            //     } else {
            //         createOrder(req, res, db, events, order)
            //     }
            // });
        } else {
            res.send({
                error: "session timed out"
            })
        }
    } else {
        res.status(503).send()
    }
}

function getBaseFee() {
    return 350;
}

async function createOrder(req, res, db, events, order) {
    console.log(order)
    console.log(order["payment_request"])
    await db.registrations.findOneAndUpdate(
        { _id: req.session.userId },
        {$set: {
            regStatus: {
                events: events,
                regOrderId: order
            },
            lastPaymentId: order["payment_request"].id
        }},
        { upsert: true, returnOriginal: false }
    )
    res.send(order)
}