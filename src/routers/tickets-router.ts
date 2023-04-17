import { Router } from 'express';
import { getTicketByUserId, getTypesTickets } from '@/controllers/tickets-controller';
import { authenticateToken } from '@/middlewares';

const ticketRouter = Router();

ticketRouter.all('/*', authenticateToken).get('/types', getTypesTickets).get('/', getTicketByUserId);

export { ticketRouter };
