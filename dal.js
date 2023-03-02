const MongoClient = require('mongodb').MongoClient;
//const url = 'mongodb://localhost:27017';
//const url="mongodb://iad2-c14-1.mongo.objectrocket.com:52692,iad2-c14-2.mongo.objectrocket.com:52692,iad2-c14-0.mongo.objectrocket.com:52692/?replicaSet=55e3f296af0a4e1a94b008f4d34c12e4&ssl=true";
const url = 'mongodb://mongo:27017/dockerize-me';
let db = null;
//mongodb://iad2-c14-1.mongo.objectrocket.com:52692,iad2-c14-2.mongo.objectrocket.com:52692,iad2-c14-0.mongo.objectrocket.com:52692/?replicaSet=55e3f296af0a4e1a94b008f4d34c12e4&ssl=true
// connect to mongo
MongoClient.connect(url, { useUnifiedTopology: true }, function (err, client) {
    console.log("Connected successfully to db server");

    // connect to myproject database
    db = client.db('myproject');
});

// create user account using the collection.insertOne function
function create(name, email, password) {
    // TODO: populate this function based off the video
    return new Promise((resolve,reject)=> {
        const collection = db.collection('users');
        const doc = {name,email,password,balance:0};
        collection.insertOne(doc,{w:1},function(err, result){
            err ? reject(err) : resolve(doc);
        });
    })
}

// find user account 
function find(email) {
    return new Promise((resolve, reject) => {
        const customers = db
            .collection('users')
            .find({ email: email })
            .toArray(function (err, docs) {
                err ? reject(err) : resolve(docs);
            });
    })
}

// find user account
function findOne(email) {
    return new Promise((resolve, reject) => {
        const customers = db
            .collection('users')
            .findOne({ email: email })
            .then((doc) => resolve(doc))
            .catch((err) => reject(err));
    })
}

// update - deposit/withdraw amount
function update(email, amount) {
    return new Promise((resolve, reject) => {
        const customers = db
            .collection('users')
            .findOneAndUpdate(
                { email: email },
                { $inc: { balance: amount } },
                { returnOriginal: false },
                function (err, documents) {
                    err ? reject(err) : resolve(documents);
                }
            );


    });
}

// return all users by using the collection.find method
function all() {
    // TODO: populate this function based off the video
    return new Promise((resolve, reject) => {
        const customers = db
            .collection('users')
            .find({})
            .toArray(function(err,docs){
                err ? reject(err): resolve(docs);
            });
        })
}


module.exports = { create, findOne, find, update, all };