var static = require('node-static');
var file = new static.Server();
require('http').createServer(function(request, response) {
  request.addListener('end', function() {
    file.serve(request, response, function(err,result){
    	if(err){
    		console.error("Error serving " + request.url+ "-" + err.message);
    		response.writeHead(err.status, err.headers);
    		response.end();
    	}
    });
  }).resume();
}).listen(process.env.PORT || 3000);

console.log("server serve at port 3000");
