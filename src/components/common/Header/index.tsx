interface HeaderProps {
  title: string;
  className?: string;
}

const Header = ({ title, className }: HeaderProps) => (
  <h1 className={`text-3xl font-bold text-primary ${className}`}>{title}</h1>
);

export default Header;
