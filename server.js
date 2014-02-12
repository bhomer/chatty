//localhost = 127.0.0.1

var messages = [
    "welcome to Pirahna Chat",
    "This is the second message"
];

onRequest = function(req, res) {
    console.log(req.method);
    res.writeHead(200, {
        'Connection': 'close',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    });
    if(req.method=="GET") {
        res.end(JSON.stringify(messages));
    }
    else if (req.method == 'POST') {
        var postData = '';
        var chunkNumber = 1;
        req.on('data', function(chunk) {
            postData += chunk.toString();
//            console.log("chunking 1: "+postData+"\n\n\n\n\n");
//            chunkNumber++;
        });
        req.on('end', function() {
//            console.log("\n\nchunked: "+chunkNumber);
            console.log("Got, POST data:");
            var postObject = JSON.parse(postData);
            messages.push(postObject.message);
            res.end(JSON.stringify("Successfully saved message"));
//            console.log(JSON.parse(postData));
            
                        });
        } else {
        res.end("should be using the get request method"+ "instead of the "+req.method+" method!");
    }
}
    
    
http = require('http');
http.createServer(onRequest).listen(12200);
