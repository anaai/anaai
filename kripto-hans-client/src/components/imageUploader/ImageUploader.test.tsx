import { fireEvent, render, screen } from '@testing-library/react';
import { ImageUploader } from './ImageUploader';

test('renders image upload input', () => {
  render(<ImageUploader />);
  const inputElement = screen.getByLabelText('Upload image');
  expect(inputElement).toBeInTheDocument();
});

test('allows user to select an image', () => {
  window.URL.createObjectURL = function () {
    return '^_^';
  };
  render(<ImageUploader />);
  const inputElement = screen.getByLabelText('Upload image') as HTMLInputElement;
  const file = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' });
  fireEvent.change(inputElement, {
    target: {
      files: [file]
    }
  });

  expect((inputElement.files as FileList)[0]).toBe(file);
});

test('allows user to upload the selected image', () => {
  window.URL.createObjectURL = function () {
    return '^_^';
  };
  render(<ImageUploader />);
  const inputElement = screen.getByLabelText('Upload image') as HTMLInputElement;
  const file = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' });
  fireEvent.change(inputElement, {
    target: {
      files: [file]
    }
  });
  const uploadButtonElement = screen.getByText('Upload');

  expect(uploadButtonElement).toBeVisible();
});
