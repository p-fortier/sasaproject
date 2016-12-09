var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
const crypto = require('crypto');

function getAllHeaders(req, res, next){
  MongoClient.connect("mongodb://localhost/sasproject", function(error, db) {
    if (error) {
      console.log('Erreur : ', error);
    }
    else {
      console.log("Connecté à la base de données 'sasproject'");


    var collection = db.collection('headers');

    /*var header1 = {name: 'patrik', age: 22};
    var header2 = {name: 'lulu', age: 22};

    collection.insert([header1, header2], function (err, res) {
      if (err){
        console.log('Erreur : ', err);
      } else {
        console.log('headers insérés dans la base')
      }
      //db.close();
    });*/

    collection.find().toArray(function (err, result){
      if (err) {
        console.log('Erreur : ', err);
      } else if (result.length) {
        console.log('Headers trouvés!');
        res.status(200)
          .json(result);
      } else{
        console.log('Pas de document trouvé !');
      }
      db.close();
    });

  }

});
}


function test(req, res, next) {
  res.status(200)
    .json({
      message: 'salut'
    });

}

function getHeaders(req, res, next) {
  const secret = 'cacamoumdrlol';
  var jsonResponse = req.headers;
  jsonResponse.ip = req.ip+':'+req.connection.remotePort;
  delete jsonResponse['if-none-match'];
  const hash = crypto.createHmac('sha256', secret)
    .update(jsonResponse.toString())
    .digest('hex');
    jsonResponse.hash = hash;
  res.status(200)
    .json(jsonResponse);
}


module.exports = {
  test: test,
  getHeaders: getHeaders,
  getAllHeaders: getAllHeaders
}
