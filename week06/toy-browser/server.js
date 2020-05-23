const http = require('http')
const server = http.createServer((req, res) => {
    console.log("request is: ")
    console.log(req.headers)
    res.setHeader('Content-Type', 'text/html')
    res.setHeader('X-Foo', 'bar')
    res.writeHeader(200, {'Content-Type': 'text/plain'})
    res.end(
`<html meta=a>
<head>
    <style>
body div #myid{
    width: 100px;
    background-color: #ff5000;
}
body div img {
    width: 30px;
    background-color: #ff1111;
}
    </style>
</head>
<body>
    <div>
        <img id="myid"/>
        <img />
    </div>
</body>
</html>
`)
})

server.listen(8088)