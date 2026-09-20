import React from 'react';
import { CookieBanner } from './cookie-banner';
import { CookiePreferencesModal } from './cookie-preferences-modal';

export const CookieConsentRoot = () => {
  return (
    <>
      <CookieBanner />
      <CookiePreferencesModal />
    </>
  );
};
