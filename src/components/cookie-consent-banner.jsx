import React from 'react';
import { CookieConsentRoot, CookieBanner, CookiePreferencesModal, CookieSettingsButton, useCookieConsent } from '@/features/cookie-consent';

export const CookieConsentBanner = () => {
  return <CookieConsentRoot />;
};

export { CookieBanner, CookiePreferencesModal, CookieSettingsButton, useCookieConsent };
export default CookieConsentBanner;
