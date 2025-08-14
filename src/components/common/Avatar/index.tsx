'use client';

import {
  Avatar as UIAvatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import { useState } from 'react';

interface AvatarProps {
  url?: string;
  preview?: string;
  name: string;
}

const Avatar = ({ url, preview, name }: AvatarProps) => {
  const fallback = name?.[0]?.toUpperCase() || '?';
  const [hasError, setHasError] = useState(false);

  const src = hasError ? undefined : preview || url;

  return (
    <UIAvatar className="w-full h-full border border-muted ring-2 ring-offset-2 ring-offset-background ring-primary/50 transition duration-300 rounded-full overflow-hidden">
      <AvatarImage
        src={src}
        alt={name}
        className="object-cover w-full h-full"
        onError={() => setHasError(true)}
      />
      <AvatarFallback className="bg-primary text-white text-3xl font-bold flex items-center justify-center w-full h-full">
        {fallback}
      </AvatarFallback>
    </UIAvatar>
  );
};

export default Avatar;
