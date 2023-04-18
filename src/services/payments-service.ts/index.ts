import { Payment } from '@prisma/client';
import { notFoundError, requestError, unauthorizedError } from '@/errors';
import enrollmentRepository from '@/repositories/enrollment-repository';
import paymentsRepository from '@/repositories/payment-repository.ts';
import ticketsRepository from '@/repositories/tickets-repository';

async function getPaymentByTicket(ticketId: number, userId: number): Promise<Payment> {
  if (!ticketId) throw requestError(400, 'ticketId is not valid');

  const ticketValidation = await ticketsRepository.getTycketById(ticketId);

  if (!ticketValidation) throw notFoundError();

  const user = await enrollmentRepository.findEnrollmentById(ticketValidation.enrollmentId);

  if (!user || user.userId != userId) {
    throw unauthorizedError();
  }

  const payment = await paymentsRepository.getPaymentByTicketId(ticketId);

  return payment;
}

const paymentsService = {
  getPaymentByTicket,
};

export default paymentsService;
