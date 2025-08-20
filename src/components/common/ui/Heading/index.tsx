interface HeaderProps {
  title: string;
  className?: string;
}

const Heading = ({ title, className }: HeaderProps) => (
  <h1 className={`text-3xl font-bold text-primary ${className}`}>{title}</h1>
);

export default Heading;
