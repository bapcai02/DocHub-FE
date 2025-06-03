'use client'

import { useState } from 'react';
import MainLayout from '@/components/Home/MainLayout';

export default function ImageConverterPage() {
  const [imageFile, setImageFile] = useState(null);
  const [outputFormat, setOutputFormat] = useState('png');
  const [convertedImage, setConvertedImage] = useState(null);

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleFormatChange = (e) => {
    setOutputFormat(e.target.value);
  };

  const handleConvert = async () => {
    if (!imageFile) return;

    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append('format', outputFormat);

    // Simulate an API call for image conversion
    const response = await fetch('/api/convert-image', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setConvertedImage(url);
    } else {
      console.error('Image conversion failed');
    }
  };

  return (
    <MainLayout>
      <section className="flex-1 flex flex-col items-center justify-center text-white">
        <h1 className="text-2xl mb-4">Image Converter</h1>
        <input type="file" accept="image/*" onChange={handleFileChange} className="mb-4" />
        <select value={outputFormat} onChange={handleFormatChange} className="mb-4">
          <option value="png">PNG</option>
          <option value="jpg">JPG</option>
          <option value="gif">GIF</option>
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
      </section>
    </MainLayout>
  );
}