import axios from "axios"

test("Deve comprar im ingresso", async function() {
  const input = {
    eventId: "eventId",
    email: "john.dow@gmail.com",
    creditCardToken: "987654321"
  }
  
  const response = await axios.post('http://localhost:3000/purchase_ticket', input)
  const output = response.data

  expect(output.ticketId).toBeDefined()
  /*expect(output.tid).toBeDefined()
  expect(output.status).toBe("approved")
  expect(output.price).toBe(300)*/
})