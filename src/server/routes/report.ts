import { Router } from "express";
import HttpStatus, { StatusCodes, getReasonPhrase } from "http-status-codes";

import getConnection from "../db/connection";

const router = Router();

router.get("/rolling", async (req, res) => {
  try {
    const conn = getConnection();
    const sql =
      "SELECT (SELECT count(*) FROM `user` WHERE DATEDIFF(lastActivityDate, registrationDate) > 7) / (SELECT count(*) FROM `user` WHERE DATEDIFF(NOW(), registrationDate) > 7) * 100 as result";
    conn.query(sql, (error, result) => {
      if (error) throw error;
      res.send({ data: result[0].result }).status(HttpStatus.OK);
    });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR) });
  }
});

export default router;
