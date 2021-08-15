from tasks import cartoonify
img_url = "https://upload.wikimedia.org/wikipedia/it/f/fd/Gabumon.png"
r = cartoonify.delay(img_url, "kikibracala")
result = r.get(timeout=30)
print(result)
