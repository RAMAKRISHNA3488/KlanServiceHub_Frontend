import React from 'react';

export const CookieToggle = ({
  id,
  checked,
  onChange,
  disabled = false,
  label = '',
  ariaDescribedBy,
}) => {
  return (
    <div className="flex items-center gap-3">
      <label
        htmlFor={id}
        className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-200 ease-in-out focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 ${
          disabled
            ? 'cursor-not-allowed bg-blue-600/40 opacity-70'
            : checked
            ? 'cursor-pointer bg-blue-600'
            : 'cursor-pointer bg-neutral-300 dark:bg-neutral-700'
        }`}
      >
        <span className="sr-only">{label || 'Toggle cookie category'}</span>
        <input
          id={id}
          type="checkbox"
          role="switch"
          aria-checked={checked}
          aria-describedby={ariaDescribedBy}
          checked={checked}
          disabled={disabled}
          onChange={(e) => !disabled && onChange(e.target.checked)}
          className="sr-only"
        />
        <span
          aria-hidden="true"
          className={`pointer-events-none inline-block size-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
            checked ? 'translate-x-5' : 'translate-x-0.5'
          }`}
        />
      </label>
    </div>
  );
};
