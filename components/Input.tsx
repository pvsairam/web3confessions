import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label?: string;
  error?: string;
  multiline?: boolean;
  rows?: number;
}

export function Input({
  label,
  error,
  multiline = false,
  rows = 4,
  className = '',
  ...props
}: InputProps) {
  const Component = multiline ? 'textarea' : 'input';

  return (
    <div className="w-full space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-300 mb-2">
          {label}
        </label>
      )}
      <Component
        className={`input-glass ${multiline ? 'resize-none' : ''} ${className}`}
        rows={multiline ? rows : undefined}
        {...(props as any)}
      />
      {error && (
        <p className="text-sm text-red-400 mt-1">{error}</p>
      )}
    </div>
  );
}
