// Ilustrasi flat (bukan foto) — orang di samping mobil sambil pegang HP,
// mengikuti mood visual carmoola.co.uk. Sengaja ilustrasi, bukan foto
// stok: kami belum punya foto tim/kantor sungguhan (§6.5, papan nama
// belum terpasang), dan ilustrasi generik tidak mengklaim "ini staf kami"
// seperti foto akan lakukan. Ganti dengan foto asli begitu tersedia.
export function HeroIllustration() {
  return (
    <svg
      viewBox="0 0 420 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-sm"
      role="img"
      aria-label="Ilustrasi orang memegang ponsel di samping mobil"
    >
      <ellipse cx="210" cy="378" rx="150" ry="18" fill="var(--muted)" />

      {/* Mobil */}
      <g>
        <path
          d="M55 300c0-11 9-20 20-20h20l22-38c5-9 15-15 26-15h96c11 0 21 6 26 15l22 38h20c11 0 20 9 20 20v34c0 8-6 14-14 14H69c-8 0-14-6-14-14v-34z"
          fill="var(--primary)"
        />
        <path
          d="M139 246l-16 34h174l-16-34c-2-4-6-7-11-7h-136c-5 0-9 3-11 7z"
          fill="var(--background)"
          opacity="0.35"
        />
        <circle cx="120" cy="336" r="24" fill="var(--foreground)" opacity="0.85" />
        <circle cx="120" cy="336" r="10" fill="var(--card)" />
        <circle cx="300" cy="336" r="24" fill="var(--foreground)" opacity="0.85" />
        <circle cx="300" cy="336" r="10" fill="var(--card)" />
      </g>

      {/* Orang */}
      <g>
        <rect x="228" y="188" width="64" height="110" rx="26" fill="var(--accent-foreground)" />
        <circle cx="260" cy="158" r="30" fill="#E8B996" />
        <path
          d="M232 150c0-18 13-32 28-32s28 14 28 32c-8-6-18-10-28-10s-20 4-28 10z"
          fill="var(--foreground)"
        />
        <rect x="236" y="296" width="18" height="46" rx="9" fill="var(--foreground)" opacity="0.75" />
        <rect x="268" y="296" width="18" height="46" rx="9" fill="var(--foreground)" opacity="0.75" />

        {/* Lengan pegang HP */}
        <path d="M228 210c-16 6-26 20-26 36v8" stroke="#E8B996" strokeWidth="16" strokeLinecap="round" fill="none" />
        <rect x="186" y="244" width="30" height="52" rx="8" fill="var(--card)" stroke="var(--border)" strokeWidth="2" />
        <rect x="192" y="252" width="18" height="30" rx="2" fill="var(--whatsapp)" />
      </g>

      {/* Aksen dekoratif */}
      <circle cx="80" cy="120" r="8" fill="var(--whatsapp)" opacity="0.6" />
      <circle cx="350" cy="150" r="12" fill="var(--primary)" opacity="0.25" />
      <circle cx="330" cy="90" r="6" fill="var(--whatsapp)" opacity="0.5" />
    </svg>
  );
}
