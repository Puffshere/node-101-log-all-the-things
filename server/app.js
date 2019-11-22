const express = require('express');
const fs = require('fs');
const app = express();
const csvFilePath='./data/log.csv';
const csv=require('csvtojson');

app.use((req, res, next) => {
  let Data = [];

  let date = new Date();
  let isoDate = date.toISOString();

  Data.push(req.header('user-agent'));
  Data.push(isoDate);
  Data.push(req.method);
  Data.push(req.url);
  Data.push('HTTP/'+req.httpVersion);
  Data.push(res.statusCode);

  var storedData = Data.join() + '\n';
  
  fs.appendFile('./data/log.csv', storedData, (err) => {
    if (err) throw err;
  });

  console.log(storedData);
  
  next();
});

app.get('/', (req, res) => {
  res.status(200).send('ok')
});

app.get('/logs', (req, res) => {
  csv()
    .fromFile(csvFilePath)
    .then((jsonObj) => {
      res.send(jsonObj);
    })
});

module.exports = app;
