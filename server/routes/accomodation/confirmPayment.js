const Insta = require('instamojo-nodejs');
const {INSTAMOJO_API_KEY, INSTAMOJO_AUTH_KEY} = require('../../config');

module.exports = function(req, res, db) {

    instamojo_payment_id = req.body.payment_id
    instamojo_payment_request_id = req.body.payment_request_id
    instamojo_payment_status = req.body.status

    Insta.setKeys(INSTAMOJO_API_KEY, INSTAMOJO_AUTH_KEY);
    // Insta.isSandboxMode(true);

    Insta.getPaymentDetails(instamojo_payment_request_id, instamojo_payment_id, function(error, response) {
        if (error) {
          updateFailedReg(req,res,db);
        } else {
            if (response.success == true && response.payment_request.payment.failure == null) {
                updateReg(req,res,db);
            } else {
                updateFailedReg(req,res,db); 
            }
        }
      });

    // if (instamojo_payment_status != 'Credit') {
    //     updateFailedReg(req, res, db)
    // } else {
    //     updateReg(req, res, db)
    //     //Match the payment ID generated at the time of payment request that is there in the DB
    //     //to instamojo_payment_id to validate the payment
    // }


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

async function updateFailedReg(req, res, db) {
    // await db.registrations.findOneAndUpdate(
    //     { lastPaymentId: req.body.payment_request_id },
    //     {$set: {
    //         failedStatus: req.body
    //     }},
    //     { upsert: true, returnOriginal: false }
    // )
    res.send({
        success: false
    })
}

async function updateReg(req, res, db) {
    await db.accommodation.findOneAndUpdate(
        { lastPaymentId: req.body.payment_request_id },
        {$set: {
            regPaid: true
        }},
        { upsert: true, returnOriginal: false }
    )
    res.send({
        success: true
    })
}