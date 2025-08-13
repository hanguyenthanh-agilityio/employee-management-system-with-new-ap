'use client';

import { IMAGE } from '@/constants';
import Image from 'next/image';
import { useState } from 'react';

const FallbackImage = ({
  src,
  alt,
  width,
  height,
  className,
  fallback = IMAGE.FALLBACK,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  fallback?: string;
}) => {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      src={imgSrc || fallback}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onError={() => setImgSrc(fallback)}
    />
  );
};

export default FallbackImage;
