const http = require('http')
const server = http.createServer((req, res) => {
    console.log("request is: ")
    console.log(req.headers)
    // console.log(req)
    res.setHeader('Content-Type', 'text/html')
    res.setHeader('X-Foo', 'bar')
    res.writeHeader(200, {'Content-Type': 'text/plain'})
    res.end('ok')
})

server.listen(8088)