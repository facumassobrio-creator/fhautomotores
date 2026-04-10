export const IMAGE_OPTIMIZATION_CONFIG = {
  maxDimension: 1600,
  outputMimeType: "image/webp",
  quality: 0.78,
  fallbackJpegQuality: 0.82,
  // If WebP output is <= 10% larger than source, keep WebP to normalize format.
  normalizeToleranceRatio: 1.1,
} as const;

const ALLOWED_INPUT_MIME_TYPES = new Set(["image/jpeg", "image/jpg", "image/png", "image/webp"]);

export type OptimizedImageResult = {
  file: File;
  wasOptimized: boolean;
  wasResized: boolean;
  sourceWidth: number;
  sourceHeight: number;
  outputWidth: number;
  outputHeight: number;
};

export function validateUploadImage(file: File): string | null {
  if (!(file instanceof File)) {
    return "Archivo inválido.";
  }

  if (!file.size) {
    return "El archivo está vacío.";
  }

  const mimeType = (file.type || "").toLowerCase();
  if (!ALLOWED_INPUT_MIME_TYPES.has(mimeType)) {
    return `Formato no permitido (${mimeType || "desconocido"}).`;
  }

  return null;
}

function replaceExtension(fileName: string, extension: string): string {
  const cleanName = fileName.replace(/\.[^/.]+$/, "");
  return `${cleanName}${extension}`;
}

function loadImageFromFile(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    const objectUrl = URL.createObjectURL(file);

    image.onload = () => {
      URL.revokeObjectURL(objectUrl);
      resolve(image);
    };
    image.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("No se pudo interpretar la imagen."));
    };
    image.src = objectUrl;
  });
}

function getTargetDimensions(width: number, height: number): { width: number; height: number } {
  const maxDimension = IMAGE_OPTIMIZATION_CONFIG.maxDimension;

  if (width <= maxDimension && height <= maxDimension) {
    return { width, height };
  }

  const scale = Math.min(maxDimension / width, maxDimension / height);
  return {
    width: Math.max(1, Math.round(width * scale)),
    height: Math.max(1, Math.round(height * scale)),
  };
}

function imageToBlob(source: CanvasImageSource, width: number, height: number, mimeType: string, quality: number): Promise<Blob> {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext("2d", { alpha: false });
  if (!context) {
    throw new Error("No se pudo inicializar el canvas para optimizar la imagen.");
  }

  context.drawImage(source, 0, 0, width, height);

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("No se pudo generar el archivo optimizado."));
          return;
        }
        resolve(blob);
      },
      mimeType,
      quality
    );
  });
}

function shouldKeepOptimizedFile(original: File, optimizedBlob: Blob, wasResized: boolean, outputMimeType: string): boolean {
  if (wasResized) {
    return true;
  }

  const ratio = optimizedBlob.size / original.size;
  if (ratio <= 1) {
    return true;
  }

  const sourceMimeType = (original.type || "").toLowerCase();
  if (sourceMimeType === outputMimeType) {
    return false;
  }

  if (outputMimeType !== IMAGE_OPTIMIZATION_CONFIG.outputMimeType) {
    return false;
  }

  return ratio <= IMAGE_OPTIMIZATION_CONFIG.normalizeToleranceRatio;
}

export async function optimizeImageForUpload(file: File): Promise<OptimizedImageResult> {
  const validationError = validateUploadImage(file);
  if (validationError) {
    throw new Error(validationError);
  }

  const source = await loadImageFromFile(file);
  const sourceWidth = source.naturalWidth || source.width;
  const sourceHeight = source.naturalHeight || source.height;
  const target = getTargetDimensions(sourceWidth, sourceHeight);
  const wasResized = target.width !== sourceWidth || target.height !== sourceHeight;

  let optimizedBlob: Blob;
  let outputMimeType: string = IMAGE_OPTIMIZATION_CONFIG.outputMimeType;
  let outputExtension: string = ".webp";

  try {
    optimizedBlob = await imageToBlob(source, target.width, target.height, IMAGE_OPTIMIZATION_CONFIG.outputMimeType, IMAGE_OPTIMIZATION_CONFIG.quality);
  } catch {
    try {
      outputMimeType = "image/jpeg";
      outputExtension = ".jpg";
      optimizedBlob = await imageToBlob(source, target.width, target.height, outputMimeType, IMAGE_OPTIMIZATION_CONFIG.fallbackJpegQuality);
    } catch {
      return {
        file,
        wasOptimized: false,
        wasResized: false,
        sourceWidth,
        sourceHeight,
        outputWidth: sourceWidth,
        outputHeight: sourceHeight,
      };
    }
  }

  if (!shouldKeepOptimizedFile(file, optimizedBlob, wasResized, outputMimeType)) {
    return {
      file,
      wasOptimized: false,
      wasResized: false,
      sourceWidth,
      sourceHeight,
      outputWidth: sourceWidth,
      outputHeight: sourceHeight,
    };
  }

  const optimizedFile = new File([optimizedBlob], replaceExtension(file.name, outputExtension), {
    type: outputMimeType,
    lastModified: Date.now(),
  });

  return {
    file: optimizedFile,
    wasOptimized: true,
    wasResized,
    sourceWidth,
    sourceHeight,
    outputWidth: target.width,
    outputHeight: target.height,
  };
}

export type BatchOptimizationError = {
  fileName: string;
  message: string;
};

export async function optimizeImagesBatch(files: File[]): Promise<{ files: File[]; errors: BatchOptimizationError[] }> {
  const optimizedFiles: File[] = [];
  const errors: BatchOptimizationError[] = [];

  for (const [index, file] of files.entries()) {
    try {
      const optimized = await optimizeImageForUpload(file);
      optimizedFiles.push(optimized.file);
    } catch (error) {
      errors.push({
        fileName: file?.name || `imagen-${index + 1}`,
        message: error instanceof Error ? error.message : "No se pudo procesar la imagen.",
      });
    }
  }

  return { files: optimizedFiles, errors };
}
