import { Payment } from '@prisma/client';
import { notFoundError, requestError, unauthorizedError } from '@/errors';
import enrollmentRepository from '@/repositories/enrollment-repository';
import paymentsRepository from '@/repositories/payment-repository.ts';
import ticketsRepository from '@/repositories/tickets-repository';
import { CardDataParams } from '@/protocols';

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

async function createPayment(ticketId: number, userId: number, cardData: CardDataParams) {
  if (!ticketId) throw requestError(400, 'ticketId is not valid');

  if (!cardData) throw requestError(400, 'cardData is not valid');

  const ticketValidation = await ticketsRepository.getTycketById(ticketId);

  if (!ticketValidation) throw notFoundError();

  const user = await enrollmentRepository.findEnrollmentById(ticketValidation.enrollmentId);

  if (!user || user.userId != userId) {
    throw unauthorizedError();
  }

  const ticket = await ticketsRepository.getTycketByEnrollmentId(ticketValidation.enrollmentId);

  const data = {
    ticketId,
    value: ticket.TicketType.price,
    cardIssuer: cardData.issuer,
    cardLastDigits: cardData.number.toString().slice(-4),
  };

  const status = 'PAID';

  await ticketsRepository.updateTicket(ticketId, status);

  const payment = await paymentsRepository.createPayment(data);

  return payment;
}

const paymentsService = {
  getPaymentByTicket,
  createPayment,
};

export default paymentsService;
