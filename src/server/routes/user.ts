import { Router } from "express";
import HttpStatus, { StatusCodes, getReasonPhrase } from "http-status-codes";

import joiMiddleware, { createUserSchema } from "../middleware/joiMiddleware";
import getConnection from "../db/connection";

const router = Router();

router.post("/", joiMiddleware(createUserSchema), async (req, res) => {
  try {
    const { registrationDate, lastActivityDate } = req.body;
    const conn = getConnection();
    const sql = `INSERT INTO user (registrationDate, lastActivityDate) VALUES ('${registrationDate}', '${lastActivityDate}')`;
    await conn.query(sql);
    res.sendStatus(HttpStatus.OK);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR) });
  }
});

router.get("/", async (req, res) => {
  try {
    const conn = getConnection();
    const sql = "SELECT * FROM user ORDER BY registrationDate";
    console.log(sql);
    conn.query(sql, (error, result) => {
      if (error) throw error;
      console.log(result);
      res.send({ data: result }).status(HttpStatus.OK);
    });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR) });
  }
});

export default router;
