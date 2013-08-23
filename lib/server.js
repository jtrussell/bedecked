var http = require('http')
  , _ = require('lodash')
  , connect = require('connect')
  , tinylr = require('tiny-lr')
  , async = require('async')
  , chalk = require('chalk')
  , bedecked = require('./bedecked');

module.exports = function(prezMarkupFile, wsPort, opts) {

  var origOpts = _.cloneDeep(opts);

  bedecked(prezMarkupFile, opts, function(err, presentationHtml) {
    if(err) { throw err; }
    var lrPort = 35729
      , app = connect()
      , lrServer = tinylr()
      , refreshLrServerContents;

    lrServer.listen(lrPort, function(err) {
      if(err) { console.log(err); }
    });

    app.use(require('connect-livereload')())
      .use(function(req, res, next) {
        res.end(presentationHtml);
      });
    http.createServer(app).listen(wsPort);

    refreshLrServerContents = _.debounce(function() {
      console.log(chalk.green('Live reload: ') + 'integrating your changes...');
      bedecked(prezMarkupFile, _.cloneDeep(origOpts), function(err, html) {
        if(err) { throw err; }
        presentationHtml = html;
        lrServer.changed({body: {files: prezMarkupFile}});
      });
    }, 300, {leading: false, trailing: true});

    require('fs').watch(prezMarkupFile).on('change', function() {
      refreshLrServerContents();
    });

    require('open')('http://localhost:' + wsPort);

    console.log('Server up and running on port %d' , wsPort);
    console.log('Your browser should open automatically, if not navigate to http://localhost:%d', wsPort);
  });

};
