var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var MongoClient = require('mongodb').MongoClient;
var clashApi = require('clash-of-clans-api');

var client = clashApi({
   token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6ImQ4MDc3NjUyLTk1OTAtNDUyMy05YmJjLTBlZjk2NWE0ZGI5YyIsImlhdCI6MTQ4NTk3NzIxMSwic3ViIjoiZGV2ZWxvcGVyLzY3ZjI4YzUzLWQyZWMtMzIxYi1lZTkwLTM2ZmU2NTI1MjZhZCIsInNjb3BlcyI6WyJjbGFzaCJdLCJsaW1pdHMiOlt7InRpZXIiOiJkZXZlbG9wZXIvc2lsdmVyIiwidHlwZSI6InRocm90dGxpbmcifSx7ImNpZHJzIjpbIjQ2LjcwLjEyNS45NyIsIjgyLjE5OS4yMTEuMTcxIiwiNS42My4xNjUuMTYzIiwiODIuMTk5LjE5My4xNzEiXSwidHlwZSI6ImNsaWVudCJ9XX0.35YN43nyMOnx1Rx-EY4EbPRoGqEurhYq8SvJ9_b6wEdBa7cgEq8EZMoDFqbIDQ0U_k0fRhAA-T9RbbVOBH2AVw'
});

var app = express(),
    db;

app.use(bodyParser.json());

app.use(express.static('.'));

MongoClient.connect('mongodb://rikarsen:rikarsen6951600@ds139869.mlab.com:39869/coc-clan-manager', function (err, database) {
    if (err) return console.log(err);

    db = database;

    app.listen(3000, function() {
        console.log('Server listening on port 3000');
    });
});

app.get('/members', function (req, res) {
    db.collection('members').find().toArray(function (err, result) {
        if (err) return console.log(err);

        res.send(result);
    });
});

app.get('/membersApi', function (req, res) {
    client
        .clanMembersByTag('#GCL2J280')
        .then(function (response) {
            res.send(response.items);
        })
        .catch(function (err) {
            res.status(err.statusCode).send(err);
        });
});

app.post('/syncMembers', function (req, res) {
    var members = req.body.newMembers;

    for(var i = 0; i < members.length; i++) {
        db.collection('members').updateOne(
            { 'tag': members[i].tag },
            { $set: members[i] },
            { upsert: true }
        );
    }

    res.sendStatus(200);
});
