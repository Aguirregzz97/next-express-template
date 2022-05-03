import http from "http"
import express from "express"
import next from "next"
import bodyParser from "body-parser"
import logging from "./config/logging"
import config from "./config/config"
import unitRoutes from "./routes/unit"

const nextApp = next({ dev: config.server.nodeEnv !== "production" })
const nextHandler = nextApp.getRequestHandler()

// Create the router
const router = express()

// Create the server
const httpServer = http.createServer(router)

const NAMESPACE = "Server"

httpServer.listen(config.server.port, () => {
  return logging.info(NAMESPACE, `Server running on ${config.server.apiUrl}`)
})

// Log Request
router.use((req, res, nextMethod) => {
  logging.info(
    NAMESPACE,
    `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]`,
  )

  res.on("finish", () => {
    logging.info(
      NAMESPACE,
      `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}], STATUS [${res.statusCode}]`,
    )
  })

  nextMethod()
})

// create middleware application/json parser
const jsonParser = bodyParser.json()

// Rules of API
router.use((req, res, nextMethod) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  )

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET PATCH DELETE POST PUT")
    return res.status(200).json({})
  }
  nextMethod()
})

// Routes
router.use("/api/unit", jsonParser, unitRoutes)

if (config.server.nodeEnv !== "test") {
  nextApp.prepare().then(() => {
    logging.info(NAMESPACE, "Next App Prepared!")

    // Add routing for next
    router.use("/", (req, res) => {
      return nextHandler(req, res)
    })

    // Error Handling
    router.use((req, res) => {
      const error = new Error("not found")

      return res.status(404).json({
        message: error.message,
      })
    })
  })
}

export default { router, httpServer, nextApp }
