import { Request, Response } from "express"

const getUnit = (req: Request, res: Response) => {
  return res.status(200).json({
    success: "unit endpoint working!",
  })
}

export default { getUnit }
