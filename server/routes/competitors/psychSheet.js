<<<<<<< HEAD
const mysqlConnectionPool = require('../../mysql-connector').connectionPool
=======
const mysqlConnection = require('../../mysql-connector').connection
>>>>>>> parent of 4936d5c... Revert "Adding psych sheet backend"

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

<<<<<<< HEAD
    event = req.query.event;
    if (!Object.keys(eventIdToWCAMap).includes(event)) {
        res.send("Event not found");
        return;
    }
=======
    event = req.query.event.toString();
    console.log(event);
>>>>>>> parent of 4936d5c... Revert "Adding psych sheet backend"

    db.registrations.find({ regPaid: true }).toArray(function (err, result) {

        competitorsInEvent = {}
        if (err) throw err;
        for (let i in result) {
            competitor = result[i]
            if (competitor.regStatus.events.includes(event) && competitor.details.wca_id != null) {
                competitorsInEvent["'" + competitor.details.wca_id + "'"] = competitor.details.name;
            }
        }

<<<<<<< HEAD
=======
        // console.log(competitorsInEvent); res.send([])

>>>>>>> parent of 4936d5c... Revert "Adding psych sheet backend"
        competitorsInEventWCAIDs = Object.keys(competitorsInEvent);

        if (competitorsInEventWCAIDs.length === 0) {
            res.send([]);
        } else {
            getCompetitorRanks = function (callback) {
<<<<<<< HEAD
                query = mysqlConnectionPool.query("SELECT * FROM RanksAverage where personId IN (" + competitorsInEventWCAIDs + ") AND eventId = '" + eventIdToWCAMap[event] + "'", function (err, rows) {
                    if (err) {
                        res.status(500).send("Internal server error");
                        return;
                    }
=======
                query = mysqlConnection.query("SELECT * FROM RanksAverage where personId IN (" + competitorsInEventWCAIDs + ") AND eventId = '" + eventIdToWCAMap[event] + "'", function (err, rows) {
                    if (err) throw err;
>>>>>>> parent of 4936d5c... Revert "Adding psych sheet backend"
                    return callback(rows);
                });
            }

<<<<<<< HEAD
            getCompetitorRanks(function (queryResult) {

                function GetSortOrder(prop) {
                    return function (a, b) {
                        if (a[prop] > b[prop]) {
                            return 1;
                        } else if (a[prop] < b[prop]) {
                            return -1;
                        }
                        return 0;
                    }
                }

                queryResult.sort(GetSortOrder("best"))
                result = []
                for (let i in queryResult) {
                    competitor = queryResult[i]
                    result.push({
                        name: competitorsInEvent["'" + competitor.personId + "'"],
                        best: (competitor.best / 100)
                    })
                }
                res.send(result);
            });
=======
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
>>>>>>> parent of 4936d5c... Revert "Adding psych sheet backend"
        }

    });
}