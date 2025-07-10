interface NotFoundMessageProps {
  title: string;
  className?: string;
}

const NotFoundMessage = ({ title, className }: NotFoundMessageProps) => (
  <p className={`text-2xl font-semibold text-center py-10 ${className}`}>
    {title}
  </p>
);

export default NotFoundMessage;
