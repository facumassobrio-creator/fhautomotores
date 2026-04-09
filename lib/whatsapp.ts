const FALLBACK_WHATSAPP_CONTACT_NUMBER = '543782444888';

function resolveWhatsAppContactNumber(): string {
  const rawNumber = process.env.NEXT_PUBLIC_WHATSAPP_CONTACT_NUMBER;
  const sanitizedNumber = rawNumber?.replace(/\D+/g, '');

  if (sanitizedNumber && sanitizedNumber.length >= 8) {
    return sanitizedNumber;
  }

  return FALLBACK_WHATSAPP_CONTACT_NUMBER;
}

export const WHATSAPP_CONTACT_NUMBER = resolveWhatsAppContactNumber();

export function buildGeneralWhatsAppInquiryMessage(): string {
  return 'Hola, estoy interesado en un vehículo. ¿Podrían brindarme más información?';
}

export function buildWhatsAppUrl(message?: string): string {
  if (!message) {
    return `https://wa.me/${WHATSAPP_CONTACT_NUMBER}`;
  }

  return `https://wa.me/${WHATSAPP_CONTACT_NUMBER}?text=${encodeURIComponent(message)}`;
}
