import { Label } from '@/components';

interface RequiredLabelProps {
  htmlFor: string;
  label: string;
  required?: boolean;
  className?: string;
}

const RequiredLabel = ({
  htmlFor,
  label,
  required = true,
  className,
}: RequiredLabelProps) => (
  <Label htmlFor={htmlFor} className={className}>
    {label}
    {required && <span className="text-red">{' *'}</span>}
  </Label>
);

export default RequiredLabel;
