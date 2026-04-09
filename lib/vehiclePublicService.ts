import { supabase } from "@/lib/supabaseClient";
import type { Vehicle } from "@/types/vehicle";
import type { VehicleImage } from "@/types/vehicleImage";

const VEHICLE_IMAGES_BUCKET = "vehicle-images";
const ENABLE_SUPABASE_TRANSFORMS = process.env.NEXT_PUBLIC_SUPABASE_IMAGE_TRANSFORMS === "true";

const LIST_PRIMARY_TRANSFORM = {
  width: 900,
  height: 620,
  quality: 78,
  resize: "cover" as const,
};

const DETAIL_MAIN_TRANSFORM = {
  width: 1600,
  height: 1200,
  quality: 82,
  resize: "contain" as const,
};

const DETAIL_THUMB_TRANSFORM = {
  width: 320,
  height: 240,
  quality: 72,
  resize: "cover" as const,
};

function sortImagesByPosition(images: VehicleImage[]): VehicleImage[] {
  return [...images].sort((a, b) => {
    const positionDiff = (a.position ?? 0) - (b.position ?? 0);
    if (positionDiff !== 0) {
      return positionDiff;
    }
    return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
  });
}

export type VehicleImageWithUrl = VehicleImage & {
  url?: string | null;
  thumbnail_url?: string | null;
};

export type VehicleWithImages = Vehicle & {
  images: VehicleImageWithUrl[];
  primary_image_url?: string | null;
};

function getPublicImageUrl(storagePath: string | null | undefined, transform?: {
  width: number;
  height: number;
  quality: number;
  resize: "cover" | "contain";
}): string | null {
  if (!storagePath) {
    return null;
  }

  const { data: publicUrlData } = transform && ENABLE_SUPABASE_TRANSFORMS
    ? supabase.storage.from(VEHICLE_IMAGES_BUCKET).getPublicUrl(storagePath, { transform })
    : supabase.storage.from(VEHICLE_IMAGES_BUCKET).getPublicUrl(storagePath);

  return publicUrlData.publicUrl;
}

export async function getPublishedVehicles(): Promise<VehicleWithImages[]> {
  const { data, error } = await supabase
    .from("vehicles")
    .select("*, vehicle_images(*)")
    .eq("is_published", true)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  if (!data) return [];

  const result = await Promise.all(
    data.map(async (vehicle) => {
      const imagesRaw = (vehicle.vehicle_images as unknown as VehicleImage[]) ?? [];
      const orderedImagesRaw = sortImagesByPosition(imagesRaw);
      const images: VehicleImageWithUrl[] = orderedImagesRaw.map((img): VehicleImageWithUrl => {
        const url = getPublicImageUrl(img.storage_path, LIST_PRIMARY_TRANSFORM);
        return { ...img, url, thumbnail_url: url };
      });

      const primaryImage = images.find((img) => img.is_primary);
      const primary_image_url = primaryImage?.url ?? null;

      return {
        ...(vehicle as Vehicle),
        images,
        primary_image_url,
      };
    })
  );

  return result;
}

export async function getPublishedVehicleById(vehicleId: string): Promise<VehicleWithImages | null> {
  const { data, error } = await supabase
    .from("vehicles")
    .select("*, vehicle_images(*)")
    .eq("id", vehicleId)
    .eq("is_published", true)
    .single();

  if (error) {
    if (error.code === "PGRST116") return null;
    throw new Error(error.message);
  }

  if (!data) return null;

  const imagesRaw = (data.vehicle_images as unknown as VehicleImage[]) ?? [];
  const orderedImagesRaw = sortImagesByPosition(imagesRaw);
  const images: VehicleImageWithUrl[] = orderedImagesRaw.map((img): VehicleImageWithUrl => {
    const url = getPublicImageUrl(img.storage_path, DETAIL_MAIN_TRANSFORM);
    const thumbnail_url = getPublicImageUrl(img.storage_path, DETAIL_THUMB_TRANSFORM);
    return { ...img, url, thumbnail_url };
  });

  const primaryImage = images.find((img) => img.is_primary);
  const primary_image_url = primaryImage?.url ?? null;

  return {
    ...(data as Vehicle),
    images,
    primary_image_url,
  };
}
