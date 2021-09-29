curl -d '{"payer": "0xc043945B556B526689270d87A7ac58B286F31308", "token_uri": "https://gateway.pinata.cloud/ipfs/QmTLJSa7Pce19CHhKgSZoSbHtQPtBjVSHvhvR4bCKbbYUs"}'\
  -H "Content-Type: application/json"\
  -X POST http://localhost:7000/mint_nft
