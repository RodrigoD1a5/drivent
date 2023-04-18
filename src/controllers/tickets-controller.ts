import { Response } from 'express';
import httpStatus from 'http-status';
import ticketsService from '@/services/tickets-service';
import { AuthenticatedRequest } from '@/middlewares';

export async function getTypesTickets(req: AuthenticatedRequest, res: Response) {
  try {
    const typesTickets = await ticketsService.getTypesTickets();
    res.status(httpStatus.OK).send(typesTickets);
  } catch (error) {
    console.log(error);
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function getTicketByUserId(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId as number;

  try {
    const tickets = await ticketsService.getTycketByUserId(userId);
    return res.status(httpStatus.OK).send(tickets);
  } catch (error) {
    if (error.name === 'NotFoundError') {
      return res.status(httpStatus.NOT_FOUND).send(error.message);
    }
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function createTicket(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId as number;
  const ticketTypeId = req.body.ticketTypeId as number;

  try {
    const newTicket = await ticketsService.createTicket(userId, ticketTypeId);
    return res.status(httpStatus.CREATED).send(newTicket);
  } catch (error) {
    if (error.name === 'NotFoundError') {
      return res.status(httpStatus.NOT_FOUND).send(error.message);
    }
    if (error.name === 'RequestError') {
      return res.status(error.status).send(error.statusText);
    }
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}
