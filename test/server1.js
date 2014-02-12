


var messages = [
		"ARRAY1",
		"ARRAY2"

];

onRequest = function(req, res){
	console.log(req.method);

	res.writeHead(200,{
		"connection":"close",
		"Content-type":"text/html",
		"Access-Control-Allow-Origin": '*'

	});

	if(req.method=="GET"){
		res.end(JSON.stringify(messages));
	}else if (req.method == 'POST') {
		   var postData = '';
		   req.on('data', function(chunk) {
		    postData += chunk.toString();
		   });
		   req.on('end', function() {
		    console.log("Got POST data:");
		    console.log(JSON.parse(postData));
		    messages.push(postData.message)
		    res.end(JSON.stringify("Success in the bush"))
		   });
	}
	else{
	res.end("Not Working, use Get or Post");
	}
}


http = require('http');
http.createServer(onRequest).listen(12000) 

 





