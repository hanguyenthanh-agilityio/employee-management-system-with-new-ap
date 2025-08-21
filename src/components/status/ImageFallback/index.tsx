'use client';

import { IMAGE } from '@/constants';
import Image from 'next/image';
import { useState } from 'react';

interface FallbackImageProps {
  src?: string;
  alt: string;
  size?: number;
  className?: string;
  fallback?: string;
}

const FallbackImage = ({
  src,
  alt,
  size = 40,
  className = '',
  fallback = IMAGE.FALLBACK,
}: FallbackImageProps) => {
  const [imgSrc, setImgSrc] = useState(src || fallback);

  return (
    <div
      style={{ width: size, height: size }}
      className={`relative rounded-md overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 ${className}`}
    >
      <Image
        src={imgSrc}
        alt={alt}
        width={size}
        height={size}
        className="object-cover w-full h-full"
        onError={() => setImgSrc(fallback)}
      />
    </div>
  );
};

export default FallbackImage;
