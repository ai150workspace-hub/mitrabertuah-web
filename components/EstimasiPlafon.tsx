"use client";

import { useEffect, useRef, useState } from "react";
import { Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { estimasiPlafon, type HasilEstimasi } from "@/lib/estimasi-plafon";
import { trackEvent } from "@/lib/analytics";

const formatRupiah = (n: number) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(n);

const TAHUN_SEKARANG = new Date().getFullYear();

// Client Component — kalkulator alat kualifikasi (§3.2, §7), bukan
// senjata pembeda. Hitungannya murni LTV, tidak ada bunga/komisi, jadi
// aman dijalankan di browser.
export function EstimasiPlafon() {
  const [jenisKendaraan, setJenisKendaraan] = useState<"Mobil" | "Motor">("Mobil");
  const [tahunKendaraan, setTahunKendaraan] = useState("");
  const [nilaiKendaraan, setNilaiKendaraan] = useState("");
  const [hasil, setHasil] = useState<HasilEstimasi | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // view_calculator (§14) — sekali per mount, saat kalkulator masuk viewport.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          trackEvent("view_calculator");
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  function handleHitung() {
    const tahun = parseInt(tahunKendaraan, 10);
    const nilai = parseInt(nilaiKendaraan, 10);
    if (!tahun || !nilai) return;

    const hasilBaru = estimasiPlafon({
      jenisKendaraan,
      tahunKendaraan: tahun,
      estimasiNilaiKendaraan: nilai,
    });
    setHasil(hasilBaru);
    trackEvent("calculate_estimate", { jenisKendaraan, tahunKendaraan: tahun });
  }

  return (
    <section id="kalkulator" ref={sectionRef} className="mx-auto max-w-3xl px-4 py-16">
      <div className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-10">
        <div className="flex items-center gap-2">
          <Calculator className="size-6 text-primary" />
          <h2 className="font-heading text-2xl font-bold">Estimasi Plafon</h2>
        </div>
        <p className="mt-2 text-muted-foreground">
          Perkiraan kasar, bukan penawaran resmi. Angka final ditentukan perusahaan
          pembiayaan setelah survei kendaraan.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="space-y-1.5">
            <Label>Jenis Kendaraan</Label>
            <Select value={jenisKendaraan} onValueChange={(v) => setJenisKendaraan(v as "Mobil" | "Motor")}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Mobil">Mobil</SelectItem>
                <SelectItem value="Motor">Motor</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label>Tahun Kendaraan</Label>
            <Input
              type="number"
              inputMode="numeric"
              placeholder="mis. 2018"
              min={1990}
              max={TAHUN_SEKARANG}
              value={tahunKendaraan}
              onChange={(e) => setTahunKendaraan(e.target.value)}
            />
          </div>

          <div className="space-y-1.5">
            <Label>Estimasi Nilai Kendaraan</Label>
            <Input
              type="number"
              inputMode="numeric"
              placeholder="mis. 120000000"
              value={nilaiKendaraan}
              onChange={(e) => setNilaiKendaraan(e.target.value)}
            />
          </div>
        </div>

        <Button className="mt-6 w-full rounded-full sm:w-auto" size="lg" onClick={handleHitung}>
          Hitung Estimasi
        </Button>

        {hasil && (
          <div className="mt-6 rounded-2xl border border-primary/30 bg-primary/5 p-5">
            {hasil.plafonAtas !== undefined ? (
              <>
                <p className="text-sm text-muted-foreground">Estimasi plafon</p>
                <p className="font-heading text-2xl font-bold text-primary">
                  Hingga {formatRupiah(hasil.plafonAtas)}
                </p>
              </>
            ) : hasil.layak ? (
              <p className="text-sm">
                {hasil.catatan ||
                  "Kendaraan Anda bisa diajukan. Kami perlu informasi lebih lanjut untuk memberi estimasi."}
              </p>
            ) : (
              <p className="text-sm">{hasil.alasanTidakLayak}</p>
            )}

            {hasil.plafonAtas !== undefined && (
              <p className="mt-3 text-xs text-muted-foreground">
                Estimasi awal. Besaran pencairan final ditentukan perusahaan pembiayaan
                setelah survei kendaraan.
              </p>
            )}

            <WhatsAppButton
              positionCode="[WEB-KALKULATOR]"
              label="Konsultasi Lewat WhatsApp"
              variant="outline"
              className="mt-4"
            />
          </div>
        )}
      </div>
    </section>
  );
}
