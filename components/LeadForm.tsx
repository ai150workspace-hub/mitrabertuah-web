"use client";

import { useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { leadFormSchema, KEPERLUAN_DANA_OPTIONS, type LeadFormInput } from "@/schemas/lead";
import { submitLead } from "@/app/actions/submit-lead";
import { CONSENT_TEXT } from "@/lib/consent";
import { getStoredAttribution } from "@/lib/attribution";
import { getJourneyHandoff, JOURNEY_HANDOFF_EVENT } from "@/lib/journey-handoff";
import { trackEvent } from "@/lib/analytics";
import Link from "next/link";

type SubmitState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success"; submissionId?: string }
  | { status: "error"; message: string };

export function LeadForm({ defaultKota = "Pekanbaru" }: { defaultKota?: string }) {
  const [state, setState] = useState<SubmitState>({ status: "idle" });
  const idempotencyKey = useRef(
    typeof crypto !== "undefined" ? crypto.randomUUID() : String(Date.now())
  );
  const hasTrackedStart = useRef(false);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LeadFormInput>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      jenisKendaraan: "Mobil",
      domisiliKota: defaultKota,
      website: "",
      // Kalau pengunjung sudah menyelesaikan JourneyKelayakan SEBELUM
      // form ini pertama kali dirender (mis. balik dari WhatsApp lalu
      // scroll lagi ke sini), nilainya sudah ada duluan di sessionStorage
      // saat mount ini terjadi.
      ...getJourneyHandoff(),
    },
  });

  // JourneyKelayakan dan form ini SUDAH sama-sama ter-mount di halaman
  // yang sama sejak awal — kalau pengunjung baru menyelesaikan journey
  // SETELAH form ini mount, defaultValues di atas tidak akan menangkapnya
  // (react-hook-form cuma baca defaultValues sekali). Event ini yang
  // menangkap kasus itu. Tidak menyentuh skema/validasi, cuma nilai field.
  useEffect(() => {
    function applyHandoff() {
      const handoff = getJourneyHandoff();
      if (handoff.jenisKendaraan) setValue("jenisKendaraan", handoff.jenisKendaraan);
      if (handoff.tahunKendaraan) setValue("tahunKendaraan", handoff.tahunKendaraan);
      if (handoff.estimasiNilaiKendaraan)
        setValue("estimasiNilaiKendaraan", handoff.estimasiNilaiKendaraan);
    }
    window.addEventListener(JOURNEY_HANDOFF_EVENT, applyHandoff);
    return () => window.removeEventListener(JOURNEY_HANDOFF_EVENT, applyHandoff);
  }, [setValue]);

  function handleFirstFocus() {
    if (hasTrackedStart.current) return;
    hasTrackedStart.current = true;
    trackEvent("form_start");
  }

  async function onSubmit(data: LeadFormInput) {
    setState({ status: "submitting" });
    // Diambil dari sessionStorage (ditangkap AttributionCapture saat
    // halaman PERTAMA dibuka) — bukan window.location saat ini, supaya
    // tetap benar walau pengunjung sudah pindah halaman sebelum submit.
    const attribution = getStoredAttribution();

    const result = await submitLead({
      ...data,
      idempotencyKey: idempotencyKey.current,
      // reCAPTCHA v3 dipasang lewat komponen terpisah di layout — kalau
      // widgetnya belum siap (mis. site key belum diisi), token kosong
      // dan server action melewati verifikasi selama
      // RECAPTCHA_SECRET_KEY juga belum diset.
      recaptchaToken: "",
      utmSource: attribution.utm_source,
      utmMedium: attribution.utm_medium,
      utmCampaign: attribution.utm_campaign,
      utmContent: attribution.utm_content,
      utmTerm: attribution.utm_term,
      gclid: attribution.gclid,
      fbclid: attribution.fbclid,
      landingPage: attribution.landing_page,
      referrer: attribution.referrer,
    });

    if (result.success) {
      setState({ status: "success", submissionId: result.submissionId });
      trackEvent("form_submit_success", { hasil: result.hasil });
    } else {
      setState({ status: "error", message: result.error ?? "Gagal mengirim data." });
      trackEvent("form_submit_error", { error: result.error });
    }
  }

  if (state.status === "success") {
    return (
      <div className="rounded-2xl border border-primary/30 bg-primary/5 p-6 text-center">
        <p className="font-heading text-lg font-bold">Pengajuan Anda sudah tersimpan</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Lanjutkan lewat WhatsApp supaya kami bisa segera memprosesnya.
        </p>
        <WhatsAppButton
          positionCode="[WEB-FORM]"
          message={`Halo, saya baru saja mengisi form pengajuan di website. Kode: ${state.submissionId ?? "-"}`}
          label="Lanjut ke WhatsApp"
          className="mt-4"
        />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} onFocus={handleFirstFocus} className="space-y-4">
      {/* Honeypot — field tersembunyi, manusia tidak akan mengisinya (§9) */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
        {...register("website")}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="nama">Nama lengkap</Label>
          <Input id="nama" {...register("nama")} />
          {errors.nama && <p className="text-xs text-destructive">{errors.nama.message}</p>}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="noHp">No. HP/WhatsApp</Label>
          <Input id="noHp" placeholder="0812xxxxxxx" {...register("noHp")} />
          {errors.noHp && <p className="text-xs text-destructive">{errors.noHp.message}</p>}
        </div>

        <div className="space-y-1.5">
          <Label>Jenis kendaraan</Label>
          <Controller
            control={control}
            name="jenisKendaraan"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Mobil">Mobil</SelectItem>
                  <SelectItem value="Motor">Motor</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="tahunKendaraan">Tahun kendaraan</Label>
          <Input id="tahunKendaraan" type="number" inputMode="numeric" {...register("tahunKendaraan")} />
          {errors.tahunKendaraan && (
            <p className="text-xs text-destructive">{errors.tahunKendaraan.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="merkTipe">Merk &amp; tipe (opsional)</Label>
          <Input id="merkTipe" placeholder="mis. Toyota Avanza" {...register("merkTipe")} />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="domisiliKota">Domisili / kota</Label>
          <Input id="domisiliKota" {...register("domisiliKota")} />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="kecamatan">Kecamatan (opsional)</Label>
          <Input id="kecamatan" {...register("kecamatan")} />
        </div>

        <div className="space-y-1.5">
          <Label>Keperluan dana (opsional)</Label>
          <Controller
            control={control}
            name="keperluanDana"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Pilih salah satu" />
                </SelectTrigger>
                <SelectContent>
                  {KEPERLUAN_DANA_OPTIONS.map((opt) => (
                    <SelectItem key={opt} value={opt}>
                      {opt}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="catatan">Catatan tambahan (opsional)</Label>
        <Textarea id="catatan" {...register("catatan")} />
      </div>

      <div className="flex items-start gap-2 pt-2">
        <Controller
          control={control}
          name="consentGiven"
          render={({ field }) => (
            <Checkbox
              id="consentGiven"
              checked={field.value ?? false}
              onCheckedChange={field.onChange}
            />
          )}
        />
        <Label htmlFor="consentGiven" className="text-sm font-normal text-muted-foreground">
          {CONSENT_TEXT}{" "}
          <Link
            href="/kebijakan-privasi"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-primary underline"
          >
            Kebijakan Privasi
          </Link>
        </Label>
      </div>
      {errors.consentGiven && (
        <p className="text-xs text-destructive">{errors.consentGiven.message}</p>
      )}

      {state.status === "error" && (
        <p className="text-sm text-destructive">{state.message}</p>
      )}

      <Button type="submit" size="lg" className="w-full rounded-full" disabled={state.status === "submitting"}>
        {state.status === "submitting" ? "Mengirim..." : "Kirim Pengajuan"}
      </Button>

      {state.status === "error" && (
        <div className="pt-2 text-center">
          <p className="text-sm text-muted-foreground">
            Sistem sedang bermasalah? Hubungi kami langsung lewat WhatsApp.
          </p>
          <WhatsAppButton positionCode="[WEB-FORM]" label="Chat WhatsApp" className="mt-3" />
        </div>
      )}
    </form>
  );
}
