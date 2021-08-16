curl -d '{"recipient": "0xc043945B556B526689270d87A7ac58B286F31308", "token_id": 1, "price": 0}'\
  -H "Content-Type: application/json"\
  -X POST http://localhost:8000/transfer_token
