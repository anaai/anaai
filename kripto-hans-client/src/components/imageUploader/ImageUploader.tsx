import axios from "axios";
import React, { ChangeEventHandler, useState } from "react";

interface ClientImage {
  url: string;
  file: File;
}

export const ImageUploader: React.FC<{}> = () => {
  const [selectedImage, setSelectedImage] = useState<ClientImage | null>(null);

  const [processedImage, setProcessedImage] = useState<ClientImage | null>(
    null
  );

  const handleImageSelect: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (event.target.files?.[0]) {
      setSelectedImage({
        url: URL.createObjectURL(event.target.files[0]),
        file: event.target.files[0],
      });
    }
  };

  const handleImageUpload: () => void = async () => {
    if (!selectedImage) return;

    const url = `${process.env.REACT_APP_SERVICE_URL!}/cartoonify`;
    const formData = new FormData();
    formData.append("image", selectedImage.file);

    const response = await axios({
      url,
      method: "POST",
      data: formData,
      responseType: "blob",
    });

    const processedImageBlob = new Blob([response.data], {
      type: response.headers["content-type"],
    });

    const fileExtension = selectedImage.file.type.split("/")[1];

    const processedImageFile = new File(
      [processedImageBlob],
      `processed-image.${fileExtension}`
    );
    const processedImageUrl = URL.createObjectURL(processedImageBlob);

    setProcessedImage({ url: processedImageUrl, file: processedImageFile });
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

      {selectedImage && (
        <div>
          <img src={selectedImage.url} alt="Selected" />
          <button onClick={handleImageUpload}>Upload</button>
        </div>
      )}

      {processedImage && (
        <div>
          <img src={processedImage.url} alt="Processed" />
        </div>
      )}
    </>
  );
};
