import { render, screen } from "@testing-library/react";
import { ImageUploader } from "./ImageUploader";

test("renders image upload input", () => {
  render(<ImageUploader />);
  const inputElement = screen.getByLabelText("Upload image");
  expect(inputElement).toBeInTheDocument();
});
