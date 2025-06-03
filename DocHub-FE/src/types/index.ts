// This file exports TypeScript types and interfaces used throughout the application.

export interface ImageConversionOptions {
  format: 'jpeg' | 'png' | 'gif' | 'webp';
  quality?: number; // Quality for formats that support it
}

export interface ImageFile {
  name: string;
  size: number;
  type: string;
  lastModified: number;
  data: File; // The actual file data
}

export interface ConversionResult {
  success: boolean;
  message?: string;
  convertedImageUrl?: string; // URL of the converted image
}