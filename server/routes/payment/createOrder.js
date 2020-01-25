const Razorpay = require('razorpay')
const {RAZOR_KEY_SECRET, RAZOR_KEY_ID} = require('../../config');

module.exports = function(req, res, db) {
    if (req.query.events) {
        events = JSON.parse(req.query.events)
        var instance = new Razorpay({
            key_id: RAZOR_KEY_ID,
            key_secret: RAZOR_KEY_SECRET
        })
        var options = {
            amount: (events.length * 50 + getBaseFee()) * 100,
            currency: "INR",
            receipt: "order_receipt",
            payment_capture: '0'
        };
        if (req.session.isLoggedIn == true) {
            console.log("JHI")
            instance.orders.create(options, function(err, order) {
                if (err) {
                    res.status(err.statusCode).send(err)
                } else {
                    createOrder(req, res, db, events, order)
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

function getBaseFee() {
    return 300;
}

async function createOrder(req, res, db, events, order) {
    await db.registrations.findOneAndUpdate(
        { _id: req.session.userId },
        {$set: {
            regStatus: {
                events: events,
                regOrderId: order
            }
        }},
        { upsert: true, returnOriginal: false }
    )
    res.send(order)
}