import { Ticket, TicketStatus, TicketType } from '@prisma/client';
import { prisma } from '@/config';

async function getAllTypesTickets(): Promise<TicketType[] | []> {
  return await prisma.ticketType.findMany();
}

async function getTycketByEnrollmentId(enrollmentId: number) {
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

async function updateTicket(ticketId: number, status: TicketStatus) {
  return prisma.ticket.update({
    where: {
      id: ticketId,
    },
    data: {
      status,
    },
  });
}

const ticketsRepository = {
  getAllTypesTickets,
  getTycketByEnrollmentId,
  createTicket,
  getTycketById,
  updateTicket,
};

export default ticketsRepository;
