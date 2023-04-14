import { TicketType } from '@prisma/client';
import { prisma } from '@/config';

async function getAllTypesTickets(): Promise<TicketType[] | []> {
  return await prisma.ticketType.findMany();
}

const ticketsRepository = {
  getAllTypesTickets,
};

export default ticketsRepository;
