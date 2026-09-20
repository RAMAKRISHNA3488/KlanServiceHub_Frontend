import React, { useState } from 'react';
import { LegalLayout } from './legal-layout';
import { useCookieConsent } from '@/features/cookie-consent';
import { COOKIE_DEFINITIONS } from '@/features/cookie-consent/config/cookie-config';
import { Cookie, Shield, CheckCircle2, Sliders, Info, Eye, Database, AlertCircle, RefreshCw, Lock } from 'lucide-react';

export const CookiesPolicyPage = () => {
  const { consent, saveCustomPreferences, acceptAll } = useCookieConsent();
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [localPreferences, setLocalPreferences] = useState({
    necessary: true,
    functional: Boolean(consent?.functional),
    analytics: Boolean(consent?.analytics),
    marketing: Boolean(consent?.marketing),
  });

  const handleToggle = (key) => {
    if (key === 'necessary') return; // strictly necessary cannot be disabled
    setLocalPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSavePreferences = () => {
    saveCustomPreferences(localPreferences);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleAcceptAll = () => {
    acceptAll();
    setLocalPreferences({ necessary: true, functional: true, analytics: true, marketing: true });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };


  return (
    <LegalLayout
      title="Cookie Policy & Preferences"
      subtitle="How klanservicehub uses cookies, local storage, and telemetry to deliver secure workspace authentication, real-time collaboration, and performance analytics."
      activeTab="cookies"
      lastUpdated="January 15, 2026"
    >
      <div className="space-y-8 text-neutral-700 text-sm leading-relaxed">
        {/* Interactive Preference Center Widget */}
        <section className="p-6 rounded-3xl bg-neutral-900 text-white shadow-xl border border-neutral-800 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-neutral-800">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                <Cookie className="size-5" />
              </div>
              <div>
                <h3 className="font-bold text-base text-white">Interactive Cookie Preference Center</h3>
                <p className="text-xs text-neutral-400">Customize your data and tracking preferences in real time</p>
              </div>
            </div>
            {savedSuccess && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold animate-in fade-in">
                <CheckCircle2 className="size-3.5" /> Preferences Saved!
              </span>
            )}
          </div>

          <div className="space-y-4">
              {/* Strictly Necessary */}
            <div className="flex items-start justify-between gap-4 p-3.5 rounded-2xl bg-neutral-800/60 border border-neutral-700/60">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-white">Strictly Necessary Cookies</span>
                  <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 text-[10px] font-bold uppercase">Required</span>
                </div>
                <p className="text-xs text-neutral-400">
                  Required for user authentication sessions, CSRF token validation, role-based access checks, and workspace routing.
                </p>
              </div>
              <input
                type="checkbox"
                checked={localPreferences.necessary}
                disabled
                className="size-5 rounded border-neutral-600 text-blue-600 cursor-not-allowed opacity-80 mt-1"
              />
            </div>

            {/* Functional */}
            <div className="flex items-start justify-between gap-4 p-3.5 rounded-2xl bg-neutral-800/60 border border-neutral-700/60">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-white">Functional & Preferences Cookies</span>
                </div>
                <p className="text-xs text-neutral-400">
                  Remembers your sidebar expansion state, theme preferences, selected workspace filters, and table column widths.
                </p>
              </div>
              <input
                type="checkbox"
                checked={localPreferences.functional}
                onChange={() => handleToggle('functional')}
                className="size-5 rounded border-neutral-600 text-blue-600 cursor-pointer mt-1"
              />
            </div>

            {/* Analytics & Telemetry */}
            <div className="flex items-start justify-between gap-4 p-3.5 rounded-2xl bg-neutral-800/60 border border-neutral-700/60">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-white">Analytics & Performance</span>
                </div>
                <p className="text-xs text-neutral-400">
                  Helps us monitor query latencies, identify slow rendering boards, and optimize cloud worker throughput.
                </p>
              </div>
              <input
                type="checkbox"
                checked={localPreferences.analytics}
                onChange={() => handleToggle('analytics')}
                className="size-5 rounded border-neutral-600 text-blue-600 cursor-pointer mt-1"
              />
            </div>

            {/* Marketing */}
            <div className="flex items-start justify-between gap-4 p-3.5 rounded-2xl bg-neutral-800/60 border border-neutral-700/60">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-white">Marketing & Announcement Cookies</span>
                </div>
                <p className="text-xs text-neutral-400">
                  Used to present relevant feature updates, enterprise webinar alerts, and new integration announcements.
                </p>
              </div>
              <input
                type="checkbox"
                checked={localPreferences.marketing}
                onChange={() => handleToggle('marketing')}
                className="size-5 rounded border-neutral-600 text-blue-600 cursor-pointer mt-1"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
            <button
              onClick={handleAcceptAll}
              className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-bold border border-neutral-700 transition"
            >
              Accept All Categories
            </button>
            <button
              onClick={handleSavePreferences}
              className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30 transition"
            >
              Save Cookie Preferences
            </button>
          </div>
        </section>

        {/* 1. What Are Cookies */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-neutral-950 pb-2 border-b border-neutral-100">
            1. What Are Cookies and Local Storage?
          </h2>
          <p>
            Cookies are small alphanumeric data files stored in your browser by websites you visit. In addition to HTTP cookies, <strong>klanservicehub</strong> utilizes modern browser storage mechanisms such as <code>localStorage</code> and <code>sessionStorage</code> to store UI preferences and authentication states locally on your device.
          </p>
        </section>

        {/* 2. Categorization Table */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-neutral-950 pb-2 border-b border-neutral-100">
            2. Detailed Cookie Categories & Lifespans
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-neutral-200 rounded-2xl overflow-hidden">
              <thead className="bg-neutral-100 text-neutral-800 font-bold border-b border-neutral-200">
                <tr>
                  <th className="p-3">Cookie / Key Name</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Purpose</th>
                  <th className="p-3">Duration</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 bg-white">
                <tr>
                  <td className="p-3 font-mono text-blue-600 font-semibold">klan_session</td>
                  <td className="p-3">Strictly Necessary</td>
                  <td className="p-3">Maintains authenticated user session state with Cloudflare edge backends.</td>
                  <td className="p-3">Session / 30 Days</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-blue-600 font-semibold">klan_csrf_token</td>
                  <td className="p-3">Strictly Necessary</td>
                  <td className="p-3">Cryptographic token preventing cross-site request forgery attacks.</td>
                  <td className="p-3">Session</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-blue-600 font-semibold">klan_cookie_preferences</td>
                  <td className="p-3">Functional</td>
                  <td className="p-3">Stores user opt-in/opt-out selections for cookie categories.</td>
                  <td className="p-3">1 Year</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-blue-600 font-semibold">klan_active_workspace</td>
                  <td className="p-3">Functional</td>
                  <td className="p-3">Remembers last visited workspace ID to streamline navigation.</td>
                  <td className="p-3">Persistent</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-blue-600 font-semibold">klan_telemetry_optin</td>
                  <td className="p-3">Analytics</td>
                  <td className="p-3">Records diagnostic query metrics to detect frontend UI performance regressions.</td>
                  <td className="p-3">6 Months</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 3. Managing and Disabling Cookies */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-neutral-950 pb-2 border-b border-neutral-100">
            3. How to Manage or Disable Cookies in Your Browser
          </h2>
          <p>
            You can modify your cookie choices at any time through our interactive preference center above. Alternatively, you can configure your web browser settings to block or delete cookies:
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><strong>Google Chrome:</strong> Settings → Privacy & Security → Third-Party Cookies.</li>
            <li><strong>Mozilla Firefox:</strong> Options → Privacy & Security → Enhanced Tracking Protection.</li>
            <li><strong>Apple Safari:</strong> Preferences → Privacy → Block all cookies.</li>
            <li><strong>Microsoft Edge:</strong> Settings → Cookies and Site Permissions.</li>
          </ul>
          <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 flex items-center gap-2.5 text-xs">
            <AlertCircle className="size-4 text-amber-600 shrink-0" />
            <span>
              Note: Blocking strictly necessary cookies will prevent sign-in and cause workspace dashboards to malfunction.
            </span>
          </div>
        </section>

        {/* 4. Compliance & Contact */}
        <section className="space-y-2 pt-4 border-t border-neutral-100 text-xs text-neutral-500">
          <p>
            Regulatory Compliance: <strong>GDPR (EU 2016/679)</strong>, <strong>ePrivacy Directive (PECR)</strong>, and <strong>CCPA/CPRA</strong> compliant.
          </p>
          <p>
            Cookie Policy Contact: <strong>privacy@klanservicehub.dev</strong> | Chief Engineer: <strong>Ramakrishna (RK)</strong>
          </p>
        </section>
      </div>
    </LegalLayout>
  );
};
