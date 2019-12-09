const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const dbHelpers = require('../db/dbHelpers.js');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/', express.static('/Users/fook/Desktop/HRLA33/FEC/Nav-Search/client/dist'));

app.get('/autosearch', (req, res) => {
  var query = req.query.data;
  dbHelpers.autoSearch(query)
  .then((data) => {
    res.status(200);
    res.send(data);
    res.end();
  })
  .catch((err) => {
    console.error(err);
    res.status(404);
    res.send(err);
    res.end();
  })
})

app.listen(port, () => console.log(`Your express server is listening on port: ${port}`))