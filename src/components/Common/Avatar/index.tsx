import {
  Avatar as UIAvatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';

interface AvatarProps {
  src?: string | undefined;
  name: string;
}

const Avatar = ({ src, name }: AvatarProps) => {
  const fallback = name?.[0]?.toUpperCase() || '?';

  return (
    <UIAvatar className="w-32 h-32 lg:w-52 lg:h-52">
      {src && <AvatarImage src={src} alt={name} width={96} height={96} />}
      <AvatarFallback className="bg-blue-500 text-white text-3xl font-bold">
        {fallback}
      </AvatarFallback>
    </UIAvatar>
  );
};

export default Avatar;
