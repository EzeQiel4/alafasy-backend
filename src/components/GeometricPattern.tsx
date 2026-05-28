export default function GeometricPattern({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="islamicPattern" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
          <path
            d="M25 0L50 25L25 50L0 25Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            opacity="0.15"
          />
          <path
            d="M25 10L40 25L25 40L10 25Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.3"
            opacity="0.1"
          />
          <circle cx="25" cy="25" r="5" fill="none" stroke="currentColor" strokeWidth="0.3" opacity="0.1" />
        </pattern>
      </defs>
      <rect width="200" height="200" fill="url(#islamicPattern)" />
    </svg>
  );
}
