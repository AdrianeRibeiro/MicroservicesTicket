import Ticket from "../../domain/entities/Ticket"
import TicketReserved from "../../domain/event/TicketReserved";
import Queue from "../../infra/queue/Queue";
import Registry from "../../infra/registry/Registry"
import EventRepository from "../repository/EventRepository";
import TicketRepository from "../repository/TicketRepository"
import ProcessPayment from "./ProcessPayment";

export default class ApproveTicket {
  ticketRepository: TicketRepository;

  constructor(readonly registry: Registry) {
    this.ticketRepository = registry.inject("ticketRepository")
  }

  async execute(input: Input): Promise<void> {
    const ticket = await this.ticketRepository.get(input.ticketId)
    ticket.approve()
    await this.ticketRepository.update(ticket)

  }
}

type Input = {
  ticketId: string
}
