// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/api/timestamp/", (request, response) => {
   const date_string = new Date()
  return response.json({ unix: Date.parse(date_string), utc: new Date(date_string).toUTCString() }); 
});

app.get("/api/timestamp/:date_string", (request, response) => {
  
    let date_string = request.params.date_string;

    if (/\d{5,}/.test(date_string)) {
      const dateInt = parseInt(date_string);
      //Date regards numbers as unix timestamps, strings are processed differently
      response.json({ unix: date_string, utc: new Date(dateInt).toUTCString() });
    }
  
    if (new Date(date_string).toString() === 'Invalid Date'){ 
      return response.status(404).json({error: 'Invalid Date'})
    } else {
      return response.json({ unix: Date.parse(date_string).valueOf(), utc: new Date(date_string).toUTCString() });  
    }
    
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});