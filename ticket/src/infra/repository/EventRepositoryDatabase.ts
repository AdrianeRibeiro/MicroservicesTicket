import EventRepository from "../../application/repository/EventRepository";
import pgp from "pg-promise"
import Event from "../../domain/entities/Event";

export default class EventRepositoryDatabase implements EventRepository {

  async get(eventId: string): Promise<Event> {
    const url = 'postgres://postgres:postgres@localhost:5432/fullcycle'
    const connection = pgp()(url)
    const [eventData] = await connection.query("select * from fullcycle.event where event_id = $1", [eventId])
    await connection.$pool.end()
    
    return new Event(eventData.event_id, eventData.description, parseFloat(eventData.price), eventData.capacity)
  }
}
