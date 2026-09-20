/**
 * Cookie Consent Local Storage & Script Management Service
 * Supports GDPR, CCPA, and PECR compliance standards
 */

import {
  CONSENT_STORAGE_KEY,
  CONSENT_VERSION,
  COOKIE_CATEGORIES,
  COOKIE_DEFINITIONS,
} from '../config/cookie-config';

export const COOKIE_CONSENT_EVENT = 'klanservicehub_cookie_consent_change';

export const DEFAULT_CONSENT_STATE = {
  version: CONSENT_VERSION,
  timestamp: null,
  necessary: true,
  analytics: false,
  functional: false,
  marketing: false,
};

export function getStoredConsent() {
  if (typeof window === 'undefined') return null;

  try {
    const raw = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) {
      // Check legacy key for backwards compatibility
      const legacyPrefs = localStorage.getItem('klan_cookie_preferences');
      if (legacyPrefs) {
        const parsedLegacy = JSON.parse(legacyPrefs);
        const migrated = {
          version: CONSENT_VERSION,
          timestamp: localStorage.getItem('klan_cookie_consent_timestamp') || new Date().toISOString(),
          necessary: true,
          analytics: Boolean(parsedLegacy.analytics),
          functional: Boolean(parsedLegacy.functional),
          marketing: Boolean(parsedLegacy.marketing),
        };
        localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(migrated));
        return migrated;
      }
      return null;
    }

    const parsed = JSON.parse(raw);
    if (!parsed || parsed.version !== CONSENT_VERSION) {
      return null;
    }

    return {
      ...DEFAULT_CONSENT_STATE,
      ...parsed,
      necessary: true,
    };
  } catch (error) {
    console.error('[CookieConsentService] Failed to read stored consent:', error);
    return null;
  }
}

export function saveConsent(preferences) {
  if (typeof window === 'undefined') return null;

  const consentRecord = {
    version: CONSENT_VERSION,
    timestamp: new Date().toISOString(),
    necessary: true,
    analytics: Boolean(preferences.analytics),
    functional: Boolean(preferences.functional),
    marketing: Boolean(preferences.marketing),
  };

  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(consentRecord));
    
    // Also save legacy keys for full backwards-compatibility with older components
    localStorage.setItem('klan_cookie_preferences', JSON.stringify({
      necessary: true,
      functional: consentRecord.functional,
      analytics: consentRecord.analytics,
      marketing: consentRecord.marketing,
    }));
    localStorage.setItem('klan_cookie_consent_status', 'customized');
    localStorage.setItem('klan_cookie_consent_timestamp', consentRecord.timestamp);

    dispatchConsentEvent(consentRecord);
    applyCategoryScripts(consentRecord);
    return consentRecord;
  } catch (error) {
    console.error('[CookieConsentService] Failed to save consent:', error);
    return consentRecord;
  }
}

export function acceptAllConsent() {
  const allAccepted = {
    necessary: true,
    analytics: true,
    functional: true,
    marketing: true,
  };
  const result = saveConsent(allAccepted);
  try {
    localStorage.setItem('klan_cookie_consent_status', 'accepted_all');
  } catch (e) {}
  return result;
}

export function rejectOptionalConsent() {
  const necessaryOnly = {
    necessary: true,
    analytics: false,
    functional: false,
    marketing: false,
  };
  const result = saveConsent(necessaryOnly);
  try {
    localStorage.setItem('klan_cookie_consent_status', 'declined_optional');
  } catch (e) {}
  return result;
}

export function clearStoredConsent() {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(CONSENT_STORAGE_KEY);
    localStorage.removeItem('klan_cookie_preferences');
    localStorage.removeItem('klan_cookie_consent_status');
    localStorage.removeItem('klan_cookie_consent_timestamp');
    dispatchConsentEvent(null);
  } catch (error) {
    console.error('[CookieConsentService] Failed to clear consent:', error);
  }
}

export function dispatchConsentEvent(consent) {
  if (typeof window === 'undefined') return;
  const event = new CustomEvent(COOKIE_CONSENT_EVENT, { detail: consent });
  window.dispatchEvent(event);
  
  // Also dispatch legacy event for backwards compatibility
  const legacyEvent = new CustomEvent('cookie-preferences-updated', { detail: consent });
  window.dispatchEvent(legacyEvent);
}

export function applyCategoryScripts(consent) {
  if (typeof window === 'undefined' || !consent) return;

  if (consent.analytics) {
    window['ga-disable-default'] = false;
  } else {
    window['ga-disable-default'] = true;
  }

  if (consent.marketing) {
    // Enable marketing pixels if configured
  }
}
