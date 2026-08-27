"use client";

import { MessageCircle } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";
import { toWhatsAppFormat } from "@/lib/phone";
import { trackEvent } from "@/lib/analytics";

interface WhatsAppButtonProps {
  /** Kode posisi di pesan terisi otomatis, mis. "[WEB-HERO]" — §8.1. */
  positionCode: string;
  message?: string;
  label?: string;
  className?: string;
  size?: "default" | "lg" | "sm";
  variant?: "default" | "outline";
}

const DEFAULT_MESSAGE = "Halo, saya ingin bertanya soal gadai BPKB mobil/motor di Pekanbaru.";

export function WhatsAppButton({
  positionCode,
  message = DEFAULT_MESSAGE,
  label = "Chat WhatsApp",
  className,
  size = "lg",
  variant = "default",
}: WhatsAppButtonProps) {
  const hasNumber = siteConfig.whatsappNumber.length > 0;
  const text = `${message} ${positionCode}`;
  const href = hasNumber
    ? `https://wa.me/${toWhatsAppFormat(siteConfig.whatsappNumber)}?text=${encodeURIComponent(text)}`
    : undefined;

  // Hijau WhatsApp resmi, bukan --primary situs — warna yang sudah
  // dikenali orang adalah sinyal kepercayaan tersendiri untuk CTA
  // sepenting ini. Pill penuh (rounded-full) untuk kehangatan bentuk ala
  // Carmoola; variant "outline" (dipakai di konteks sekunder seperti FAQ)
  // tetap pill tapi hanya garis + teks hijau, tidak solid.
  const waColorClass =
    variant === "outline"
      ? "border-whatsapp text-whatsapp hover:bg-whatsapp/10 bg-transparent"
      : "bg-whatsapp text-whatsapp-foreground hover:bg-whatsapp/90";

  if (!hasNumber) {
    return (
      <Button
        type="button"
        disabled
        size={size}
        className={cn("gap-2 rounded-full", className)}
        title="Nomor WhatsApp belum dikonfirmasi pemilik"
      >
        <MessageCircle className="size-4" />
        {label}
      </Button>
    );
  }

  // Base UI Button tidak boleh membungkus <a> (dokumentasi Base UI:
  // link punya semantik sendiri, jangan direndernya lewat prop `render`
  // milik Button). Jadi <a> ini distyle langsung pakai buttonVariants,
  // bukan dibungkus komponen Button.
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent("whatsapp_click", { position: positionCode })}
      className={cn(buttonVariants({ size }), "gap-2 rounded-full border", waColorClass, className)}
    >
      <MessageCircle className="size-4" />
      {label}
    </a>
  );
}
