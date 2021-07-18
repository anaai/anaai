import React from "react";

export const ImageUploader: React.FC<{}> = () => (
  <>
    <label htmlFor="image-upload-input">Upload image</label>
    <input type="file" accept=".jpg,.jpeg,.png,.gif" id="image-upload-input" />
  </>
);
