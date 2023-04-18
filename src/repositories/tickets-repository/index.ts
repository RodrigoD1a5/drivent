import { Ticket, TicketStatus, TicketType } from '@prisma/client';
import { prisma } from '@/config';

async function getAllTypesTickets(): Promise<TicketType[] | []> {
  return await prisma.ticketType.findMany();
}

async function getTycketByUserId(enrollmentId: number): Promise<Ticket> {
  return prisma.ticket.findFirst({
    where: { enrollmentId },
    include: {
      TicketType: true,
    },
  });
}

async function getTycketById(ticketId: number): Promise<Ticket> {
  return prisma.ticket.findFirst({
    where: {
      id: ticketId,
    },
  });
}

async function createTicket(enrollmentId: number, ticketTypeId: number, status: TicketStatus) {
  return prisma.ticket.create({
    data: {
      enrollmentId,
      ticketTypeId,
      status,
    },
    include: {
      TicketType: true,
    },
  });
}

const ticketsRepository = {
  getAllTypesTickets,
  getTycketByUserId,
  createTicket,
  getTycketById,
};

export default ticketsRepository;
