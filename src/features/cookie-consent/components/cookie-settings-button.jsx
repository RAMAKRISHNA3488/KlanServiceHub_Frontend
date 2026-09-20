import React from 'react';
import { useCookieConsent } from '../context/cookie-consent-context';
import { Cookie, Settings } from 'lucide-react';

export const CookieSettingsButton = ({
  className = '',
  variant = 'button',
  label = 'Cookie Settings',
}) => {
  const { openPreferencesModal } = useCookieConsent();

  if (variant === 'link') {
    return (
      <button
        type="button"
        onClick={openPreferencesModal}
        className={`hover:text-blue-600 dark:hover:text-blue-400 transition cursor-pointer inline-flex items-center gap-1.5 ${className}`}
      >
        <Cookie className="size-3.5" />
        <span>{label}</span>
      </button>
    );
  }

  if (variant === 'floating') {
    return (
      <button
        type="button"
        onClick={openPreferencesModal}
        aria-label="Manage cookie settings"
        title="Manage Cookie Preferences"
        className={`fixed bottom-5 left-5 z-[9990] size-11 rounded-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center cursor-pointer group ${className}`}
      >
        <Cookie className="size-5 text-blue-600 dark:text-blue-400 group-hover:rotate-12 transition-transform" />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={openPreferencesModal}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-xs font-semibold text-neutral-700 dark:text-neutral-300 transition cursor-pointer ${className}`}
    >
      <Settings className="size-3.5" />
      <span>{label}</span>
    </button>
  );
};
