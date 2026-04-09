import { revalidatePath } from 'next/cache';

export const PUBLIC_VEHICLES_REVALIDATE_SECONDS = 120;
export const PUBLIC_AUTO_REFRESH_INTERVAL_MS = 3 * 60 * 1000;
export const PUBLIC_REFRESH_COOLDOWN_MS = 45 * 1000;

export function revalidatePublicVehiclePaths(vehicleId?: string) {
  revalidatePath('/');
  revalidatePath('/vehicles');

  if (vehicleId) {
    revalidatePath(`/vehicles/${vehicleId}`);
  }
}
