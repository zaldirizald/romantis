import Image from "next/image";

/**
 * Game photo frame — rounded-3xl, soft shadow, fixed aspect ratio
 * (no layout shift), lazy loaded.
 */
export default function GamePhoto({
  src,
  alt,
  priority = false,
  className = "",
}: {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-3xl border-4 border-white shadow-[0_20px_50px_-18px_rgba(43,38,38,0.35)] ${className}`}
      style={{ aspectRatio: "4 / 3" }}
    >
      <Image src={src} alt={alt} fill sizes="(max-width: 640px) 90vw, 480px" priority={priority} className="object-cover" />
    </div>
  );
}
