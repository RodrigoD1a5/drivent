import { TicketType } from '.prisma/client';
import { notFoundError } from '@/errors';
import enrollmentRepository from '@/repositories/enrollment-repository';
import ticketsRepository from '@/repositories/tickets-repository';

async function getTypesTickets(): Promise<TicketType[]> {
  const typesTickets = await ticketsRepository.getAllTypesTickets();
  return typesTickets;
}

async function getTycketByUserId(userId: number) {
  const enrollmentValidation = await enrollmentRepository.findEnrollmentByUserId(userId);

  if (!enrollmentValidation) throw notFoundError();

  const tickets = await ticketsRepository.getTycketByUserId(enrollmentValidation.id);

  if (!tickets) throw notFoundError();

  return tickets;
}

const ticketsService = {
  getTypesTickets,
  getTycketByUserId,
};

export default ticketsService;
