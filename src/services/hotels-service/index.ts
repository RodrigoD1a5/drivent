import { notFoundError, paymentRequiredError } from '@/errors';
import enrollmentRepository from '@/repositories/enrollment-repository';
import hotelRepository from '@/repositories/hotels-repository';
import ticketsRepository from '@/repositories/tickets-repository';

async function getHotels(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);

  if (!enrollment) throw notFoundError();

  const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);

  if (!ticket) throw notFoundError();

  if (ticket.status === 'RESERVED' || ticket.TicketType.includesHotel === false || ticket.TicketType.isRemote === true)
    throw paymentRequiredError();

  const hotels = await hotelRepository.getHotels();

  if (hotels.length === 0) throw notFoundError();

  return hotels;
}

async function getRoomsByHotelId(hotelId: number, userId: number) {
  const hotel = await hotelRepository.getHotelById(hotelId);

  if (!hotel) throw notFoundError();

  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);

  if (!enrollment) throw notFoundError();

  const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);

  if (!ticket) throw notFoundError();

  if (ticket.status === 'RESERVED' || ticket.TicketType.includesHotel === false || ticket.TicketType.isRemote === true)
    throw paymentRequiredError();

  const rooms = await hotelRepository.getRoomsByHotelId(hotelId);

  if (!rooms) throw notFoundError();

  return rooms;
}

const hotelsService = {
  getHotels,
  getRoomsByHotelId,
};

export default hotelsService;
