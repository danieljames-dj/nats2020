const mysqlConnectionPool = require('../../mysql-connector').connectionPool
var moment = require('moment');


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
    "mb": "333mbf", 
    "sk": "skewb", 
    "py": "pyram", 
    "me": "minx", 
    "cl": "clock", 
    "sq": "sq1"
};


module.exports = function (req, res, db) {

    event = req.query.event;
    if (!Object.keys(eventIdToWCAMap).includes(event)) {
        res.send("Event not found");
        return;
    }

    db.registrations.find({ regPaid: true }).toArray(function (err, result) {

        competitorsInEvent = {}
        if (err) throw err;
        for (let i in result) {
            competitor = result[i]
            if (competitor.regStatus.events.includes(event) && competitor.details.wca_id != null) {
                competitorsInEvent["'" + competitor.details.wca_id + "'"] = competitor.details.name;
            }
        }

        competitorsInEventWCAIDs = Object.keys(competitorsInEvent);

        if (competitorsInEventWCAIDs.length === 0) {
            res.send([]);
        } else {
            getCompetitorRanks = function (callback) {
                table = "";
                if (event == "3b" || event == "4b" || event == "5b" || event == "mb") {
                    table = "RanksSingle";
                } else {
                    table = "RanksAverage";
                }
                query = mysqlConnectionPool.query("SELECT * FROM " + table + " where personId IN (" + competitorsInEventWCAIDs + ") AND eventId = '" + eventIdToWCAMap[event] + "'", function (err, rows) {
                    if (err) {
                        res.status(500).send("Internal server error");
                        return;
                    }
                    return callback(rows);
                });
            }

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
                        best: formatBest(competitor.best,event)
                    })
                }
                res.send(result);
            });

            formatBest = function(best,event) {
                if (event == "mb") {
                    console.log(best)
                    difference = parseInt(best.toString().slice(0,2));
                    timeInSeconds = parseInt(best.toString().slice(2,7));
                    console.log(timeInSeconds)
                    missed = parseInt(best.toString().slice(7,9));
                    console.log(((99-difference).toString() + "/" + (99-difference+missed).toString() + " " + moment().startOf('day').seconds(timeInSeconds).format('mm:ss')));
                    return ((99-difference).toString() + "/" + (99-difference+missed).toString() + " " + moment().startOf('day').seconds(timeInSeconds).format('mm:ss'));
                } else {
                    return best/100;
                }
            }
        }

    });
}