type StarIconProps = {
  filled?: boolean;
  className?: string;
};

export default function StarIcon({ filled = false, className = '' }: StarIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      className={`star-icon${filled ? ' is-filled' : ''}${className ? ` ${className}` : ''}`}
    >
      <path
        fill={filled ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth={filled ? 0 : 1.5}
        d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
      />
    </svg>
  );
}
