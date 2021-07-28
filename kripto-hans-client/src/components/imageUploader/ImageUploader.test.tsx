import { fireEvent, render, screen } from "@testing-library/react";
import { ImageUploader } from "./ImageUploader";

test("renders image upload input", () => {
  render(<ImageUploader />);
  const inputElement = screen.getByLabelText("Upload image");
  expect(inputElement).toBeInTheDocument();
});

test("allows user to select an image", () => {
  window.URL.createObjectURL = function () {} as any;
  render(<ImageUploader />);
  const inputElement = screen.getByLabelText(
    "Upload image"
  ) as HTMLInputElement;
  const file = new File(["(⌐□_□)"], "chucknorris.png", { type: "image/png" });
  fireEvent.change(inputElement, {
    target: {
      files: [file],
    },
  });
  expect(inputElement.files![0]).toBe(file);
});
