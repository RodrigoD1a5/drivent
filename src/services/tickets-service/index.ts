import { TicketStatus, Ticket, TicketType } from '.prisma/client';
import { notFoundError, requestError } from '@/errors';
import enrollmentRepository from '@/repositories/enrollment-repository';
import ticketsRepository from '@/repositories/tickets-repository';

async function getTypesTickets(): Promise<TicketType[]> {
  const typesTickets = await ticketsRepository.getAllTypesTickets();
  return typesTickets;
}

async function getTycketByUserId(userId: number): Promise<Ticket> {
  const enrollmentValidation = await enrollmentRepository.findEnrollmentByUserId(userId);

  if (!enrollmentValidation) throw notFoundError();

  const tickets = await ticketsRepository.getTycketByEnrollmentId(enrollmentValidation.id);

  if (!tickets) throw notFoundError();

  return tickets;
}

async function createTicket(userId: number, ticketTypeId: number) {
  if (!ticketTypeId) throw requestError(400, 'ticketTypeId is not present in body');

  const enrollmentValidation = await enrollmentRepository.findEnrollmentByUserId(userId);

  if (!enrollmentValidation) throw notFoundError();

  const status: TicketStatus = 'RESERVED';

  const newTicket = await ticketsRepository.createTicket(enrollmentValidation.id, ticketTypeId, status);
  return newTicket;
}

const ticketsService = {
  getTypesTickets,
  getTycketByUserId,
  createTicket,
};

export default ticketsService;
