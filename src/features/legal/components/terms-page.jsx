import React from 'react';
import { LegalLayout } from './legal-layout';
import { Shield, CheckCircle2, AlertCircle, FileText, Lock, Globe, Server, UserCheck, Scale, Cpu, CreditCard, RefreshCw } from 'lucide-react';
import Link from 'next/link';

export const TermsPage = () => {
  return (
    <LegalLayout
      title="Terms of Service"
      subtitle="The comprehensive customer terms, governance standards, and conditions governing access to and use of klanservicehub enterprise cloud services, workspaces, APIs, and agile developer modules."
      activeTab="terms"
      lastUpdated="January 15, 2026"
    >
      <div className="space-y-10 text-neutral-700 dark:text-neutral-300 text-sm leading-relaxed">
        {/* Quick Summary Notice Box */}
        <div className="p-5 rounded-3xl bg-blue-50/80 dark:bg-blue-950/30 border border-blue-200/80 dark:border-blue-900/50 space-y-2 text-xs">
          <div className="flex items-center gap-2 text-blue-950 dark:text-blue-200 font-bold text-sm">
            <FileText className="size-4 text-blue-600 dark:text-blue-400 shrink-0" />
            <span>Executive Agreement Summary</span>
          </div>
          <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
            By signing up, configuring workspaces, integrating APIs, or accessing klanservicehub, you enter into a legally binding agreement with <strong>Klanvision IT Solutions Private Limited</strong>. This agreement governs platform usage, enterprise data ownership, role-based access controls (RBAC), SLA availability, and cookie privacy preferences.
          </p>
        </div>

        {/* 1. Acceptance */}
        <section className="space-y-3">
          <h2 className="text-xl font-black text-neutral-950 dark:text-white pb-2 border-b border-neutral-200 dark:border-neutral-800 flex items-center gap-2">
            <span className="size-7 rounded-lg bg-blue-600/10 text-blue-600 flex items-center justify-center text-xs font-bold font-mono">01</span>
            <span>Acceptance of Terms & Service Scope</span>
          </h2>
          <p>
            These Customer Terms of Service ("Agreement") are entered into by and between <strong>klanservicehub</strong>, an enterprise product of <strong>Klanvision IT Solutions Private Limited</strong> ("we", "us", or "our"), and the individual or legal entity accessing or utilizing the software ("Customer", "you", or "your").
          </p>
          <p>
            By creating an account, launching an organization workspace, configuring Jira-style agile boards, sprints, service desks, or custom workflows, you explicitly acknowledge and agree to be legally bound by this Agreement and all incorporated policies (including our Privacy Policy, Cookie Policy, and Acceptable Use Policy).
          </p>
        </section>

        {/* 2. Account Registration, Security & Multi-Tenancy */}
        <section className="space-y-3">
          <h2 className="text-xl font-black text-neutral-950 dark:text-white pb-2 border-b border-neutral-200 dark:border-neutral-800 flex items-center gap-2">
            <span className="size-7 rounded-lg bg-blue-600/10 text-blue-600 flex items-center justify-center text-xs font-bold font-mono">02</span>
            <span>Account Security, Authentication & Multi-Tenancy</span>
          </h2>
          <p>
            To use klanservicehub, you must register a verified user account. You agree to provide accurate, complete registration details and maintain the security of your credentials, OTP dispatches, and session tokens.
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-neutral-600 dark:text-neutral-400">
            <li><strong>Authentication Methods:</strong> We support Email/Password, 6-digit Time-based One-Time Passwords (OTP), and Enterprise Single Sign-On (SSO) via OAuth2 (Google, Microsoft, GitHub).</li>
            <li><strong>Multi-Organization Isolation:</strong> Each company workspace is strictly isolated at the database schema layer with tenant-specific indexes, dedicated ACL matrixes, and foreign key boundaries to guarantee zero cross-tenant data leakage.</li>
            <li><strong>Credential Confidentiality:</strong> You are solely responsible for all activities that occur under your user account and workspaces. Any unauthorized access must be reported immediately to <code>security@klanvision.com</code>.</li>
          </ul>
        </section>

        {/* 3. Workspace Administration, RBAC & Delivery Governance */}
        <section className="space-y-3">
          <h2 className="text-xl font-black text-neutral-950 dark:text-white pb-2 border-b border-neutral-200 dark:border-neutral-800 flex items-center gap-2">
            <span className="size-7 rounded-lg bg-blue-600/10 text-blue-600 flex items-center justify-center text-xs font-bold font-mono">03</span>
            <span>Workspace Administration & Delivery Governance (RBAC)</span>
          </h2>
          <p>
            Customers designate Workspace Administrators and Company Owners who manage member permissions, provision squads, assign project roles, and configure issue transition workflows.
          </p>
          <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-900/40 text-emerald-950 dark:text-emerald-300 space-y-2 text-xs">
            <p className="font-bold flex items-center gap-1.5 text-emerald-900 dark:text-emerald-200 text-sm">
              <Shield className="size-4 text-emerald-600 dark:text-emerald-400" /> Strict Delivery Governance Rule
            </p>
            <p className="leading-relaxed">
              To enforce engineering quality assurance (QA) and audit integrity across agile squads, transitions of tasks or issue tickets into the <strong>"Done"</strong> (Completed) status are cryptographically and server-side restricted to <strong>Workspace Administrators</strong> and <strong>Company Owners</strong>. Unauthorized status change requests return a <code>403 Forbidden</code> status and are logged in the immutable audit log.
            </p>
          </div>
        </section>

        {/* 4. Cloud Infrastructure & Edge Performance */}
        <section className="space-y-3">
          <h2 className="text-xl font-black text-neutral-950 dark:text-white pb-2 border-b border-neutral-200 dark:border-neutral-800 flex items-center gap-2">
            <span className="size-7 rounded-lg bg-blue-600/10 text-blue-600 flex items-center justify-center text-xs font-bold font-mono">04</span>
            <span>Cloudflare Edge Infrastructure & Performance SLA</span>
          </h2>
          <p>
            klanservicehub operates on distributed edge infrastructure leveraging <strong>Cloudflare Workers</strong>, <strong>Cloudflare Pages</strong>, and <strong>Cloudflare D1 SQLite relational databases</strong>.
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-neutral-600 dark:text-neutral-400">
            <li><strong>High Availability Target:</strong> We provide an uptime commitment of <strong>99.9%</strong> availability for production workspaces during each calendar month.</li>
            <li><strong>Sub-10ms Edge Querying:</strong> Prepared statement caching and global edge endpoints deliver sub-10ms p99 query execution speeds.</li>
            <li><strong>Scheduled Maintenance:</strong> Scheduled updates and database optimizations are performed during non-peak windows with prior notification posted in the status center.</li>
          </ul>
        </section>

        {/* 5. Cookies, Telemetry & Privacy Compliance */}
        <section className="space-y-3">
          <h2 className="text-xl font-black text-neutral-950 dark:text-white pb-2 border-b border-neutral-200 dark:border-neutral-800 flex items-center gap-2">
            <span className="size-7 rounded-lg bg-blue-600/10 text-blue-600 flex items-center justify-center text-xs font-bold font-mono">05</span>
            <span>Cookies, Data Telemetry & Privacy Rights</span>
          </h2>
          <p>
            Our data processing practices are compliant with <strong>GDPR (Regulation EU 2016/679)</strong>, <strong>CCPA/CPRA</strong>, and <strong>PECR</strong>.
          </p>
          <p>
            Visitors and users can customize their tracking preferences at any time using our built-in <Link href="/cookies" className="text-blue-600 dark:text-blue-400 font-semibold underline underline-offset-2">Interactive Cookie Preference Center</Link>. Strictly necessary authentication and CSRF security cookies remain active to preserve platform security.
          </p>
        </section>

        {/* 6. Customer Data & Intellectual Property */}
        <section className="space-y-3">
          <h2 className="text-xl font-black text-neutral-950 dark:text-white pb-2 border-b border-neutral-200 dark:border-neutral-800 flex items-center gap-2">
            <span className="size-7 rounded-lg bg-blue-600/10 text-blue-600 flex items-center justify-center text-xs font-bold font-mono">06</span>
            <span>Customer Data Ownership & Intellectual Property</span>
          </h2>
          <p>
            <strong>Customer Data:</strong> As between the parties, you retain 100% ownership, title, and intellectual property rights in and to all data, task descriptions, sprint logs, issue attachments, code snippets, and comments submitted by your organization into klanservicehub.
          </p>
          <p>
            <strong>Platform IP:</strong> Klanvision IT Solutions and its lead architects retain all worldwide right, title, and interest in and to the klanservicehub software platform, user interface designs, custom workflow engines, APIs, and brand assets.
          </p>
        </section>

        {/* 7. Subscriptions, Fees & Billing */}
        <section className="space-y-3">
          <h2 className="text-xl font-black text-neutral-950 dark:text-white pb-2 border-b border-neutral-200 dark:border-neutral-800 flex items-center gap-2">
            <span className="size-7 rounded-lg bg-blue-600/10 text-blue-600 flex items-center justify-center text-xs font-bold font-mono">07</span>
            <span>Subscriptions, Seat Licences, Fees & Billing</span>
          </h2>
          <p>
            klanservicehub offers both Free Developer tiers and Enterprise subscription plans (Pro, Business, Enterprise Unlimited).
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-neutral-600 dark:text-neutral-400">
            <li><strong>Billing Cycles:</strong> Paid plans are billed in advance on a monthly or annual recurring cycle via verified payment gateways.</li>
            <li><strong>Seat Additions:</strong> Additional team member licenses provisioned during a billing term are prorated for the remainder of the current billing cycle.</li>
            <li><strong>Cancellation:</strong> You may downgrade or cancel your workspace subscription at any time through the Billing & Invoicing portal; cancellation becomes effective at the end of the active term.</li>
          </ul>
        </section>

        {/* 8. Acceptable Use & API Restrictions */}
        <section className="space-y-3">
          <h2 className="text-xl font-black text-neutral-950 dark:text-white pb-2 border-b border-neutral-200 dark:border-neutral-800 flex items-center gap-2">
            <span className="size-7 rounded-lg bg-blue-600/10 text-blue-600 flex items-center justify-center text-xs font-bold font-mono">08</span>
            <span>Acceptable Use, Rate Limits & API Guidelines</span>
          </h2>
          <p>
            You agree not to misuse the service, reverse engineer backend source code, attempt unauthorized penetration testing without prior written consent, distribute malicious malware, or circumvent API rate limits (100 requests / 10 seconds per IP on public endpoints).
          </p>
        </section>

        {/* 9. Data Export, Portability & Deletion */}
        <section className="space-y-3">
          <h2 className="text-xl font-black text-neutral-950 dark:text-white pb-2 border-b border-neutral-200 dark:border-neutral-800 flex items-center gap-2">
            <span className="size-7 rounded-lg bg-blue-600/10 text-blue-600 flex items-center justify-center text-xs font-bold font-mono">09</span>
            <span>Data Export, Portability & Account Deletion</span>
          </h2>
          <p>
            Workspace Owners may export full workspace databases in JSON or CSV formats at any time from the Data Management portal. Upon account termination, Customer Data is scheduled for permanent cryptographic deletion from edge replicas within 30 calendar days.
          </p>
        </section>

        {/* 10. Limitation of Liability & Warranties */}
        <section className="space-y-3">
          <h2 className="text-xl font-black text-neutral-950 dark:text-white pb-2 border-b border-neutral-200 dark:border-neutral-800 flex items-center gap-2">
            <span className="size-7 rounded-lg bg-blue-600/10 text-blue-600 flex items-center justify-center text-xs font-bold font-mono">10</span>
            <span>Limitation of Liability & Disclaimers</span>
          </h2>
          <p className="text-xs uppercase text-neutral-500 dark:text-neutral-400 font-mono leading-normal">
            TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND. NEITHER PARTY SHALL BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, OR CONSEQUENTIAL DAMAGES, LOSS OF DATA, OR LOSS OF BUSINESS PROFITS ARISING OUT OF OR IN CONNECTION WITH THIS AGREEMENT.
          </p>
        </section>

        {/* 11. Governing Law, Corporate Entity & Contact */}
        <section className="space-y-4 pt-6 border-t border-neutral-200 dark:border-neutral-800">
          <h2 className="text-xl font-black text-neutral-950 dark:text-white flex items-center gap-2">
            <span className="size-7 rounded-lg bg-blue-600/10 text-blue-600 flex items-center justify-center text-xs font-bold font-mono">11</span>
            <span>Governing Law & Corporate Jurisdiction</span>
          </h2>
          <p>
            This Agreement is governed by and construed in accordance with the laws of India, without regard to conflict of law principles. Any dispute arising out of this Agreement shall be subject to the exclusive jurisdiction of the competent courts in Hyderabad, Telangana, India.
          </p>
          
          {/* Corporate Box */}
          <div className="p-4 rounded-2xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-600 dark:text-neutral-400 space-y-1.5">
            <p className="text-neutral-900 dark:text-white font-bold text-sm">
              Klanvision IT Solutions Private Limited
            </p>
            <p>Corporate Portal: <a href="https://klanvision.com" target="_blank" rel="noreferrer" className="text-blue-600 dark:text-blue-400 font-semibold underline">klanvision.com</a></p>
            <p>Lead Software Engineer & Cloud Architect: <strong>Ramakrishna K (RK)</strong> (<a href="https://ramakrishna3488.github.io/" target="_blank" rel="noreferrer" className="text-blue-600 dark:text-blue-400 underline">ramakrishna3488.github.io</a>)</p>
            <p>Legal & Governance Inquiries: <strong>legal@klanvision.com</strong> | <strong>support@klanvision.com</strong></p>
          </div>
        </section>
      </div>
    </LegalLayout>
  );
};

export default TermsPage;
