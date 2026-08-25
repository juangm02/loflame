export default function ObjectiveIcon({ index, accent }: { index: number; accent: string }) {
  const icons = [
    <path key="a" d="M4 12l5 5L20 6" />,
    <path key="b" d="M12 3v18M3 12h18" />,
    <path key="c" d="M4 20l6-6M14 4l6 6-8 8-6-6 8-8Z" />,
  ];
  return (
    <span
      className="flex h-10 w-10 items-center justify-center rounded-xl"
      style={{ background: `${accent}18`, color: accent }}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {icons[index % icons.length]}
      </svg>
    </span>
  );
}
