const mysqlConnection = require('../../mysql-connector').connection

eventIdToWCAMap = { 
    "2": "222", 
    "3": "333", 
    "4": "444", 
    "5": "555",
    "6": "666", 
    "7": "777", 
    "oh": "333oh", 
    "fmc": "333fm", 
    "3b": "333bf", 
    "4b": "444bf", 
    "5b": "555bf", 
    "mb": "333mb", 
    "sk": "skewb", 
    "py": "pyram", 
    "me": "minx", 
    "cl": "clock", 
    "sq": "sq1"
};


module.exports = function (req, res, db) {

    event = req.query.event.toString();
    console.log(event);

    db.registrations.find({ regPaid: true }).toArray(function (err, result) {

        competitorsInEvent = {}
        if (err) throw err;
        for (let i in result) {
            competitor = result[i]
            if (competitor.regStatus.events.includes(event) && competitor.details.wca_id != null) {
                competitorsInEvent["'" + competitor.details.wca_id + "'"] = competitor.details.name;
            }
        }

        // console.log(competitorsInEvent); res.send([])

        competitorsInEventWCAIDs = Object.keys(competitorsInEvent);

        if (competitorsInEventWCAIDs.length === 0) {
            res.send([]);
        } else {
            getCompetitorRanks = function (callback) {
                query = mysqlConnection.query("SELECT * FROM RanksAverage where personId IN (" + competitorsInEventWCAIDs + ") AND eventId = '" + eventIdToWCAMap[event] + "'", function (err, rows) {
                    if (err) throw err;
                    return callback(rows);
                });
            }

            console.log(getCompetitorRanks(function (queryResult) {
                function GetSortOrder(prop) {  
                    return function(a, b) {  
                        if (a[prop] > b[prop]) {  
                            return 1;  
                        } else if (a[prop] < b[prop]) {  
                            return -1;  
                        }  
                        return 0;  
                    }  
                }  

                queryResult.sort(GetSortOrder("best"))
                console.log(queryResult)
                result = []
                for (let i in queryResult) {
                    competitor = queryResult[i]
                    console.log(competitor.personId)
                    result.push({
                        name: competitorsInEvent["'" + competitor.personId + "'"],
                        best: (competitor.best/100)
                    })
                }
                res.send(result);
            }));
        }

    });
}