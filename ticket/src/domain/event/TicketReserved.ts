export default class TicketReserved {
  constructor(readonly tickedId: string, readonly eventId: string, readonly creditCardToken: string, readonly price: number) {}
}