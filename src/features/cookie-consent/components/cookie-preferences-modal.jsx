import React, { useState, useEffect } from 'react';
import { useCookieConsent } from '../context/cookie-consent-context';
import { COOKIE_DEFINITIONS, COOKIE_CATEGORIES } from '../config/cookie-config';
import { CookieCategoryItem } from './cookie-category-item';
import { Sliders, X, ShieldCheck, Check, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CookiePreferencesModal = () => {
  const {
    isPreferencesModalOpen,
    closePreferencesModal,
    consent,
    saveCustomPreferences,
    acceptAll,
    allowNecessaryOnly,
  } = useCookieConsent();

  const [draftState, setDraftState] = useState({
    necessary: true,
    analytics: false,
    functional: false,
    marketing: false,
  });

  // Sync draft state with active consent when modal opens
  useEffect(() => {
    if (isPreferencesModalOpen && consent) {
      setDraftState({
        necessary: true,
        analytics: Boolean(consent.analytics),
        functional: Boolean(consent.functional),
        marketing: Boolean(consent.marketing),
      });
    }
  }, [isPreferencesModalOpen, consent]);

  // Handle ESC key and scroll locking
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isPreferencesModalOpen) {
        closePreferencesModal();
      }
    };

    if (isPreferencesModalOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isPreferencesModalOpen, closePreferencesModal]);

  if (!isPreferencesModalOpen) return null;

  const handleToggle = (categoryId, value) => {
    if (categoryId === COOKIE_CATEGORIES.NECESSARY) return;
    setDraftState((prev) => ({
      ...prev,
      [categoryId]: value,
    }));
  };

  const handleSave = () => {
    saveCustomPreferences(draftState);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-modal-title"
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
    >
      {/* Frosted Backdrop */}
      <div
        className="fixed inset-0 bg-neutral-950/80 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
        onClick={closePreferencesModal}
      />

      {/* Modal Dialog Box */}
      <div
        className="relative z-10 w-full max-w-3xl max-h-[90vh] flex flex-col bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 text-left my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between bg-neutral-50/50 dark:bg-neutral-900/40 shrink-0">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-2xl bg-blue-50 dark:bg-blue-600/20 border border-blue-200 dark:border-blue-500/30 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0 shadow-2xs">
              <Sliders className="size-5" />
            </div>
            <div>
              <h2
                id="cookie-modal-title"
                className="text-base sm:text-lg font-black tracking-tight text-neutral-900 dark:text-white"
              >
                Cookie Consent Preference Center
              </h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Customize your privacy options, data telemetry, and tracking permissions
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={closePreferencesModal}
            className="size-9 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition flex items-center justify-center cursor-pointer"
            title="Close modal"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
          <div className="p-4 rounded-2xl bg-blue-50/70 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/40 text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed">
            <p>
              We use cookies and edge telemetry to personalize content, remember workspace layout choices, secure logins with CSRF guards, and analyze platform performance. You can review each cookie category below and choose which optional cookies to allow.
            </p>
          </div>

          {/* Cookie Categories List */}
          <div className="space-y-3">
            {COOKIE_DEFINITIONS.map((cat) => (
              <CookieCategoryItem
                key={cat.id}
                category={cat}
                isEnabled={draftState[cat.id]}
                onToggle={handleToggle}
              />
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/60 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <Link
            to="/cookies"
            onClick={closePreferencesModal}
            className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
          >
            <span>Read Complete Legal Cookie Policy</span>
            <ExternalLink className="size-3" />
          </Link>

          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end flex-wrap">
            <button
              type="button"
              onClick={allowNecessaryOnly}
              className="px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 text-xs font-semibold transition cursor-pointer"
            >
              Allow Necessary Only
            </button>

            <button
              type="button"
              onClick={acceptAll}
              className="px-4 py-2.5 rounded-xl bg-neutral-900 dark:bg-neutral-800 hover:bg-neutral-800 dark:hover:bg-neutral-700 text-white text-xs font-bold transition cursor-pointer"
            >
              Accept All
            </button>

            <button
              type="button"
              onClick={handleSave}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-600/25 transition cursor-pointer"
            >
              Save Choices
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
