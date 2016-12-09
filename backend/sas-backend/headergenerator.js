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

function random (low, high) {
    return Math.random() * (high - low) + low;
}


function getSelectedHeaders(req, res, next){
  var n = parseInt(req.params.n);
  console.log('Selections de ' + n + ' headers...');
  var tab = new Array();
  MongoClient.connect("mongodb://localhost/sasproject", function(error, db) {
    if (error) {
      console.log('Erreur : ', error);
    }
    else {
      console.log("Connecté à la base de données 'sasproject'");
      var collection = db.collection('headers');
      collection.aggregate([{$sample: {size: n}}]).toArray(function(err, result){
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

function association(req, res, next){

  console.log('----------------------------MON HEADER-------------------------------')
  const secret = 'cacamoumdrlol';
  var jsonResponse = req.body;
  jsonResponse.ip = req.ip+':'+req.connection.remotePort;
  delete jsonResponse['if-none-match'];
  delete jsonResponse['Referer'];
  delete jsonResponse['Accept'];
  delete jsonResponse['Cookie'];
  const hash = crypto.createHmac('sha256', secret)
    .update(JSON.stringify(jsonResponse))
    .digest('hex');
    jsonResponse.hash = hash;
  console.log(JSON.stringify(jsonResponse));

  console.log('------------------------MON ASSOCIATION-------------------------------')
  MongoClient.connect("mongodb://localhost/sasproject", function(error, db) {
    if (error) {
      console.log('Erreur : ', error);
    }
    else {
      console.log("Connecté à la base de données 'sasproject'");
      var collection = db.collection('headers');
      var assoc = db.collection('association');

      assoc.find({hash:hash}).toArray(function (err, result){
        if (err) {
          console.log('Erreur : ', err);

        } else if (result.length) {
          console.log('Association deja faite');
          //console.log(result[0].headers);
          res.status(200)
            .json(result[0].headers);

        } else{
          console.log('Creation association');
          var n = parseInt(req.params.n);
          console.log('Selections de ' + n + ' headers...');
          collection.aggregate([{$sample: {size: n}}]).toArray(function(err, result){
            if (err) {
              console.log('Erreur : ', err);
            } else if (result.length) {
              console.log('Headers trouvés:');
              assoc.insert({hash: hash, headers:result}, null, function(err, result){
                if(err){
                  console.log('ErReUR :', err);
                }
                else {
                  console.log('ducument inséré!');
                }
              });
              res.status(200)
                .json(result);
            } else{
              console.log('Pas de document trouvé !');
            }
          });
        }
        //db.close();
      });
    }
  });
}

function printBody(req, res, next){
  console.log("PRINTBODY");
  console.log(req.body);
  res.status(200).json(req.body);
}

module.exports = {
  test: test,
  getHeaders: getHeaders,
  getAllHeaders: getAllHeaders,
  getSelectedHeaders: getSelectedHeaders,
  association: association,
  printBody: printBody
}
