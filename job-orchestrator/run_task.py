from tasks import cartoonify

image_url = "https://upload.wikimedia.org/wikipedia/it/f/fd/Gabumon.png"
recipient = "0xc043945B556B526689270d87A7ac58B286F31308"
payer = "0xc043945B556B526689270d87A7ac58B286F31308"
price = 0
image_name = "kikibracala"

r = cartoonify.delay(recipient, payer, price, image_url, image_name)
result = r.get(timeout=30)
print(result)
