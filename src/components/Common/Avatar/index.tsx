'use client';

import {
  Avatar as UIAvatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';

interface AvatarProps {
  src?: string;
  preview?: string;
  name: string;
}

const Avatar = ({ src, preview, name }: AvatarProps) => {
  const fallback = name?.[0]?.toUpperCase() || '?';

  return (
    <UIAvatar className="w-full h-full border border-muted ring-2 ring-offset-2 ring-offset-background ring-primary/50 transition duration-300 rounded-full overflow-hidden">
      <AvatarImage
        src={preview || src}
        alt={name}
        className="object-cover w-full h-full"
      />
      <AvatarFallback className="bg-primary text-white text-3xl font-bold flex items-center justify-center w-full h-full">
        {fallback}
      </AvatarFallback>
    </UIAvatar>
  );
};

export default Avatar;
