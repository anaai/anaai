import requests
import json

PIN_IMAGE_URL = "https://api.pinata.cloud/pinning/pinFileToIPFS"
PIN_JSON_URL = "https://api.pinata.cloud/pinning/pinJSONToIPFS"
TEMPLATE_PATH = "templates/nft-metadata-template.json"
IPFS_GATEWAY_BASE_URL = "https://gateway.pinata.cloud/ipfs"

class PinataClient:
  def __init__(self, jwt):
    self.headers = {"Authorization": f"Bearer {jwt}"}

  def pin_image(self, image_path):
    files = self._files(image_path)
    response = requests.post(PIN_IMAGE_URL, headers=self.headers, files=files)
    # catch exception and throw a semantical one
    return self._ipfs_hash(response.json()["IpfsHash"])

  def pin_metadata(self, image_url, name, payer, transformation_name):
    data = self._json_data(TEMPLATE_PATH)
    data["pinataMetadata"]["name"] = name

    data["pinataContent"]["name"] = name
    data["pinataContent"]["image"] = image_url
    data["pinataContent"]["attributes"][0]["value"] = transformation_name
    data["pinataContent"]["attributes"][1]["value"] = payer

    response = requests.post(PIN_JSON_URL, headers=self.headers, json=data)
    # catch exception and throw a semantical one
    return self._ipfs_hash(response.json()["IpfsHash"])

  def _files(self, image_path):
    return {"file": open(image_path, "rb")}

  def _json_data(self, file_path):
    with open(file_path) as f:
      data = json.load(f)

    return data

  def _ipfs_hash(self, ipfs_hash):
    return f"{IPFS_GATEWAY_BASE_URL}/{ipfs_hash}"
