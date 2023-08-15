import pgp from "pg-promise"
import Transaction from "../../domain/entities/Transaction";
import TransactionRepository from "../../application/repository/TransactionRepository";

export default class TransactionRepositoryDatabase implements TransactionRepository {

  async save(transaction: Transaction): Promise<void> {
    const url = "postgres://postgres:postgres@localhost:5432/fullcycle"
    const connection = pgp()(url)
    await connection.query("insert into fullcycle.transaction (transaction_id, ticket_id, event_id, tid, price, status) values ($1, $2, $3, $4, $5, $6)", [transaction.transactionId, transaction.ticketId, transaction.eventId, transaction.tid, transaction.price, transaction.status])
    await connection.$pool.end()
  }
}