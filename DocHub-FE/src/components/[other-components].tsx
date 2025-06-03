'use client'

import { useState } from 'react';

export default function ImageConverterPage() {
  const [image, setImage] = useState(null);
  const [outputFormat, setOutputFormat] = useState('png');
  const [convertedImage, setConvertedImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleFormatChange = (e) => {
    setOutputFormat(e.target.value);
  };

  const handleConvert = () => {
    if (!image) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const img = new Image();
      img.src = reader.result;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        canvas.toBlob((blob) => {
          const url = URL.createObjectURL(blob);
          setConvertedImage(url);
        }, outputFormat);
      };
    };
    reader.readAsDataURL(image);
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl mb-4">Image Converter</h1>
      <input type="file" accept="image/*" onChange={handleImageChange} className="mb-2" />
      <select value={outputFormat} onChange={handleFormatChange} className="mb-2">
        <option value="png">PNG</option>
        <option value="jpeg">JPEG</option>
        <option value="webp">WEBP</option>
      </select>
      <button onClick={handleConvert} className="bg-blue-500 text-white px-4 py-2 rounded">
        Convert
      </button>
      {convertedImage && (
        <div className="mt-4">
          <h2 className="text-lg">Converted Image:</h2>
          <img src={convertedImage} alt="Converted" className="mt-2" />
        </div>
      )}
    </div>
  );
}