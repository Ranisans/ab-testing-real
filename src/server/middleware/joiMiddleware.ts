import HttpStatus from "http-status-codes";
import Joi, { Schema } from "joi";
import { Request, Response, NextFunction } from "express";

const middleware = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.body, {
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

export const createUserSchema = Joi.object({
  registrationDate: Joi.date().required(),
  lastActivityDate: Joi.date().min(Joi.ref("registrationDate")).required(),
});

export const getRollingReportSchema = Joi.object({
  date: Joi.date().required(),
});

export default middleware;