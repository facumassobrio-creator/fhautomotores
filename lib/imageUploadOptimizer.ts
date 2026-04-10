import sharp from 'sharp';

const MAX_UPLOAD_IMAGE_DIMENSION = 1600;
const WEBP_UPLOAD_QUALITY = 80;

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
    return { image, wasResized: false };
  }

  if (metadata.width <= MAX_UPLOAD_IMAGE_DIMENSION && metadata.height <= MAX_UPLOAD_IMAGE_DIMENSION) {
    return { image, wasResized: false };
  }

  return {
    image: image.resize({
      width: MAX_UPLOAD_IMAGE_DIMENSION,
      height: MAX_UPLOAD_IMAGE_DIMENSION,
      fit: 'inside',
      withoutEnlargement: true,
    }),
    wasResized: true,
  };
}

export async function optimizeImageForUpload(file: File): Promise<OptimizedUploadImage> {
  const originalBuffer = Buffer.from(await file.arrayBuffer());
  const mimeType = (file.type || '').toLowerCase();

  try {
    const { image: baseImage, wasResized } = await optimizeImageBuffer(originalBuffer);

    if (mimeType === 'image/webp' && !wasResized) {
      return {
        buffer: originalBuffer,
        fileName: replaceExtension(file.name, '.webp'),
        contentType: 'image/webp',
      };
    }

    return {
      buffer: await baseImage.webp({ quality: WEBP_UPLOAD_QUALITY }).toBuffer(),
      fileName: replaceExtension(file.name, '.webp'),
      contentType: 'image/webp',
    };
  } catch {
    return {
      buffer: originalBuffer,
      fileName: file.name,
      contentType: file.type || 'application/octet-stream',
    };
  }
}
