import { Router } from 'express';
import { createTicket, getTicketByUserId, getTypesTickets } from '@/controllers/tickets-controller';
import { authenticateToken } from '@/middlewares';

const ticketRouter = Router();

ticketRouter
  .all('/*', authenticateToken)
  .get('/types', getTypesTickets)
  .get('/', getTicketByUserId)
  .post('/', createTicket);

export { ticketRouter };
