curl -d '{"image_url": "https://ideascdn.lego.com/media/generate/lego_ci/dfda0c75-0eb4-4f5e-b859-d891088d3096/resize:950:633/legacy", "image_name": "test-image.jpeg"}'\
  -H "Content-Type: application/json"\
  -X POST http://localhost:8000/cartoonify
