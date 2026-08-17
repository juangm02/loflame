export default function FigmaEmbed({ url, title = "Prototipo interactivo" }: { url: string; title?: string }) {
  const src = `https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(url)}`;

  return (
    <div className="overflow-hidden rounded-3xl border border-ink/10 bg-white shadow-[0_1px_2px_rgba(20,22,31,0.06),0_24px_48px_-20px_rgba(20,22,31,0.3)]">
      <div className="aspect-[16/10] w-full sm:aspect-[16/9]">
        <iframe
          title={title}
          src={src}
          className="h-full w-full"
          allow="fullscreen"
          loading="lazy"
        />
      </div>
    </div>
  );
}
