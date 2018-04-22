var http = require('http');
var url = require('url');
var fs = require('fs');
var querystring = require('querystring');

http.createServer(function (req, res) {
  var q = url.parse(req.url, true);
  var filename = "." + q.pathname;
  var tmp = q.pathname.lastIndexOf(".");
  var extension = q.pathname.substring((tmp+1));
  console.log(extension);
  //console.log(req);
  fs.readFile(filename, function(err, data) {
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'});
      return res.end("404 Not Found");
    }  
    if(extension == 'html'){
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
	}
    else if(extension == 'css'){
      res.writeHead(200, {'Content-Type': 'text/css'});
      res.write(data);
    }else if(extension == 'js'){
      res.writeHead(200, {'Content-Type': 'text/javascript'});
      res.write(data);
    }
    else if(extension == 'png'){
      debugger;
      res.writeHead(200, {'Content-Type': 'image/png'});
      res.write(data);
    }
    else { console.log("NO CORRECT EXTENSION");
            console.log(extension);
            res.end(contents);
        }
    return res.end();
  });
}).listen(8080); 