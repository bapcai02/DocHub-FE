// filepath: c:\xampp\htdocs\DocHub-FE\src\app\image-converter\page.tsx
'use client'

import { useState } from 'react';
import MainLayout from '@/components/Home/MainLayout';

export default function ImageConverterPage() {
  const [image, setImage] = useState(null);
  const [outputFormat, setOutputFormat] = useState('png');
  const [conversionResult, setConversionResult] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleFormatChange = (e) => {
    setOutputFormat(e.target.value);
  };

  const handleConvert = async () => {
    if (!image) return;

    const formData = new FormData();
    formData.append('image', image);
    formData.append('format', outputFormat);

    // Simulate an API call to convert the image
    // Replace with actual API endpoint
    const response = await fetch('/api/convert-image', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      const result = await response.blob();
      const url = URL.createObjectURL(result);
      setConversionResult(url);
    }
  };

  return (
    <MainLayout>
      <section className="flex-1 flex flex-col items-center justify-center text-white">
        <h1 className="text-2xl mb-4">Image Converter</h1>
        <input type="file" accept="image/*" onChange={handleImageChange} className="mb-4" />
        <select value={outputFormat} onChange={handleFormatChange} className="mb-4">
          <option value="png">PNG</option>
          <option value="jpg">JPG</option>
          <option value="gif">GIF</option>
        </select>
        <button onClick={handleConvert} className="bg-blue-500 text-white px-4 py-2 rounded">
          Convert
        </button>
        {conversionResult && (
          <div className="mt-4">
            <h2 className="text-lg">Converted Image:</h2>
            <img src={conversionResult} alt="Converted" className="mt-2" />
          </div>
        )}
      </section>
    </MainLayout>
  );
}