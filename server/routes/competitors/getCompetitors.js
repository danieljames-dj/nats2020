module.exports = function(req, res, db) {

    finalList = []
    db.registrations.find({regPaid: true}).toArray(function(err, result) {
        if (err) throw err;
        for (let i in result) {
            participant = result[i]
            name = (participant.details != undefined) ? participant.details.name : ""
            events = (participant.regStatus != undefined) ? participant.regStatus.events : []
            finalList.push({
                name: name,
                country: participant.country_iso2,
                events: events
            })
            console.log(finalList)
        }
        res.send({competitors: finalList})
    })

//    res.send({ competitors : [
//        {
//            name: "KPP",
//            country: "India",
//            events: ['2','3','4','5','6','7','sq']
//        },
//        {
//            name: "Abasdasdasd a sdasdasd asda sd",
//            country: "USA",
//            events: ['cl']
//        }
//    ]});

}