const http = require("http")
const fs = require("fs")
// const index = fs.readFileSync("index.html")

const SerialPort = require("serialport")
const parsers = SerialPort.parsers

const parser = new parsers.Readline({
  delimiter: "\r\n",
})
var myArgs = process.argv.slice(2)
// console.log("myArgs: ", myArgs[0])
var port = new SerialPort(myArgs[0], {
  baudRate: 9600,
  // dataBits: 8,
  // parity: "none",
  // stopBits: 1,
  // flowControl: false,
})

var app = http.createServer(function (req, res) {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
    "Access-Control-Max-Age": 2592000, // 30 days
    /** add other headers as per requirement */
  }
  res.writeHead(200, headers)
  if (req.url === "/" && req.method === "GET") {
    port.pipe(parser)
    port.write("q")
    parser.on("data", function (data) {
      console.log("Received data from port: " + data)
      res.end(data)
      port.flush(function (err, results) {})
      port.unpipe(parser)
    })
  }
})

app.listen(4000)
