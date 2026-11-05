import { Property, Project, ApartmentPlan } from '../types';

export const WHATSAPP_DISPLAY_NUMBER = '03117000900';
export const WHATSAPP_INTL_NUMBER = '923117000900';
export const WHATSAPP_DEFAULT_MESSAGE =
  'Assalam-o-Alaikum! I am interested in your real estate services. I would like to get more information about available properties and projects.';

/**
 * Normalizes any Pakistani or international phone number into a 92XXXXXXXXXX format for wa.me
 */
export function formatWhatsAppIntl(phone?: string): string {
  if (!phone) return WHATSAPP_INTL_NUMBER;
  const digits = phone.replace(/\D/g, '');
  if (digits.startsWith('92')) return digits;
  if (digits.startsWith('0')) return '92' + digits.slice(1);
  if (digits.length === 10) return '92' + digits;
  return digits || WHATSAPP_INTL_NUMBER;
}

/**
 * Builds the official WhatsApp click-to-chat URL with safely encoded pre-filled text
 */
export function getWhatsAppUrl(message?: string, phone?: string): string {
  const targetPhone = formatWhatsAppIntl(phone);
  const text = message?.trim() || WHATSAPP_DEFAULT_MESSAGE;
  return `https://wa.me/${targetPhone}?text=${encodeURIComponent(text)}`;
}

/**
 * Direct WhatsApp chat URL generator for a specific Property listing
 */
export function getPropertyWhatsAppUrl(property: Property, phone?: string): string {
  const priceDisplay =
    'PKR ' + property.pricePKR.toLocaleString('en-PK') + (property.purpose === 'Rent' ? ' / month' : '');

  const message = `Assalam-o-Alaikum! I am interested in this property:

Property: ${property.title}
Location: ${property.location}
Price: ${priceDisplay}
Property Type: ${property.category} (For ${property.purpose})
Reference ID: ${property.id}

Please share more details.`;

  return getWhatsAppUrl(message, phone);
}

/**
 * Direct WhatsApp chat URL generator for signature development Projects
 */
export function getProjectWhatsAppUrl(project: Project, phone?: string): string {
  const message = `Assalam-o-Alaikum! I would like to get more information about ${project.name} in ${project.city}. Please share the available apartment types, payment plans, and further details.`;
  return getWhatsAppUrl(message, phone);
}

/**
 * Direct WhatsApp chat URL generator for an Apartment configuration & payment plan
 */
export function getApartmentWhatsAppUrl(
  project: Project,
  apartment: ApartmentPlan,
  phone?: string
): string {
  const formattedPrice = 'PKR ' + apartment.totalPricePKR.toLocaleString('en-PK');
  const formattedBooking = 'PKR ' + apartment.bookingAmountPKR.toLocaleString('en-PK');

  const message = `Assalam-o-Alaikum! I am interested in the ${apartment.title} at ${project.name}, ${project.city}.

Total Price: ${formattedPrice}
Booking Amount: ${formattedBooking}
Area: ${apartment.sizeSqFt} Sq Ft

Please provide more information about the payment plan and booking process.`;

  return getWhatsAppUrl(message, phone);
}

