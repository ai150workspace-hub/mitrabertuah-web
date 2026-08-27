#!/usr/bin/env node
// Pagar teknis versi CI untuk lib/privacy-policy.ts — dijalankan lewat
// `npm run check:privacy`. Memindai FILE SUMBER (bukan mengimpor modul
// TypeScript, supaya skrip ini bisa jalan tanpa transpiler tambahan)
// untuk penanda `[[ISI: ...]]` / `[[TANYA PENGACARA: ...]]` yang belum
// diisi. Kalau ketemu satu saja, build/CI gagal — lihat "Aturan paling
// penting" di PROMPT_PRIVASI_mitrabertuah.md.

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const repoRoot = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

const FILES_TO_SCAN = ["content/kebijakan-privasi.ts", "lib/consent.ts"];

const found = [];

for (const relativePath of FILES_TO_SCAN) {
  const fullPath = path.join(repoRoot, relativePath);
  const text = readFileSync(fullPath, "utf8");
  const matches = text.match(/\[\[[^\]]*\]\]/g) ?? [];
  for (const match of matches) {
    found.push({ file: relativePath, match });
  }
}

if (found.length > 0) {
  console.error(`check:privacy GAGAL — ${found.length} placeholder belum diisi:\n`);
  for (const { file, match } of found) {
    console.error(`  ${file}: ${match}`);
  }
  console.error(
    "\nHalaman /kebijakan-privasi tidak akan tayang ke publik sampai semua ini diisi " +
      "(lib/privacy-policy.ts menerapkan pagar yang sama saat runtime)."
  );
  process.exit(1);
}

console.log("check:privacy OK — tidak ada placeholder [[ ]] tersisa di konten kebijakan privasi.");
