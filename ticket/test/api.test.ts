import axios from "axios"

test("Deve comprar im ingresso", async function() {
  const input = {
    eventId: "bf6a9b3d-4d5c-4c9d-bf3b-4a091b05dc76",
    email: "john.dow@gmail.com",
    creditCardToken: "987654321"
  }
  
  const response = await axios.post('http://localhost:3001/purchase_ticket', input)
  const output = response.data

  expect(output.ticketId).toBeDefined()
})
