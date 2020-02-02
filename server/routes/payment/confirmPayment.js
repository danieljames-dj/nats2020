const Razorpay = require('razorpay')
const {RAZOR_KEY_SECRET, RAZOR_KEY_ID} = require('../../config');
const crypto = require('crypto');

module.exports = function(req, res, db) {
    console.log(req.session)
    razorpay_payment_id = req.body.razorpay_payment_id
    razorpay_order_id = req.body.razorpay_order_id
    razorpay_signature = req.body.razorpay_signature

    instamojo_payment_id = req.body.payment_id
    instamojo_payment_request_id = req.body.payment_request_id
    instamojo_payment_status = req.body.status

    if (instamojo_payment_status != 'Credit') {
        res.status(503).send({
            success: false
        })
    } else {
        //Match the payment ID generated at the time of payment request that is there in the DB
        //to instamojo_payment_id to validate the payment
    }


    // if (razorpay_payment_id == undefined || razorpay_order_id == undefined || razorpay_signature == undefined) {
    //     res.status(503).send({
    //         success: false
    //     })
    // } else {
    //     const generated_signature = crypto.createHmac('sha256', RAZOR_KEY_SECRET).update(razorpay_order_id + "|" + razorpay_payment_id).digest('hex')
    //     if (generated_signature == razorpay_signature) {
    //         updateReg(req, res, db)
    //     } else {
    //         res.send({
    //             success: false
    //         })
    //     }
    // }
}

async function updateReg(req, res, db) {
    await db.registrations.findOneAndUpdate(
        { _id: req.session.userId },
        {$set: {
            regPaid: true
        }},
        { upsert: true, returnOriginal: false }
    )
    res.send({
        success: true
    })
}