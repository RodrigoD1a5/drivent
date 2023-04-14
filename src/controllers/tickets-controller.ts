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
