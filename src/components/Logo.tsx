import Image from "next/image";

export default function Logo({
  variant = "white",
  className,
}: {
  variant?: "white" | "black";
  className?: string;
}) {
  const src =
    variant === "white"
      ? "/images/brand/jalour-logo-white.png"
      : "/images/brand/jalour-logo-black.png";

  return (
    <Image
      src={src}
      alt="Jalour"
      width={3204}
      height={542}
      priority
      className={className}
    />
  );
}
