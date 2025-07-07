import Image from 'next/image';

interface AvatarProps {
  src?: string | null;
  name: string;
}

const Avatar = ({ src, name }: AvatarProps) => {
  const fallback = name?.[0]?.toUpperCase() || '?';

  return src ? (
    <div className="rounded-full overflow-hidden w-32 h-32 lg:w-52 lg:h-52 border-white shadow-md">
      <Image
        src={src}
        alt={name}
        width={96}
        height={96}
        className="object-cover w-full h-full"
      />
    </div>
  ) : (
    <div className="w-40 h-40 lg:w-52 lg:h-52 flex items-center justify-center rounded-full bg-blue-500 text-white text-2xl font-bold shadow-md">
      {fallback}
    </div>
  );
};

export default Avatar;
