const net = require('net')
class Request {
  constructor(options) {
    this.method = options.method || 'GET'
    this.host = ''
    this.port = ''
    this.path = ''
    this.headers = ''
    this.body = ''

  }

  send() {
    return new Promise((res, rej) => {
      let responseParser = new ResponseParser

      const connection = net.createConnection({
        host: '',
        port: ''
      }, () => {
        connection.write('request string including: method, header, body')
      })

      connection.on('data', data => {
        responseParser.receive(data.toString())
        if(responseParser.isFinished)
          res(responseParser.response)
        connection.end()
      })

      connection.on('error', err => {
        rej(err)
        connection.end()
      })
    })
  }
}

class ResponseParser {
  constructor() {

  }
  receive() {

  }
  get isFinished() {}
  get response() {}
}
