const net = require('net')

// const client = net.createConnection({ 
//     port: 8088,
//     host: "localhost"
// }, () => {
//   // 'connect' listener.
//   console.log('connected to server!');
// //   client.write('world!\r\n');
//     // client.write('POST / HTTP/1.1\r\n')
//     // client.write('HOST: 127.0.0.1\r\n')
//     // client.write('Content-Type: application/x-www-form-urlencoded\r\n')
//     // client.write('Content-Length: 11\r\n')
//     // client.write('\r\n')
//     // client.write('name=winter')
//     let request = new Request({
//         method: 'POST',
//         host: '127.0.0.1',
//         port: '8088',
//         headers: {
//             'X-Foo': 'costomed'
//         },
//         body: {
//             name: 'byne'
//         }
//     })
//     console.log(request.toString())
//     request.send()
// });
// client.on('data', (data) => {
//   console.log(data.toString());
//   client.end();
// });
// client.on('end', () => {
//   console.log('disconnected from server');
// });

class Request {
    // method, url = host + port + path
    // body: k/v
    // headers: content-type, content-length
    constructor(options) {
        this.method = options.method || "GET"
        this.host = options.host
        this.port = options.port || 80
        this.path = options.path || '/'
        this.body = options.body || {}
        this.headers = options.headers || {}
        if(!this.headers["Content-Type"]) {
            this.headers["Content-Type"] = "application/x-www-form-urlencoded"
        }

        if(this.headers["Content-Type"] === "application/json") {
            this.bodyText = JSON.stringify(this.body)
        } else if(this.headers["Content-Type"] === "application/x-www-form-urlencoded") {
            this.bodyText = Object.keys(this.body).map(key => `${key}=${encodeURIComponent(this.body[key])}`).join('&')
        }
        this.headers["Content-Length"] = this.bodyText.length
    }
    toString() {
        // POST / HTTP/1.1
        // HOST: 127.0.0.1
        // Content-Type: application/x-www-form-urlencoded

        // field1=aaa&code=x%3D1
        return `${this.method} ${this.path} HTTP/1.1\r
${Object.keys(this.headers).map(key => `${key}: ${this.headers[key]}`).join('\r\n')}
\r
${this.bodyText}
`
    }
    send(connection) {
        return new Promise((res, rej) => {
            let parser = new ResponseParser

            if(connection) {
                connection.write(this.toString())
            } else {
                connection = net.createConnection({
                    host: this.host,
                    port: this.port
                }, () => {
                    connection.write(this.toString())
                })
            }
            connection.on('data', (data) => {
                parser.receive(data.toString())
                // res(data.toString());
                console.log(parser.statusLine)
                connection.end();
            });
            connection.on('error', (err) => {
                console.log('errerr')
                rej(err)
                connection.end()
            })
        })
    }
}

class Response {

}

class ResponseParser{
    constructor() {
        // HTTP/1.1 200 OK

        // content-type
        // date
        // connection
        // transfer-encoding: chunked

        // 26
        // <html><body>hello world</body></html>

        // 0
        this.WAITING_STATUS_LINE = 0
        this.WAITING_STATUS_LINE_END = 1

        this.WAITING_HEADER_NAME = 2
        this.WAITING_HEADER_SPACE = 3
        this.WAITING_HEADER_VALUE = 4
        this.WAITING_HEADER_LINE_END = 5
        this.WAITING_HEADER_BLOCK_END = 6

        this.current = this.WAITING_STATUS_LINE
        this.statusLine = ""
        this.headers = {}
        this.headerName = ""
        this.headerValue = ""
    }
    receive(string) {
        for(let i=0; i<string.length; i++) {
            this.receiveChar(string.charAt(i))
        }
    }
    receiveChar(char) {
        if(this.current === this.WAITING_STATUS_LINE) {
            if(char === '\r') {
                this.current = this.WAITING_STATUS_LINE_END
            } else if(char === '\n') {
                this.current = this.WAITING_HEADER_NAME
            } else {
                this.statusLine += char
            }
        }
        // if(this.current === this.WAITING_HEADER_VALUE) {
        //     if(char === '\r') {
        //         this.current = this.WAITING_STATUS_LINE_END
        //         this.headers[this.headerName] = this.headerValue
        //     }
        // }
    }
}

class TrunkedBodyParser {
    constructor() {

    }
}

void async function() {
    let request = new Request({
        method: 'POST',
        host: '127.0.0.1',
        port: '8088',
        headers: {
            ['X-Foo']: 'costomed'
        },
        body: {
            name: 'byne'
        }
    })
    let response = await request.send()
    // console.log(response)
}()