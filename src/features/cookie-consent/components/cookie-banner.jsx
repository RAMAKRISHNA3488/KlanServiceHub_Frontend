import React from 'react';
import { useCookieConsent } from '../context/cookie-consent-context';
import { Cookie, ShieldCheck, Settings } from 'lucide-react';

export const CookieBanner = () => {
  const { isBannerVisible, acceptAll, allowNecessaryOnly, openPreferencesModal } = useCookieConsent();

  if (!isBannerVisible) return null;

  return (
    <aside
      role="region"
      aria-label="Cookie consent banner"
      className="fixed bottom-0 left-0 right-0 z-[9998] w-full bg-white/98 dark:bg-neutral-950/98 backdrop-blur-md border-t border-neutral-200/90 dark:border-neutral-800 shadow-[0_-10px_35px_rgba(0,0,0,0.15)] animate-in slide-in-from-bottom duration-300"
      style={{
        paddingBottom: 'max(1rem, env(safe-area-inset-bottom, 1rem))',
      }}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 py-5 sm:py-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 lg:gap-8">
          {/* Left Text Content */}
          <div className="flex items-start gap-3.5 sm:gap-4 min-w-0 flex-1">
            <div className="size-10 rounded-2xl bg-blue-50 dark:bg-blue-600/20 border border-blue-200/80 dark:border-blue-500/30 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 shadow-2xs mt-0.5">
              <Cookie className="size-5" />
            </div>

            <div className="space-y-1 text-left">
              <h2 className="text-base sm:text-lg font-bold tracking-tight text-neutral-950 dark:text-white flex items-center gap-2">
                <span>About Cookies on Our Website</span>
              </h2>
              <p className="text-xs sm:text-[13px] text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-4xl">
                This website uses cookies to improve your browsing experience, understand how our website is used, and support our marketing and promotional activities. You can accept all cookies, allow only strictly necessary cookies, or configure your preferences in settings.
              </p>
            </div>
          </div>

          {/* Right Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2.5 sm:gap-3 shrink-0 pt-2 lg:pt-0">
            {/* Tertiary Action: More Settings */}
            <button
              type="button"
              onClick={openPreferencesModal}
              className="order-3 sm:order-1 h-11 px-4 sm:px-5 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 text-xs sm:text-sm font-semibold transition-all duration-150 cursor-pointer flex items-center justify-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
            >
              <Settings className="size-3.5 text-neutral-500 dark:text-neutral-400" />
              <span>More Settings</span>
            </button>

            {/* Secondary Action: Allow Only Necessary */}
            <button
              type="button"
              onClick={allowNecessaryOnly}
              className="order-2 h-11 px-4 sm:px-5 rounded-xl border border-neutral-300 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-600 bg-white dark:bg-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 text-xs sm:text-sm font-semibold transition-all duration-150 cursor-pointer shadow-2xs flex items-center justify-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
            >
              <ShieldCheck className="size-3.5 text-neutral-600 dark:text-neutral-400" />
              <span>Allow Only Necessary</span>
            </button>

            {/* Primary Action: Accept All */}
            <button
              type="button"
              onClick={acceptAll}
              className="order-1 sm:order-3 h-11 px-6 sm:px-7 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs sm:text-sm font-bold shadow-md shadow-blue-600/20 hover:shadow-lg hover:shadow-blue-600/30 transition-all duration-150 cursor-pointer flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
            >
              <span>Accept All</span>
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};
