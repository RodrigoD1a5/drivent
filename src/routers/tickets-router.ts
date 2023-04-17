import { Router } from 'express';
import { createTicket, getTicketByUserId, getTypesTickets } from '@/controllers/tickets-controller';
import { authenticateToken, validateBody } from '@/middlewares';
import { createTicketSchema } from '@/schemas/tickets-schemas';

const ticketRouter = Router();

ticketRouter
  .all('/*', authenticateToken)
  .get('/types', getTypesTickets)
  .get('/', getTicketByUserId)
  .post('/', validateBody(createTicketSchema), createTicket);

export { ticketRouter };
