import { useId } from 'react';

// Original, generic beverage packaging illustrations (no real brand artwork).
// A real product photo can replace any of these via the `photo` field in App.tsx.

export type Kind = 'pet' | 'can' | 'glass' | 'tetra' | 'water';

interface PackProps {
  kind: Kind;
  color: string;
  accent: string;
  label: string;
  size?: string;
  brand?: string;
  className?: string;
}

/** Lighten (t > 0) or darken (t < 0) a #rrggbb colour. */
const mix = (hex: string, t: number) => {
  const n = parseInt(hex.slice(1), 16);
  const f = (c: number) => Math.round(t < 0 ? c * (1 + t) : c + (255 - c) * t);
  return `rgb(${f(n >> 16)},${f((n >> 8) & 255)},${f(n & 255)})`;
};

export function Pack({ kind, color, accent, label, size, brand, className }: PackProps) {
  const id = useId().replace(/:/g, '');
  const text = label.toUpperCase().slice(0, 12);
  const body = `url(#b${id})`;
  const lab = `url(#l${id})`;
  const gloss = `url(#g${id})`;

  const Label = ({ y, h }: { y: number; h: number }) => (
    <g>
      <rect x="22" y={y} width="56" height={h} fill={lab} />
      <path
        d={`M22 ${y + h * 0.7} C 40 ${y + h * 0.45}, 58 ${y + h * 0.95}, 78 ${y + h * 0.65} V ${y + h} H22 Z`}
        fill="#fff"
        opacity="0.2"
      />
      <circle cx="68" cy={y + h * 0.78} r="2.2" fill="#fff" opacity="0.5" />
      <circle cx="60" cy={y + h * 0.9} r="1.4" fill="#fff" opacity="0.5" />
      {brand && (
        <text x="50" y={y + h * 0.26} textAnchor="middle" fontSize="9" fontWeight="800" fill="#fff" style={{ letterSpacing: '0.04em' }}>
          {brand}
        </text>
      )}
      <text x="50" y={y + h * (brand ? 0.5 : 0.42)} textAnchor="middle" fontSize={brand ? (text.length > 9 ? 6.5 : 8.5) : 11} fontWeight="800" fill="#fff" style={{ letterSpacing: '0.05em' }}>
        {text}
      </text>
      {size && (
        <text x="50" y={y + h * 0.66} textAnchor="middle" fontSize="8" fontWeight="700" fill="#fff" opacity="0.9">
          {size}
        </text>
      )}
    </g>
  );

  const Drops = () => (
    <g fill="#fff">
      <circle cx="30" cy="92" r="1.7" opacity="0.7" />
      <circle cx="35" cy="172" r="2.1" opacity="0.6" />
      <circle cx="69" cy="86" r="1.4" opacity="0.6" />
      <circle cx="71" cy="186" r="1.9" opacity="0.6" />
      <circle cx="57" cy="201" r="1.3" opacity="0.6" />
      <circle cx="44" cy="70" r="1.2" opacity="0.6" />
    </g>
  );

  return (
    <svg viewBox="0 0 100 220" className={className} role="img" aria-label={label}>
      <defs>
        <linearGradient id={`b${id}`} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor={mix(color, -0.45)} />
          <stop offset="0.28" stopColor={mix(color, 0.18)} />
          <stop offset="0.55" stopColor={color} />
          <stop offset="1" stopColor={mix(color, -0.5)} />
        </linearGradient>
        <linearGradient id={`l${id}`} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor={mix(accent, -0.3)} />
          <stop offset="0.3" stopColor={mix(accent, 0.15)} />
          <stop offset="1" stopColor={mix(accent, -0.4)} />
        </linearGradient>
        <linearGradient id={`g${id}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.55" />
          <stop offset="1" stopColor="#fff" stopOpacity="0.04" />
        </linearGradient>
      </defs>

      <ellipse cx="50" cy="214" rx="32" ry="4.5" fill="#000" opacity="0.28" />

      {(kind === 'pet' || kind === 'water') && (
        <g>
          <rect x="39" y="3" width="22" height="14" rx="3" fill={kind === 'water' ? '#fff' : mix(accent, -0.1)} />
          <g stroke="#000" strokeOpacity="0.18" strokeWidth="0.8">
            <path d="M43 5 V15 M47 5 V15 M51 5 V15 M55 5 V15 M59 5 V15" />
          </g>
          <rect x="40" y="17" width="20" height="3" rx="1.5" fill="#fff" opacity="0.5" />
          <path
            d="M42 20 H58 V37 C58 50 78 56 78 78 V196 Q78 212 62 212 H38 Q22 212 22 196 V78 C22 56 42 50 42 37 Z"
            fill={body}
            opacity={kind === 'water' ? 0.78 : 1}
          />
          <Label y={kind === 'water' ? 102 : 104} h={kind === 'water' ? 52 : 60} />
          <path d="M27 80 C27 68 31 62 36 58 L36 198 Q27 198 27 188 Z" fill={gloss} />
          <path d="M70 90 C72 96 72 120 71 150" stroke="#fff" strokeOpacity="0.25" strokeWidth="2" fill="none" strokeLinecap="round" />
          <Drops />
        </g>
      )}

      {kind === 'can' && (
        <g>
          <path d="M24 44 Q50 36 76 44 V50 H24 Z" fill="#cfd6dc" />
          <rect x="21" y="48" width="58" height="146" rx="6" fill={body} />
          <path d="M24 192 H76 V198 Q50 204 24 198 Z" fill="#aeb8c0" />
          <Label y={80} h={78} />
          <rect x="26" y="52" width="6" height="138" rx="3" fill={gloss} />
          <ellipse cx="50" cy="41" rx="10" ry="2.2" fill="#9aa5ad" />
          <Drops />
        </g>
      )}

      {kind === 'glass' && (
        <g>
          <rect x="41" y="6" width="18" height="10" rx="2.5" fill={mix(accent, -0.1)} />
          <rect x="41" y="16" width="18" height="2.5" fill="#fff" opacity="0.5" />
          <path
            d="M44 18 H56 V52 C56 62 71 66 71 86 V196 Q71 210 60 210 H40 Q29 210 29 196 V86 C29 66 44 62 44 52 Z"
            fill={body}
          />
          <rect x="29" y="110" width="42" height="56" fill={lab} />
          <text x="50" y="136" textAnchor="middle" fontSize="8.5" fontWeight="800" fill="#fff">
            {text}
          </text>
          {size && (
            <text x="50" y="152" textAnchor="middle" fontSize="7" fontWeight="700" fill="#fff" opacity="0.9">
              {size}
            </text>
          )}
          <path d="M33 90 L38 90 L38 200 Q33 200 33 192 Z" fill={gloss} />
          <Drops />
        </g>
      )}

      {kind === 'tetra' && (
        <g>
          <path d="M21 54 L29 36 H71 L79 54 Z" fill={mix(accent, -0.15)} />
          <rect x="21" y="54" width="58" height="142" rx="3" fill={body} />
          <Label y={92} h={70} />
          <rect x="26" y="60" width="5" height="130" rx="2.5" fill={gloss} />
          <rect x="63" y="22" width="3" height="16" rx="1.5" fill="#fff" opacity="0.8" />
          <Drops />
        </g>
      )}
    </svg>
  );
}

export function IceCube({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" className={className} aria-hidden="true">
      <rect x="6" y="6" width="48" height="48" rx="10" fill="#cdeffc" opacity="0.35" stroke="#fff" strokeOpacity="0.8" strokeWidth="2" />
      <path d="M14 18 L26 14" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity="0.9" />
    </svg>
  );
}
