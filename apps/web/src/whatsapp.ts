const whatsapp = import.meta.env?.VITE_WHATSAPP_NUMBER ?? '5562981200649';
export const makeWhatsAppUrl = (product: string, name: string, city: string) => `https://wa.me/${whatsapp}?text=${encodeURIComponent(`Olá! Tenho interesse no produto ${product}.\nNome: ${name}\nCidade: ${city}`)}`;
