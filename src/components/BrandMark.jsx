import { useId } from 'react'

function BrandMark({ className = '' }) {
  const gradientId = `brand-mark-${useId().replaceAll(':', '')}`

  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 48 48"
    >
      <defs>
        <linearGradient id={gradientId} x1="5" x2="43" y1="4" y2="44" gradientUnits="userSpaceOnUse">
          <stop stopColor="#B9D2FF" />
          <stop offset="1" stopColor="#3972EF" />
        </linearGradient>
      </defs>
      <rect
        fill="#0A1428"
        height="46"
        rx="14"
        width="46"
        x="1"
        y="1"
      />
      <rect
        height="44"
        rx="13"
        stroke={`url(#${gradientId})`}
        strokeOpacity=".8"
        strokeWidth="1.5"
        width="44"
        x="2"
        y="2"
      />
      <path
        d="M10 26.5h2.2l2.4-6.2c.4-1 1.3-1.6 2.4-1.6h14c1.1 0 2 .6 2.5 1.6l2.3 6.2H38v5.2h-2.5a3.3 3.3 0 0 1-6.4 0H19a3.3 3.3 0 0 1-6.4 0H10v-5.2Z"
        fill={`url(#${gradientId})`}
      />
      <path
        d="m17.1 21-1.5 4h16.8l-1.5-4H17.1Z"
        fill="#0A1428"
      />
      <circle cx="15.8" cy="30.2" r="1.4" fill="#0A1428" />
      <circle cx="32.2" cy="30.2" r="1.4" fill="#0A1428" />
      <path d="M14 36h20" stroke="#B9D2FF" strokeLinecap="round" strokeOpacity=".55" />
    </svg>
  )
}

export default BrandMark
