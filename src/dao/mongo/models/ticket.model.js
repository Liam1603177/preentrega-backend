import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    default: function() {
      return 'TICKET-' + Math.random().toString(36).substring(2, 10).toUpperCase();
    }
  },
  purchase_datetime: {
    type: Date,
    default: () => new Date(),
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  purchaser: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  }
}, {
  timestamps: false,
  versionKey: false
});

const TicketModel = mongoose.model('Ticket', ticketSchema);

export default TicketModel;
