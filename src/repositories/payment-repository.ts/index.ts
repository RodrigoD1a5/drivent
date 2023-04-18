import { Payment } from '@prisma/client';
import { prisma } from '@/config';

async function getPaymentByTicketId(ticketId: number) {
  return await prisma.payment.findFirst({
    where: {
      ticketId,
    },
  });
}

async function createPayment(data: Omit<Payment, 'id' | 'createdAt' | 'updatedAt'>) {
  return await prisma.payment.create({
    data,
  });
}

const paymentsRepository = {
  getPaymentByTicketId,
  createPayment,
};

export default paymentsRepository;
