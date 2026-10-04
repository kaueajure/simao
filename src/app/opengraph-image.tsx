import { ImageResponse } from 'next/og';
export const alt = 'Procurando algo na sua cidade? Pergunte para quem conhece.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        background: '#eef2ef',
        color: '#172b2a',
        padding: '80px',
        width: '100%',
        height: '100%',
        fontFamily: 'sans-serif',
      }}
    >
      <div
        style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 30, color: '#0b746c' }}
      >
        <svg
          width="38"
          height="38"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#0b746c"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="m15.5 8.5-2.1 4.9-4.9 2.1 2.1-4.9 4.9-2.1Z" />
        </svg>
        Descoberta Local
      </div>
      <div
        style={{ display: 'flex', fontSize: 72, fontWeight: 600, marginTop: 70, lineHeight: 1.1 }}
      >
        Procurando algo na sua cidade?
      </div>
      <div style={{ display: 'flex', fontSize: 60, color: '#0b746c', marginTop: 20 }}>
        Pergunte para quem conhece.
      </div>
      <div style={{ display: 'flex', fontSize: 25, marginTop: 55 }}>
        Pessoas indicam. Você encontra. Quem ajudou ganha pontos.
      </div>
    </div>,
    size,
  );
}
