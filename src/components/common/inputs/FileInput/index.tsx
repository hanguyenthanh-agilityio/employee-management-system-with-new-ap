import React from 'react';
import clsx from 'clsx';

// Styles
import '@/styles/formStyle.css';

// Components
import Input from '../Input/input';

type FileInputProps = React.InputHTMLAttributes<HTMLInputElement>;

const FileInput = ({ className, ...props }: FileInputProps) => {
  return (
    <Input type="file" className={clsx('input-file', className)} {...props} />
  );
};

export default FileInput;
