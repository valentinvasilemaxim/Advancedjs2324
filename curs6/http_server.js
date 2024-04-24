const http = require ('http');
const port = 3001;
const host = 'localhost'


let server = http.createServer(function(req, res) {
    res.writeHead (
        200, {
            'Content-Type': 'text/html',
            'Acces-Control-Allow- Origin': '*'
        }
    );
    res.write ("Hello World");
    res.end ();
});

    server.listen(port, host, () => {
        console.log (server )
    })
    

    
