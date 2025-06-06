import TicketModel from '../models/Ticket.js';
import { v4 as uuidv4 } from 'uuid';

export default class TicketService {
  async createTicket(purchaserEmail, amount) {
    const code = uuidv4(); // genera un código único

    const newTicket = {
      code,
      purchase_datetime: new Date(),
      amount,
      purchaser: purchaserEmail,
    };

    const ticket = await TicketModel.create(newTicket);
    return ticket;
  }

  async getTicketById(id) {
    return await TicketModel.findById(id);
  }
}
