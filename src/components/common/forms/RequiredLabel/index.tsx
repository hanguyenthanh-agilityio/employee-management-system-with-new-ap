import { Label } from '@/components';

interface RequiredLabelProps {
  htmlFor: string;
  children: React.ReactNode;
  required?: boolean;
  className?: string;
}

const RequiredLabel = ({
  htmlFor,
  children,
  required = true,
  className = '',
}: RequiredLabelProps) => (
  <Label htmlFor={htmlFor} className={className}>
    {children}
    {required && <span className="text-red">*</span>}
  </Label>
);

export default RequiredLabel;
