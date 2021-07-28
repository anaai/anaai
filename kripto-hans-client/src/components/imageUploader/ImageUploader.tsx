import React, { ChangeEventHandler, useState } from "react";

export const ImageUploader: React.FC<{}> = () => {
  const [clientImage, setClientImage] = useState<{
    imageUrl: string;
    imageFile: File;
  } | null>(null);

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
