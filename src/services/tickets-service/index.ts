import { TicketType } from '.prisma/client';
import ticketsRepository from '@/repositories/tickets-repository';

async function getTypesTickets(): Promise<TicketType[]> {
  const typesTickets = await ticketsRepository.getAllTypesTickets();
  return typesTickets;
}

const ticketsService = {
  getTypesTickets,
};

export default ticketsService;
