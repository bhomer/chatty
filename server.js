//localhost = 127.0.0.1

var messages = [
    {message: "welcome to Pirahna Chat"},
    {message: "This is the second message"}
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
            console.log("Type of postData:", typeof postData);
            console.log("Type of JSON.parse(postData):", typeof JSON.parse(postData));
            var msg = JSON.parse(postData);
//            console.log("\n\nchunked: "+chunkNumber);
//            console.log("Got, POST data:");
            var postObject = JSON.parse(postData);
            messages.push(postObject);
            res.end(JSON.stringify("Successfully saved message"));
//            console.log(JSON.parse(postData));
            
        });
    }
    else if (req.method === 'OPTIONS') {
        res.writeHead(200, {
            'Connection': 'close',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS, GET, POST',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
          });
        res.end("{}");
    } else {
        res.end("should be using the get request method"+ "instead of the "+req.method+" method!");
    }
}
    
    
http = require('http');
http.createServer(onRequest).listen(12200);
