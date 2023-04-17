import { Request, Response } from 'express';
import httpStatus from 'http-status';
import ticketsService from '@/services/tickets-service';

export async function getTypesTickets(req: Request, res: Response): Promise<Response> {
  try {
    const typesTickets = await ticketsService.getTypesTickets();
    res.status(httpStatus.OK).send(typesTickets);
  } catch (error) {
    console.log(error);
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function getTicketByUserId(req: Request & { userId: number }, res: Response): Promise<Response> {
  const userId = req.userId as number;

  try {
    const tickets = await ticketsService.getTycketByUserId(userId);
    return res.status(httpStatus.OK).send(tickets);
  } catch (error) {
    if (error.name === 'NotFoundError') {
      return res.status(httpStatus.NOT_FOUND).send(error.message);
    }
  }
}
