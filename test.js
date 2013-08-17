
var bedecked = require('./lib/bedecked');

bedecked.makePrez('./prez.md', {}, function(err, prezHtml) {
  console.log(prezHtml);
});
