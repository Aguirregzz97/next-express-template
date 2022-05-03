import express from "express"
import controller from "../controllers/unit"

const router = express()

router.get("/get/unit", controller.getUnit)

export default router
