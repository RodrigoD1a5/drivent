import { Router } from 'express';
import { getTypesTickets } from '@/controllers/tickets-controller';
import { authenticateToken } from '@/middlewares';

const ticketRouter = Router();

ticketRouter
  // .all('/*', authenticateToken)
  .get('/types', getTypesTickets);

export { ticketRouter };
