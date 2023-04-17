import { Ticket, TicketType } from '@prisma/client';
import { prisma } from '@/config';

async function getAllTypesTickets(): Promise<TicketType[] | []> {
  return await prisma.ticketType.findMany();
}

async function getTycketByUserId(enrollmentId: number) {
  return prisma.ticket.findFirst({
    where: { enrollmentId },
    include: {
      TicketType: true,
    },
  });
}

const ticketsRepository = {
  getAllTypesTickets,
  getTycketByUserId,
};

export default ticketsRepository;
