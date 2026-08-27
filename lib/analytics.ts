// Pembungkus tipis di atas gtag. Setup GA4 penuh (script tag, measurement
// ID) baru dipasang di Fase 5 — helper ini SENGAJA no-op dengan aman kalau
// gtag belum dimuat, supaya komponen seperti WhatsAppButton bisa mulai
// memanggil trackEvent() sekarang tanpa menunggu Fase 5.
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(eventName: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", eventName, params);
}
