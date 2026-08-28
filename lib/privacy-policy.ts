import { INTRO_TEXT, PRIVACY_SECTIONS, type PolicyBlock } from "@/content/kebijakan-privasi";
import { POLICY_VERSION, POLICY_EFFECTIVE_DATE } from "@/lib/consent";

const PLACEHOLDER_PATTERN = "[[";

function blockStrings(block: PolicyBlock): string[] {
  switch (block.type) {
    case "p":
      return [block.text];
    case "list":
    case "lines":
      return block.items;
    case "table":
      return [...block.headers, ...block.rows.flat()];
  }
}

// Semua string yang benar-benar dirender di /kebijakan-privasi kalau
// halaman ini tayang. Dipakai untuk pagar teknis di bawah — kalau ada
// yang lupa memindahkan sebuah field ke sini, defaultnya AMAN (gagal
// tertutup): field yang tidak ikut dipindai tidak akan pernah membuat
// gate ini lolos, tapi field yang lupa DIPINDAI bisa lolos tanpa
// terdeteksi. Karena itu setiap field baru di PolicySection/PolicyBlock
// wajib ditambahkan ke blockStrings() di atas.
function allDisplayedPolicyStrings(): string[] {
  const strings: string[] = [INTRO_TEXT, POLICY_VERSION, POLICY_EFFECTIVE_DATE];
  for (const section of PRIVACY_SECTIONS) {
    strings.push(section.title);
    for (const block of section.blocks) strings.push(...blockStrings(block));
  }
  return strings;
}

/**
 * false selama ada satu pun `[[` (baik `[[ISI: ...]]` maupun
 * `[[TANYA PENGACARA: ...]]`) di konten kebijakan privasi atau di
 * nomor versi/tanggal berlakunya. Ini pagar teknis, bukan catatan —
 * lihat "Aturan paling penting" di PROMPT_PRIVASI_mitrabertuah.md.
 */
export function isPolicyReadyToPublish(): boolean {
  return !allDisplayedPolicyStrings().some((s) => s.includes(PLACEHOLDER_PATTERN));
}

/** Daftar placeholder yang masih tersisa — untuk log internal, bukan untuk ditampilkan ke pengunjung. */
export function findUnresolvedPlaceholders(): string[] {
  return allDisplayedPolicyStrings().filter((s) => s.includes(PLACEHOLDER_PATTERN));
}
