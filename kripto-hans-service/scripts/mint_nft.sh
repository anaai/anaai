curl -d '{"recipient": "0xc043945B556B526689270d87A7ac58B286F31308", "payer": "0xc043945B556B526689270d87A7ac58B286F31308", "token_uri": "https://gateway.pinata.cloud/ipfs/QmVHupbCiUYGa5ANmKGtfs8ceQKmtnY4SZL46WqpK6uVdC", "price": 0}'\
  -H "Content-Type: application/json"\
  -X POST http://localhost:8000/mint_nft
