import { Router } from "express";
import HttpStatus, { StatusCodes, getReasonPhrase } from "http-status-codes";

import getConnection from "../db/connection";
import joiMiddleware, {
  getRollingReportSchema,
} from "../middleware/joiMiddleware";
import convertDate from "../../core/dateConverter";

const router = Router();

router.get(
  "/rolling",
  joiMiddleware(getRollingReportSchema),
  async (req, res) => {
    try {
      const { date: strDate } = req.body;
      const date = convertDate(new Date(strDate), true);
      const conn = getConnection();
      const sql =
        "SELECT (SELECT COUNT(*) FROM user WHERE lastActivityDate >= ?) / (SELECT COUNT(*) FROM user WHERE registrationDate <= ?) * 100 as result";
      console.log(sql);
      conn.query(sql, [date, date], (error, result) => {
        if (error) throw error;
        console.log(result);
        res.send({ data: result[0].result }).status(HttpStatus.OK);
      });
    } catch (error) {
      console.log(error);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR) });
    }
  }
);

export default router;
