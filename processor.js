// processor.js

var csv = require('csv');
var fs = require('fs');
var countries = {};



var processRow = function(row, index) {

  var datapoint = {
      date : row[1],
      vol_f :  Number(row[2]),
      vol :  Number(row[3]),
      vol_v :  Number(row[2])- Number(row[3]),
      vol_e :  Number(row[4]),
      val_f :  Number(row[5]),
      val :  Number(row[6]),
      val_v :  Number(row[5])- Number(row[6]),
      val_e :  Number(row[7])
    }
  if (countries.hasOwnProperty(row[0])) {
    countries[row[0]].data.push(datapoint)
  } else {
    countries[row[0]] = {
      name : row[0],
      data : [ datapoint ]
    }
  }
};


var writeFile = function() {

  var countryFile = [];

  for (var country in countries) {
    countryFile.push(countries[country]);
  }

  fs.writeFile('countries.json', JSON.stringify(countryFile, true), function (err) {
    if (err) return console.log(err);
    console.log('done!');
  });

}




csv()
  .from.path(__dirname+'/data.csv', {delimiter: ','})
  .on('record', processRow)
  .on('end', writeFile)