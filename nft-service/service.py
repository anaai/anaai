import os
from dotenv import load_dotenv

from fastapi import FastAPI
from fastapi.responses import JSONResponse
from pydantic import BaseModel

from web3 import Web3

import logger
from contracts import style_art_factory

load_dotenv()

PUBLIC_KEY = Web3.toChecksumAddress(os.getenv("PUBLIC_KEY"))
PRIVATE_KEY = f'0x{os.getenv("PRIVATE_KEY")}'
API_URL = os.getenv("API_URL")
CONTRACT_ADDRESS = Web3.toChecksumAddress(os.getenv("CONTRACT_ADDRESS"))
CONTRACT_PATH = "contracts/StyleArt.json"

app = FastAPI()

class NFTPayload(BaseModel):
  payer: str
  token_uri: str

@app.get("/status")
async def get_status():
  return "Service running"

@app.post("/mint_nft")
async def mint_nft(nft: NFTPayload):
  contract = style_art_factory(PUBLIC_KEY, PRIVATE_KEY, API_URL, CONTRACT_ADDRESS, CONTRACT_PATH)
  token_id = contract.mint_nft(Web3.toChecksumAddress(nft.payer),
                               nft.token_uri)

  logger.log_token_minted(nft.payer, token_id, nft.token_uri)
  return JSONResponse({"token_id": token_id})
