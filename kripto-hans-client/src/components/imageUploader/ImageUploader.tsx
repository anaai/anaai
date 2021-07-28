import axios from "axios";
import React, { ChangeEventHandler, useState } from "react";

interface ClientImage {
  url: string;
  file: File;
}

export const ImageUploader: React.FC<{}> = () => {
  const [clientImage, setClientImage] = useState<ClientImage | null>(null);

  const handleImageSelect: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (event.target.files?.[0]) {
      setClientImage({
        url: URL.createObjectURL(event.target.files[0]),
        file: event.target.files[0],
      });
    }
  };

  const handleImageUpload: () => void = async () => {
    if (!clientImage) return;

    const url = `${process.env.REACT_APP_SERVICE_URL!}/cartoonify`;
    const formData = new FormData();
    formData.append("image", clientImage.file);
    const result = await axios.post(url, formData);
    console.log(result);
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

      {clientImage && (
        <div>
          <img src={clientImage.url} alt="Selected" />
          <button onClick={handleImageUpload}>Upload image</button>
        </div>
      )}
    </>
  );
};
