var country_iso2_map = require('./country_iso2_map.json');

module.exports = function(req, res, db) {
    finalList = []
    db.registrations.find({regPaid: true}).toArray(function(err, result) {
        if (err) throw err;
        for (let i in result) {
            participant = result[i]
            name = (participant.details != undefined) ? participant.details.name : ""
            events = (participant.regStatus != undefined) ? participant.regStatus.events : []
            participantCountryName = (participant.details != undefined) ? 
                                        (country_iso2_map.filter(country => {
                                            return country.id == participant.details.country_iso2;
                                        })[0].name)
                                        : "";
            finalList.push({
                name: name,
                country: participantCountryName,
                events: events
            })

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

            finalList.sort(GetSortOrder("name"))
            console.log(finalList)
        }
        res.send({competitors: finalList})
    })

   // res.send({ competitors : [
   //     {
   //         name: "KPP",
   //         country: "India",
   //         events: ['2','3','4','5','6','7','sq']
   //     },
   //     {
   //         name: "Abasdasdasd a sdasdasd asda sd",
   //         country: "USA",
   //         events: ['cl']
   //     }
   // ]});

// res.send({"competitors":[{"name":"Abhijeet Ghodgaonkar","events":["2","3","4","5","6","7","oh","fmc","3b","4b","5b","mb","sk","py","me","cl","sq"]},
//     {"name":"Abinaya vichu","events":["2","py"]},{"name":"Akhil Srinivasan Bagyalaxmi","events":["3"]},{"name":"Alad Zubair","events":["2","3","4"]},
//     {"name":"Arya Kumar","events":["3"]},{"name":"Chaitanya Srikanth Rao","events":["2","3","4","sk","py"]},
//     {"name":"Daniel James","events":["3","3b","mb","sq"]},
//     {"name":"Hariprasad Chakkalaparambil","events":["3","cl"]},
//     {"name":"Jarvis Calvin","events":["2"]},{"name":"Nitin Nathan","events":["2","3","4","5","6","oh","sk","py","me","cl","sq"]},
//     {"name":"Prayansh Vimal","events":["2","3","4","5","6","oh","fmc","3b","sk","py","me","cl","sq"]},
//     {"name":"Rithish Subramanian Panchi","events":["3"]},
//     {"name":"Santhosh Sabarinathan","events":["2","3","4","oh","fmc","sk","py","me","cl","sq"]},
//     {"name":"Saravanan Gowthaman","events":["3"]},
//     {"name":"Sean Maximus Jesudoss","events":["2","3","4","5","6","oh","fmc","3b","sk","py","me","cl","sq"]},
//     {"name":"Senthil Nathan","events":["2","3","py"]},{"name":"Shrreyas Narayana Prasad","events":["2","3","4","5","6","oh","py","me"]},{
//         "name":"Shyam Sundar Ramesh","events":["2","3","4","sk","py"]},
//         {"name":"Siddhi Venkatesh","events":["2","3","4","5","6","oh","fmc","3b","4b","mb","sk","py","me","cl","sq"]},
//         {"name":"Srihari Siva","events":["2","3","4","5","oh","3b","sk","py","me","sq"]},{"name":"Sukesh Kumar","events":["3","6","7","3b","4b","5b","mb","me"]},
//         {"name":"Viswath Kumaraa Kesavaraj","events":["2","3","oh","3b","sk","py"]},{"name":"Vivek Shirke","events":["2","3","4","5","oh","3b","sk","py","me","sq"]},
//         {"name":"Yashwardhan Budhiraja","events":["2","3","4","5","6","7","oh","fmc","3b","mb","sk","py","me","cl","sq"]},
//         {"name":"Yathin Sathya Shankar","events":["2","3","oh","py"]}]});



}
