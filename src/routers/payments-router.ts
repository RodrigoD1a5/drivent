import { Router } from 'express';
import { getPaymentByTicket } from '@/controllers/payments-controller';
import { authenticateToken } from '@/middlewares';

const paymentsRouter = Router();

paymentsRouter.all('/*', authenticateToken).get('/', getPaymentByTicket);

export { paymentsRouter };
