import React, { ChangeEventHandler, useState } from "react";

export const ImageUploader: React.FC<{}> = () => {
  const [clientImage, setClientImage] = useState<{
    imageUrl: string | null;
    image: File | null;
  }>({
    imageUrl: null,
    image: null,
  });

  const handleImageSelect: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (event.target.files && event.target.files[0]) {
      setClientImage({
        imageUrl: URL.createObjectURL(event.target.files[0]),
        image: event.target.files[0],
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

      {clientImage && <img src={clientImage.imageUrl as string} alt="Selected"/>}
    </>
  );
};
