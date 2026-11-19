export function CodeverseLogo({ size = 30 }: { size?: number }) {
  return (
    <span className="inline-flex items-center gap-2.5 whitespace-nowrap shrink-0 select-none">
      <svg
        width={size}
        height={size}
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0"
      >
        <rect
          x="1.5"
          y="1.5"
          width="33"
          height="33"
          rx="8"
          fill="#0B132B"
          stroke="#2563EB"
          strokeWidth="1.5"
        />
        <path
          d="M13.5 12L8.5 18L13.5 24"
          stroke="#38BDF8"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M22.5 12L27.5 18L22.5 24"
          stroke="#2563EB"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M19.5 10.5L16.5 25.5"
          stroke="#F8FAFC"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      </svg>
      <span className="font-display text-lg font-extrabold tracking-tight text-white">
        CODE<span className="text-[#3B82F6]">VERSE</span>
      </span>
    </span>
  );
}
