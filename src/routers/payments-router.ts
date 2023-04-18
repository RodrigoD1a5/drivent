import { Router } from 'express';
import { createPayment, getPaymentByTicket } from '@/controllers/payments-controller';
import { authenticateToken, validateBody } from '@/middlewares';
import { createPaymentSchema } from '@/schemas/payments-schemas';

const paymentsRouter = Router();

paymentsRouter
  .all('/*', authenticateToken)
  .get('/', getPaymentByTicket)
  .post('/process', validateBody(createPaymentSchema), createPayment);

export { paymentsRouter };
