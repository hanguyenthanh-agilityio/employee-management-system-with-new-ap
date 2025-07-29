import { ChangeEvent } from 'react';

interface Option {
  value: string;
  label: string;
}

export interface SelectFieldProps {
  label: string;
  name: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
  options: Option[];
  className?: string;
}

const Select = ({
  label,
  name,
  value,
  onChange,
  options,
  className,
}: SelectFieldProps) => (
  <div className={className}>
    <label
      htmlFor={name}
      className="block text-xl font-medium text-gray-900 w-[200px]"
    >
      {label}
    </label>
    <select
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 max-w-[150px]"
      aria-label="Type"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

export default Select;
