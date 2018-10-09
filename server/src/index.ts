import { SLPUDPServer } from "./udpserver"
import { SLPServer } from "./slp-server"
import { ServerMonitor } from "./monitor"

function main (argv: string[]) {
  let port = argv[0]
  if (port === undefined) {
    port = '11451'
  }
  const portNum = parseInt(port)
  let udp = new SLPUDPServer(portNum)
  let slpServer = new SLPServer()
  let monitor = new ServerMonitor(udp, slpServer)
  monitor.start(portNum)
}
main(process.argv.slice(2))
