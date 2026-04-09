import sharp from 'sharp';

const MAX_UPLOAD_IMAGE_DIMENSION = 1920;
const JPEG_UPLOAD_QUALITY = 82;
const WEBP_UPLOAD_QUALITY = 80;
const PNG_UPLOAD_QUALITY = 82;

export interface OptimizedUploadImage {
  buffer: Buffer;
  fileName: string;
  contentType: string;
}

function replaceExtension(fileName: string, extension: string) {
  const cleanName = fileName.replace(/\.[^/.]+$/, '');
  return `${cleanName}${extension}`;
}

async function optimizeImageBuffer(input: Buffer) {
  const image = sharp(input, { failOnError: false }).rotate();
  const metadata = await image.metadata();

  if (!metadata.width || !metadata.height) {
    return image;
  }

  if (metadata.width <= MAX_UPLOAD_IMAGE_DIMENSION && metadata.height <= MAX_UPLOAD_IMAGE_DIMENSION) {
    return image;
  }

  return image.resize({
    width: MAX_UPLOAD_IMAGE_DIMENSION,
    height: MAX_UPLOAD_IMAGE_DIMENSION,
    fit: 'inside',
    withoutEnlargement: true,
  });
}

export async function optimizeImageForUpload(file: File): Promise<OptimizedUploadImage> {
  const originalBuffer = Buffer.from(await file.arrayBuffer());
  const mimeType = (file.type || '').toLowerCase();

  try {
    const baseImage = await optimizeImageBuffer(originalBuffer);

    if (mimeType === 'image/png') {
      return {
        buffer: await baseImage.png({ compressionLevel: 9, quality: PNG_UPLOAD_QUALITY }).toBuffer(),
        fileName: replaceExtension(file.name, '.png'),
        contentType: 'image/png',
      };
    }

    if (mimeType === 'image/webp') {
      return {
        buffer: await baseImage.webp({ quality: WEBP_UPLOAD_QUALITY }).toBuffer(),
        fileName: replaceExtension(file.name, '.webp'),
        contentType: 'image/webp',
      };
    }

    return {
      buffer: await baseImage.jpeg({ quality: JPEG_UPLOAD_QUALITY, mozjpeg: true, progressive: true }).toBuffer(),
      fileName: replaceExtension(file.name, '.jpg'),
      contentType: 'image/jpeg',
    };
  } catch {
    return {
      buffer: originalBuffer,
      fileName: file.name,
      contentType: file.type || 'application/octet-stream',
    };
  }
}
