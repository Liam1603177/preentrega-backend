import Ticket from '../models/Ticket.js';
import { v4 as uuidv4 } from 'uuid';

export default class TicketManager {
  async createTicket(purchaser, amount) {
    const code = uuidv4();

    const ticket = await Ticket.create({
      code,
      amount,
      purchaser
    });

    return ticket;
  }
}
