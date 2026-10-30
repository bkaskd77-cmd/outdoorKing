import { cn } from "@ok/ui";

import type { PictureSrc } from "@/content/media";

export function Picture({
  image,
  className,
  imgClassName,
  priority = false,
  sizes,
}: {
  image: PictureSrc;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  sizes?: string;
}) {
  if (image.url) {
    return (
      <picture className={className}>
        <img
          src={image.url}
          srcSet={image.srcSet}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes={sizes ?? "100vw"}
          style={image.focus ? { objectPosition: image.focus } : undefined}
          className={cn("h-full w-full object-cover", imgClassName)}
          fetchPriority={priority ? "high" : "auto"}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
        />
      </picture>
    );
  }
  return (
    <picture className={className}>
      <source type="image/avif" srcSet={`${image.src}.avif`} />
      <source type="image/webp" srcSet={`${image.src}.webp`} />
      <img
        src={`${image.src}.webp`}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes={sizes}
        className={cn("h-full w-full object-cover", imgClassName)}
        fetchPriority={priority ? "high" : "auto"}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "async" : "async"}
      />
    </picture>
  );
}
