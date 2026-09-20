import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import {
  getStoredConsent,
  saveConsent,
  acceptAllConsent,
  rejectOptionalConsent,
  clearStoredConsent,
  COOKIE_CONSENT_EVENT,
  DEFAULT_CONSENT_STATE,
} from '../services/cookie-consent-service';
import { COOKIE_CATEGORIES } from '../config/cookie-config';

const CookieConsentContext = createContext(null);

export const CookieConsentProvider = ({ children }) => {
  const [consent, setConsent] = useState(() => getStoredConsent());
  const [isMounted, setIsMounted] = useState(false);
  const [isPreferencesModalOpen, setIsPreferencesModalOpen] = useState(false);

  // Sync state on client mount & listen for events
  useEffect(() => {
    setIsMounted(true);
    const existing = getStoredConsent();
    if (existing) {
      setConsent(existing);
    }

    const handleConsentEvent = (event) => {
      setConsent(event.detail || null);
    };

    const handleOpenModal = () => {
      setIsPreferencesModalOpen(true);
    };

    window.addEventListener(COOKIE_CONSENT_EVENT, handleConsentEvent);
    window.addEventListener('open-cookie-preferences', handleOpenModal);

    return () => {
      window.removeEventListener(COOKIE_CONSENT_EVENT, handleConsentEvent);
      window.removeEventListener('open-cookie-preferences', handleOpenModal);
    };
  }, []);

  const hasAnswered = useMemo(() => {
    return consent !== null;
  }, [consent]);

  const isBannerVisible = useMemo(() => {
    if (!isMounted) return false;
    return !hasAnswered;
  }, [isMounted, hasAnswered]);

  const acceptAll = useCallback(() => {
    const updated = acceptAllConsent();
    setConsent(updated);
    setIsPreferencesModalOpen(false);
  }, []);

  const allowNecessaryOnly = useCallback(() => {
    const updated = rejectOptionalConsent();
    setConsent(updated);
    setIsPreferencesModalOpen(false);
  }, []);

  const saveCustomPreferences = useCallback((customPrefs) => {
    const updated = saveConsent(customPrefs);
    setConsent(updated);
    setIsPreferencesModalOpen(false);
  }, []);

  const openPreferencesModal = useCallback(() => {
    setIsPreferencesModalOpen(true);
  }, []);

  const closePreferencesModal = useCallback(() => {
    setIsPreferencesModalOpen(false);
  }, []);

  const resetConsent = useCallback(() => {
    clearStoredConsent();
    setConsent(null);
  }, []);

  const checkCategoryConsent = useCallback(
    (category) => {
      if (category === COOKIE_CATEGORIES.NECESSARY) return true;
      if (!consent) return false;
      return Boolean(consent[category]);
    },
    [consent]
  );

  const value = useMemo(
    () => ({
      consent: consent || DEFAULT_CONSENT_STATE,
      hasAnswered,
      isBannerVisible,
      isPreferencesModalOpen,
      openPreferencesModal,
      closePreferencesModal,
      acceptAll,
      allowNecessaryOnly,
      saveCustomPreferences,
      resetConsent,
      hasConsent: checkCategoryConsent,
    }),
    [
      consent,
      hasAnswered,
      isBannerVisible,
      isPreferencesModalOpen,
      openPreferencesModal,
      closePreferencesModal,
      acceptAll,
      allowNecessaryOnly,
      saveCustomPreferences,
      resetConsent,
      checkCategoryConsent,
    ]
  );

  return <CookieConsentContext.Provider value={value}>{children}</CookieConsentContext.Provider>;
};

export const useCookieConsent = () => {
  const context = useContext(CookieConsentContext);
  if (!context) {
    throw new Error('useCookieConsent must be used within a CookieConsentProvider');
  }
  return context;
};
