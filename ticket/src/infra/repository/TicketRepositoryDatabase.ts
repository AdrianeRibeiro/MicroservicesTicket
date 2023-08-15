import TicketRepository from "../../application/repository/TicketRepository";
import Ticket from "../../domain/entities/Ticket";
import pgp from "pg-promise"

export default class TicketRepositoryDatabase implements TicketRepository {
  async save(ticket: Ticket): Promise<void> {
    const url = 'postgres://postgres:postgres@localhost:5432/fullcycle'
    const connection = pgp()(url)
    await connection.query("insert into fullcycle.ticket (ticket_id, event_id, email, status) values ($1, $2, $3, $4)", [ticket.ticketId, ticket.eventId, ticket.email, ticket.status])
    await connection.$pool.end()
  }

  async update(ticket: Ticket): Promise<void> {
    const url = 'postgres://postgres:postgres@localhost:5432/fullcycle'
    const connection = pgp()(url)
    await connection.query("update fullcycle.ticket set status = $1 where ticket_id = $2", [ticket.status, ticket.ticketId])
    await connection.$pool.end()
  }

  async get(ticketId: string): Promise<Ticket | void> {
		const url = 'postgres://postgres:postgres@localhost:5432/fullcycle'
    const connection = pgp()(url)
		const [ticketData] = await connection.query("select * from fullcycle.ticket where ticket_id = $1", [ticketId]);
		await connection.$pool.end();

    if(ticketData) {
      return new Ticket(ticketData.ticket_id, ticketData.event_id, ticketData.email, ticketData.status);
    }
	}
}
