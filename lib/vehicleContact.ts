import { siteConfig } from '@/config/site';
import { buildWhatsAppUrl } from '@/lib/whatsapp';

export interface VehicleContactInfo {
  brand: string;
  model: string;
  variant?: string | null;
}

export function buildVehicleDisplayName(vehicle: VehicleContactInfo): string {
  const brand = vehicle.brand?.trim() || '';
  const model = vehicle.model?.trim() || '';
  const base = `${brand} ${model}`.trim();
  const variant = vehicle.variant?.trim();

  if (!variant) {
    return base || 'sin identificar';
  }

  return `${base} ${variant}`.trim();
}

export function buildVehicleInquiryMessage(vehicle: VehicleContactInfo): string {
  const vehicleName = buildVehicleDisplayName(vehicle);
  return siteConfig.messages.vehicleInquiryShortTemplate
    .replace('{{vehicleName}}', vehicleName || 'sin identificar');
}

export function buildVehicleWhatsAppUrl(vehicle: VehicleContactInfo): string {
  const message = buildVehicleInquiryMessage(vehicle);
  return buildWhatsAppUrl(message);
}
