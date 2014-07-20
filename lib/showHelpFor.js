'use strict';

var showEngineHelp = function() {
  console.log('');
  console.log('  Available templating engines:');
  console.log('');
  console.log('    - markdown');
  console.log('    - jade');
  console.log('    - html');
  console.log('');
};

var showPortHelp = function() {
  console.log('');
  console.log('  Specify a port for the active development server to listen on.');
  console.log('');
  console.log('  Defaults to 8080.');
  console.log('');
};

var showServerHelp = function() {
  console.log('');
  console.log('  Use this flag to start a connect server from which bedecked will');
  console.log('  serve your generated presentation. While the server is running');
  console.log('  bedecked will watch <file> for changes and perform a live');
  console.log('  reload for all connected bowers windows.');
  console.log('');
  console.log('  Your presentation html will not be written to stdout.');
  console.log('');
};

var helpersMap = {
  engine: showEngineHelp,
  port: showPortHelp,
  server: showServerHelp
};

module.exports = function(option) {
  if(helpersMap.hasOwnProperty(option)) {
    helpersMap[option]();
  } else if(option.indexOf('opt') === 0) {
    console.log('');
    console.log('  --opt-* options are forwarded to to the reveal.js init function.');
    console.log('');
    console.log('  See https://github.com/hakimel/reveal.js#configuration');
    console.log('');
  } else {
    console.log('');
    console.log('  Show help for what?');
    console.log('');
  }
};
