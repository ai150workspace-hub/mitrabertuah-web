"use client";

import { useEffect } from "react";
import { captureAttribution } from "@/lib/attribution";

// Tidak merender apa pun — hanya menangkap atribusi sekali per sesi
// (§14). Dipasang di root layout supaya jalan di semua halaman, bukan
// cuma homepage (pengunjung bisa masuk lewat /artikel/... duluan).
export function AttributionCapture() {
  useEffect(() => {
    captureAttribution();
  }, []);

  return null;
}
