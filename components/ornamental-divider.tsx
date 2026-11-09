export default function OrnamentalDivider({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 20"
      className={`mx-auto h-4 w-full max-w-xs text-primary/40 ${className}`}
      fill="none"
    >
      <path
        d="M0 10 C50 10 65 2 110 10 C130 15 145 6 165 10"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <rect x="195" y="5" width="10" height="10" transform="rotate(45 200 10)" fill="currentColor" />
      <path
        d="M235 10 C255 6 270 15 290 10 C335 2 350 10 400 10"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
}
