"use client";

import { useEffect, useRef, useState } from "react";
import { Car, Bike, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { estimasiPlafon, type HasilEstimasi } from "@/lib/estimasi-plafon";
import { setJourneyHandoff } from "@/lib/journey-handoff";
import { trackEvent } from "@/lib/analytics";

const formatRupiah = (n: number) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(n);

const TAHUN_SEKARANG = new Date().getFullYear();

type Step = 1 | 2 | 3 | "result";

// Client Component — journey kualifikasi bertahap (redesign brief).
// TIDAK menyimpan apa pun ke database — cuma memanggil estimasiPlafon()
// (lib/estimasi-plafon.ts, tidak diubah) lalu meneruskan pilihan ke
// LeadForm lewat lib/journey-handoff.ts. Layar hasil dipimpin teks
// kelayakan, angka rupiah (kalau ada) di bawahnya — bukan sebaliknya —
// supaya tidak terbaca sebagai keputusan/janji.
export function JourneyKelayakan() {
  const [step, setStep] = useState<Step>(1);
  const [jenisKendaraan, setJenisKendaraan] = useState<"Mobil" | "Motor" | null>(null);
  const [tahunKendaraan, setTahunKendaraan] = useState("");
  const [nilaiKendaraan, setNilaiKendaraan] = useState("");
  const [hasil, setHasil] = useState<HasilEstimasi | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const trackedStep1 = useRef(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || trackedStep1.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          trackEvent("journey_step_1");
          trackedStep1.current = true;
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  function pilihJenis(jenis: "Mobil" | "Motor") {
    setJenisKendaraan(jenis);
    setStep(2);
    trackEvent("journey_step_2");
  }

  function lanjutKeNilai() {
    if (!tahunKendaraan) return;
    setStep(3);
    trackEvent("journey_step_3");
  }

  function lihatHasil() {
    if (!jenisKendaraan || !tahunKendaraan) return;
    const tahun = parseInt(tahunKendaraan, 10);
    const nilai = nilaiKendaraan ? parseInt(nilaiKendaraan, 10) : undefined;

    const hasilBaru = estimasiPlafon({
      jenisKendaraan,
      tahunKendaraan: tahun,
      estimasiNilaiKendaraan: nilai ?? 0,
    });
    setHasil(hasilBaru);
    setStep("result");
    trackEvent("journey_result", { layak: hasilBaru.layak });
  }

  function lanjutkanPengajuan() {
    if (!jenisKendaraan) return;
    setJourneyHandoff({
      jenisKendaraan,
      tahunKendaraan: tahunKendaraan ? parseInt(tahunKendaraan, 10) : undefined,
      estimasiNilaiKendaraan: nilaiKendaraan ? parseInt(nilaiKendaraan, 10) : undefined,
    });
    document.getElementById("pengajuan")?.scrollIntoView({ behavior: "smooth" });
  }

  const progress = step === "result" ? 4 : step;

  return (
    <section id="kelayakan" ref={sectionRef} className="mx-auto max-w-2xl px-4 py-16">
      <div className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-10">
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-colors motion-reduce:transition-none ${
                i <= progress ? "bg-primary" : "bg-muted"
              }`}
            />
          ))}
        </div>

        <div className="mt-8 min-h-[220px]">
          {step === 1 && (
            <div className="animate-in fade-in slide-in-from-bottom-2 motion-reduce:animate-none">
              <h2 className="font-heading text-2xl font-bold">Kendaraan apa yang mau diajukan?</h2>
              <div className="mt-6 grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => pilihJenis("Mobil")}
                  className="flex flex-col items-center gap-3 rounded-2xl border border-border p-6 transition-colors hover:border-primary hover:bg-primary/5"
                >
                  <Car className="size-8 text-primary" />
                  <span className="font-medium">Mobil</span>
                </button>
                <button
                  type="button"
                  onClick={() => pilihJenis("Motor")}
                  className="flex flex-col items-center gap-3 rounded-2xl border border-border p-6 transition-colors hover:border-primary hover:bg-primary/5"
                >
                  <Bike className="size-8 text-primary" />
                  <span className="font-medium">Motor</span>
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="animate-in fade-in slide-in-from-bottom-2 motion-reduce:animate-none">
              <h2 className="font-heading text-2xl font-bold">Tahun berapa kendaraannya?</h2>
              <div className="mt-6 space-y-1.5">
                <Label>Tahun kendaraan</Label>
                <Input
                  type="number"
                  inputMode="numeric"
                  placeholder="mis. 2018"
                  min={1990}
                  max={TAHUN_SEKARANG}
                  value={tahunKendaraan}
                  onChange={(e) => setTahunKendaraan(e.target.value)}
                  autoFocus
                />
              </div>
              <Button className="mt-6 w-full rounded-full sm:w-auto" size="lg" onClick={lanjutKeNilai}>
                Lanjut <ArrowRight className="size-4" />
              </Button>
            </div>
          )}

          {step === 3 && (
            <div className="animate-in fade-in slide-in-from-bottom-2 motion-reduce:animate-none">
              <h2 className="font-heading text-2xl font-bold">Perkiraan nilai kendaraan?</h2>
              <p className="mt-1 text-sm text-muted-foreground">Opsional — boleh dilewati.</p>
              <div className="mt-6 space-y-1.5">
                <Label>Estimasi nilai kendaraan</Label>
                <Input
                  type="number"
                  inputMode="numeric"
                  placeholder="mis. 120000000"
                  value={nilaiKendaraan}
                  onChange={(e) => setNilaiKendaraan(e.target.value)}
                  autoFocus
                />
              </div>
              <div className="mt-6 flex gap-3">
                <Button className="rounded-full" size="lg" onClick={lihatHasil}>
                  Lihat Hasil
                </Button>
                <Button variant="ghost" size="lg" onClick={lihatHasil}>
                  Lewati
                </Button>
              </div>
            </div>
          )}

          {step === "result" && hasil && (
            <div className="animate-in fade-in slide-in-from-bottom-2 motion-reduce:animate-none">
              {hasil.layak ? (
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 size-6 shrink-0 text-whatsapp" />
                  <h2 className="font-heading text-xl font-bold">
                    Kendaraan Anda memenuhi syarat usia untuk diajukan
                  </h2>
                </div>
              ) : (
                <h2 className="font-heading text-xl font-bold">{hasil.alasanTidakLayak}</h2>
              )}

              {hasil.plafonAtas !== undefined && (
                <div className="mt-5 rounded-2xl border border-primary/30 bg-primary/5 p-5">
                  <p className="text-sm text-muted-foreground">
                    Kisaran yang biasanya berlaku untuk kendaraan seperti ini
                  </p>
                  <p className="font-heading text-2xl font-bold text-primary">
                    Hingga {formatRupiah(hasil.plafonAtas)}
                  </p>
                </div>
              )}

              {hasil.layak && hasil.catatan && hasil.plafonAtas === undefined && (
                <p className="mt-4 text-sm text-muted-foreground">{hasil.catatan}</p>
              )}

              <p className="mt-4 text-xs text-muted-foreground">
                Angka ini estimasi awal, bukan penawaran. Nilai kendaraan ditaksir oleh
                perusahaan pembiayaan dan biasanya berbeda dari harga pasaran. Keputusan
                akhir ada pada mereka.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                {hasil.layak && (
                  <Button className="rounded-full" size="lg" onClick={lanjutkanPengajuan}>
                    Lanjutkan Pengajuan
                  </Button>
                )}
                <WhatsAppButton
                  positionCode="[WEB-KALKULATOR]"
                  label="Tanya Lewat WhatsApp"
                  variant="outline"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
