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
                    console.log('///////////send data/////////////')
                    console.log(this.toString())
                    connection.write(this.toString())
                })
            }
            connection.on('data', (data) => {
                parser.receive(data.toString())
                if(parser.isFinished) {
                    res(parser.response)
                }
                // console.log('/////////////data receive///////////////')
                // console.log(data.toString())
                connection.end()
            });
            connection.on('error', (err) => {
                rej(err)
                connection.end()
            })
        })
    }
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

        this.WAITING_BODY = 7

        this.current = this.WAITING_STATUS_LINE
        this.statusLine = ""
        this.headers = {}
        this.headerName = ""
        this.headerValue = ""

        this.bodyParser = null
    }
    get isFinished() {
        return this.bodyParser && this.bodyParser.isFinished
    }
    get response() {
        this.statusLine.match(/HTTP\/1.1 ([0-9]+) ([\s\S]+)/)
        return {
            statusCode: RegExp.$1,
            statusText: RegExp.$2,
            headers: this.headers,
            body: this.bodyParser.content.join('')
        }
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
        // header
        else if(this.current === this.WAITING_STATUS_LINE_END) {
            if(char === '\n') {
                this.current = this.WAITING_HEADER_NAME
            }
        }
        else if(this.current === this.WAITING_HEADER_NAME) {
            if(char === ':') {
                this.current = this.WAITING_HEADER_SPACE
            } else if (char === '\r') {
                this.current = this.WAITING_HEADER_BLOCK_END
            }  else {
                this.headerName += char
            }
        }
        else if(this.current === this.WAITING_HEADER_SPACE) {
            if(char === ' ') {
                this.current = this.WAITING_HEADER_VALUE
            }
        }
        else if(this.current === this.WAITING_HEADER_VALUE) {
            if(char === '\r') {
                this.current = this.WAITING_HEADER_LINE_END
            } else {
                this.headerValue += char
            }
        }
        else if(this.current === this.WAITING_HEADER_LINE_END) {
            if(char === '\n') {
                this.headers[this.headerName] = this.headerValue
                this.headerName = ""
                this.headerValue = ""
                this.current = this.WAITING_HEADER_NAME
            }
        }
        // body
        else if(this.current === this.WAITING_HEADER_BLOCK_END) {
            if(char === '\n') {
                this.current = this.WAITING_BODY
                if(this.headers['Transfer-Encoding'] === 'chunked') {
                    this.bodyParser = new TrunkedBodyParser()
                }
            }
        }
        else if(this.current === this.WAITING_BODY) {
            this.bodyParser.receiveChar(char)
        }
    }
}

class TrunkedBodyParser {
    // 2
    // rn
    // o
    // k
    // rn
    // 0
    // rn
    // rn
    constructor() {
        this.WAITING_LENGTH = 0
        this.WAITING_LENGTH_LINE_END = 1
        
        this.READING_TRUNK = 2
        this.WAITING_NEW_LINE = 3
        this.WAITING_NEW_LINE_END = 4
        
        this.current = this.WAITING_LENGTH
        this.isFinished = false
        this.length = 0
        this.content = []
    }
    receiveChar(char){
        if(this.current === this.WAITING_LENGTH) {
            if(char === '\r') {
                if(this.length === 0) {
                    console.log('///////////////receive body in this.content////////////')
                    console.log(this.content)
                    this.isFinished = true
                }
                this.current = this.WAITING_LENGTH_LINE_END
            } else {
                this.length *= 16
                this.length += char.codePointAt(0) - '0'.codePointAt(0)
            }
        } else if (this.current === this.WAITING_LENGTH_LINE_END) {
            if (char === '\n') {
                this.current = this.READING_TRUNK
            }
        } else if (this.current === this.READING_TRUNK) {
            this.content.push(char)
            this.length --
            if(this.length === 0) {
                this.current = this.WAITING_NEW_LINE
            }
        } else if (this.current === this.WAITING_NEW_LINE) {
            if (char === '\r') {
                this.current = this.WAITING_NEW_LINE_END
            }
        } else if (this.current === this.WAITING_NEW_LINE_END) {
            if (char === '\n') {
                this.current = this.WAITING_LENGTH
            }
        }
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
    console.log('///////////response/////////////')
    console.log(response)
}()
