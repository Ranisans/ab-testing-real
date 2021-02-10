import HttpStatus from "http-status-codes";
import Joi, { Schema } from "joi";
import { Request, Response, NextFunction } from "express";

const middleware = (schema: Schema, query?: boolean) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req[query ? "query" : "body"], {
      abortEarly: false,
      allowUnknown: true,
    });
    const valid = error === undefined;

    if (valid) {
      next();
    } else {
      // @ts-ignore
      const { details } = error;
      const message = details.map((i: { message: any }) => i.message).join(",");

      res.status(HttpStatus.BAD_REQUEST).json({ error: message });
    }
  };
};

const user = Joi.object().keys({
  registrationDate: Joi.date().required(),
  lastActivityDate: Joi.date().min(Joi.ref("registrationDate")).required(),
});

export const createUsersSchema = Joi.object({
  data: Joi.array().items(user),
});

export const getRollingReportSchema = Joi.object({
  date: Joi.date().required(),
});

export default middleware;
