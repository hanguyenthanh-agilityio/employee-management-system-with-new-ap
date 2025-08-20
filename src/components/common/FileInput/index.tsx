import React from 'react';
import clsx from 'clsx';

// Styles
import '@/styles/formStyle.css';

type FileInputProps = React.InputHTMLAttributes<HTMLInputElement>;

const FileInput = ({ className, ...props }: FileInputProps) => {
  return (
    <input type="file" className={clsx('input-file', className)} {...props} />
  );
};

export default FileInput;
