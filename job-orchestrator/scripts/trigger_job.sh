curl -d '{"image_url": "https://ideascdn.lego.com/media/generate/lego_ci/dfda0c75-0eb4-4f5e-b859-d891088d3096/resize:950:633/legacy", "image_name": "test-image.jpeg", "payer": "0xc043945B556B526689270d87A7ac58B286F31308"}' \
  -H "Content-Type: application/json" \
  -X POST http://ec2-18-219-110-34.us-east-2.compute.amazonaws.com:6000/cartoonify
