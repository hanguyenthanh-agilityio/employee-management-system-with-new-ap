interface InfoBlockProps {
  label: string;
  value: string;
  className?: string;
}

const InfoBlock = ({ label, value, className }: InfoBlockProps) => (
  <div className={`flex flex-col gap-4 ${className}`}>
    <p className="text-xl text-gray-500">{label}</p>
    <p className="text-3xl font-bold">{value}</p>
  </div>
);

export default InfoBlock;
