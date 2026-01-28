import { Response } from 'express';

type IData<T> = {
  statusCode: number;
  message: string;
  success?: boolean;
  token?: string;
  meta?: Record<string, any>
  data: T | T[] | null;
};

export const responser = <T>(res: Response, data: IData<T>) => {
  res.status(data.statusCode).json({
    success: true,
    statusCode: data.statusCode,
    message: data.message,
    token: data.token,
    meta: data.meta,
    data: data.data,
  });
};
