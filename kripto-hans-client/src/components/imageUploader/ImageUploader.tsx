import React, { ChangeEventHandler, useState } from "react";

interface ClientImage {
  imageUrl: string;
  imageFile: File;
}

export const ImageUploader: React.FC<{}> = () => {
  const [clientImage, setClientImage] = useState<ClientImage | null>(null);

  const handleImageSelect: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (event.target.files && event.target.files[0]) {
      setClientImage({
        imageUrl: URL.createObjectURL(event.target.files[0]),
        imageFile: event.target.files[0],
      });
    }
  };

  return (
    <>
      <label htmlFor="image-upload-input">Upload image</label>
      <input
        type="file"
        accept=".jpg,.jpeg,.png,.gif"
        id="image-upload-input"
        onChange={handleImageSelect}
      />

      {clientImage && <img src={clientImage.imageUrl} alt="Selected" />}
    </>
  );
};
