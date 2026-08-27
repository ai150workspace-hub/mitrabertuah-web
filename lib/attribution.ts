// Atribusi (§14): utm_*/gclid/fbclid/landing_page diambil dari URL SAAT
// HALAMAN PERTAMA DIBUKA, disimpan di sessionStorage, lalu dikirim
// bersama form — bahkan kalau pengunjung sudah pindah ke halaman lain
// (mis. baca artikel dulu) sebelum mengisi form. Itu sebabnya
// landing_page & referrer juga disimpan di sini, bukan dibaca ulang
// dari window.location saat submit (yang saat itu sudah bukan halaman
// masuk pertama).
export const ATTRIBUTION_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "gclid",
  "fbclid",
  "landing_page",
  "referrer",
] as const;

export type AttributionData = Partial<Record<(typeof ATTRIBUTION_KEYS)[number], string>>;

const URL_PARAM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "gclid",
  "fbclid",
] as const;

const SESSION_FLAG = "mb_attribution_captured";

/** Sisi TULIS — dipanggil sekali di klien saat halaman pertama dibuka. */
export function captureAttribution(): void {
  if (typeof window === "undefined") return;
  if (window.sessionStorage.getItem(SESSION_FLAG)) return; // sudah ditangkap sesi ini

  const params = new URLSearchParams(window.location.search);
  for (const key of URL_PARAM_KEYS) {
    const value = params.get(key);
    if (value) window.sessionStorage.setItem(`mb_${key}`, value);
  }

  window.sessionStorage.setItem("mb_landing_page", window.location.pathname);
  if (document.referrer) window.sessionStorage.setItem("mb_referrer", document.referrer);

  window.sessionStorage.setItem(SESSION_FLAG, "1");
}

/** Sisi BACA — dipakai form saat submit. */
export function getStoredAttribution(): AttributionData {
  if (typeof window === "undefined") return {};

  const result: AttributionData = {};
  for (const key of ATTRIBUTION_KEYS) {
    const value = window.sessionStorage.getItem(`mb_${key}`);
    if (value) result[key] = value;
  }
  return result;
}
