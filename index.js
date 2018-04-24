var StaticServer = require('static-server');
var path    = require("path");
var fsize   = require('file-size');
var program = require('commander');
var chalk = require('chalk');

var server = new StaticServer({
  rootPath: '.',            // required, the root of the server file tree
  port: process.env.PORT|| 8080,               // required, the port to listen
  name: 'ezcomp-server',   // optional, will set "X-Powered-by" HTTP header
});
 
server.start(function () {
  console.log('Server listening to', server.port);
  console.log(chalk.blue('*'), 'Press', chalk.yellow.bold('Ctrl+C'), 'to shutdown.');
});
 
server.on('request', function (req, res) {
  // req.path is the URL resource (file name) from server.rootPath
  // req.elapsedTime returns a string of the request's elapsed time
  console.log(chalk.gray('<--'), chalk.blue('[' + req.method + ']'), req.path);
});
 
server.on('symbolicLink', function (link, file) {
  // link is the source of the reference
  // file is the link reference
  console.log('File', link, 'is a link to', file);
});
 
server.on('response', function (req, res, err, file, stat) {
  // res.status is the response status sent to the client
  // res.headers are the headers sent
  // err is any error message thrown
  // file the file being served (may be null)
  // stat the stat of the file being served (is null if file is null)
 
  // NOTE: the response has already been sent at this point
  var relFile;
  var nrmFile;

  if (res.status >= 400) {
    console.log(chalk.gray('-->'), chalk.red(res.status), req.path, '(' + req.elapsedTime + ')');
  } else if (file) {
    relFile = path.relative(server.rootPath, file);
    nrmFile = path.normalize(req.path.substring(1));

    console.log(chalk.gray('-->'), chalk.green(res.status, StaticServer.STATUS_CODES[res.status]), req.path + (nrmFile !== relFile ? (' ' + chalk.dim('(' + relFile + ')')) : ''), fsize(stat.size).human(), '(' + req.elapsedTime + ')');
  } else {
    console.log(chalk.gray('-->'), chalk.green.dim(res.status, StaticServer.STATUS_CODES[res.status]), req.path, '(' + req.elapsedTime + ')');
  }

  if (err && server.debug) {
    console.error(err.stack || err.message || err);
  }

});