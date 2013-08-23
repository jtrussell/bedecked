var http = require('http')
  , connect = require('connect')
  , tinylr = require('tiny-lr')
  , async = require('async')
  , bedecked = require('./bedecked');

module.exports = function(prezMarkupFile, opts) {

  bedecked(prezMarkupFile, opts, function(err, presentationHtml) {
    if(err) { throw err; }
    var wsPort = 8080
      , lrPort = 35729
      , app = connect()
      , lrServer = tinylr();

    lrServer.listen(lrPort, function(err) {
      if(err) { console.log(err); }
    });

    app.use(require('connect-livereload')())
      .use(function(req, res, next) {
        res.end(presentationHtml);
      });
    http.createServer(app).listen(wsPort);

    console.log('Navigate your browser to http://localhost:%d' , wsPort);
  });

};
