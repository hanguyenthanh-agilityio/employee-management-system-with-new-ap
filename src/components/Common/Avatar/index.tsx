import Image from 'next/image';

interface AvatarProps {
  src?: string | null;
  name: string;
}

const Avatar = ({ src, name }: AvatarProps) => {
  const fallback = name?.[0]?.toUpperCase() || '?';

  return src ? (
    <div className="rounded-full overflow-hidden w-24 h-24 md:w-36 md:h-36 lg:w-52 lg:h-52 border-white shadow-md">
      <Image
        src={src}
        alt={name}
        width={80}
        height={80}
        className="object-cover w-full h-full"
      />
    </div>
  ) : (
    <div className="w-24 h-24 md:w-36 md:h-36 lg:w-52 lg:h-52 flex items-center justify-center rounded-full bg-blue-500 text-white text-xl md:text-2xl font-bold shadow-md">
      {fallback}
    </div>
  );
};

export default Avatar;
