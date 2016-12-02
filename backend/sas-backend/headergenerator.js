const crypto = require('crypto');

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
  getHeaders: getHeaders
}
