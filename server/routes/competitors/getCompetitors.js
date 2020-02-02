module.exports = function(req, res, db) {

   res.send({ competitors : [
       {
           name: "KPP",
           country: "India",
           events: ['2','3','4','5','6','7','sq']
       },
       {
           name: "Abasdasdasd a sdasdasd asda sd",
           country: "USA",
           events: ['cl']
       }
   ]});

}