import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import paymentsService from '@/services/payments-service.ts';

export async function getPaymentByTicket(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId as number;
  const ticketId = req.query.ticketId as string;
  try {
    const payment = await paymentsService.getPaymentByTicket(Number(ticketId), userId);
    return res.status(httpStatus.OK).send(payment);
  } catch (error) {
    if (error.name === 'NotFoundError') {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    if (error.name === 'UnauthorizedError') {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    if (error.name === 'RequestError') {
      return res.status(error.status).send(error.message);
    }
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function createPayment(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId as number;
  const ticketId = req.body.ticketId as number;
  const cardData = req.body.cardData;
  try {
    const payment = await paymentsService.createPayment(ticketId, userId, cardData);
    return res.status(httpStatus.OK).send(payment);
  } catch (error) {
    if (error.name === 'NotFoundError') {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    if (error.name === 'UnauthorizedError') {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    if (error.name === 'RequestError') {
      return res.status(error.status).send(error.message);
    }
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}
