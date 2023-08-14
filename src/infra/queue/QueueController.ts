import PaymentApproved from "../../domain/event/PaymentApproved";
import TicketReserved from "../../domain/event/TicketReserved";
import Registry from "../registry/Registry";

export default class QueueController {
  constructor(readonly registry: Registry) {
    const queue = registry.inject("queue")
    const processPayment = registry.inject("processPayment")
    const approveTicket = registry.inject("approveTicket")

    queue.on("ticketReserved", async function (event: TicketReserved) {
      await processPayment.execute(event)
    })

    queue.on("paymentApproved", async function (event: PaymentApproved) {
      await approveTicket.execute(event)
    })
  }
}