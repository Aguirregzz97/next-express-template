import dotenv from "dotenv"

dotenv.config()

const { NODE_ENV } = process.env

const API_URL = process.env.API_URL || "http://localhost:1337"
const PORT = process.env.PORT || 1337

const SERVER = {
  apiUrl: API_URL,
  port: PORT,
  nodeEnv: NODE_ENV,
}

const config = {
  server: SERVER,
}

export default config
