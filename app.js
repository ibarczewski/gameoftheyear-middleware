const express = require('express')
const app = express()
const firebase = require('firebase');
const bodyParser = require('body-parser');
const request = require('request');
const _ = require('lodash');
const cors = require('cors');

app.use(bodyParser());
app.use(cors());
app.get('/', (req, res) => res.send('Hello World!'))
app.post('/ballots', function(req, res) {
    console.log(req.body.ballot);
    
    firebase.database().ref('ballots/1').set(req.body.ballot);
    
    res.send('tanks');

});

app.get('/games', function(req, res) {
    var options = {
        url: 'http://www.giantbomb.com/api/search/?api_key=6cbe1f7ddb910061b5ba934384f99ebec7def15b&format=json&query="' + req.query.query + '"&resources=game&field_list=name,image',
        headers: {
          'User-Agent': 'gotyvoting'
        }
      };

    request(options, function (error, response, body) {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', JSON.parse(body).results); // Print the HTML for the Google homepage.
        var parsedResults = _.map(JSON.parse(body).results, function(result) {
            return { label: result.name, icon: result.image.tiny_url };
        });
        res.send(JSON.stringify(parsedResults));
    });
});


app.listen(4000, () => console.log('Example app listening on port 4000!'));

var config = {
    apiKey: 'AIzaSyDGE6qLRlTHhQEz3cKK_4lOSYzx-IPb6Aw',
    
    databaseURL:'http://gotyvoting.firebaseio.com',
    
};
firebase.initializeApp(config);

var database = firebase.database();