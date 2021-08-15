curl -d '{"recipient": "0xc043945B556B526689270d87A7ac58B286F31308", "payer": "0xc043945B556B526689270d87A7ac58B286F31308", "token_uri": "https://gateway.pinata.cloud/ipfs/QmTLJSa7Pce19CHhKgSZoSbHtQPtBjVSHvhvR4bCKbbYUs", "price": 0}'\
  -H "Content-Type: application/json"\
  -X POST http://localhost:8000/mint_nft
