import React, { useState } from 'react';
import { ChevronDown, Shield, Info, Database } from 'lucide-react';
import { CookieToggle } from './cookie-toggle';

export const CookieCategoryItem = ({
  category,
  isEnabled,
  onToggle,
  defaultExpanded = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const toggleDetails = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900/60 shadow-2xs transition-all overflow-hidden">
      {/* Category Header Row */}
      <div className="p-4 sm:p-5 flex items-start sm:items-center justify-between gap-4">
        <div className="space-y-1 min-w-0 flex-1">
          <div className="flex items-center gap-2.5 flex-wrap">
            <h3 className="text-sm sm:text-base font-bold text-neutral-900 dark:text-white tracking-tight">
              {category.name}
            </h3>

            {category.required ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 px-2.5 py-0.5 text-[10px] font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wide">
                <Shield className="size-2.5" />
                <span>Always Active</span>
              </span>
            ) : isEnabled ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wide">
                Active
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 rounded-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 px-2.5 py-0.5 text-[10px] font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wide">
                Disabled
              </span>
            )}
          </div>

          <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-2xl">
            {category.summary}
          </p>
        </div>

        {/* Toggle Switch */}
        <div className="shrink-0 flex items-center pt-1 sm:pt-0">
          <CookieToggle
            id={`toggle-${category.id}`}
            checked={category.required ? true : Boolean(isEnabled)}
            disabled={category.required}
            onChange={(val) => onToggle(category.id, val)}
            label={`Toggle ${category.name}`}
            ariaDescribedBy={`desc-${category.id}`}
          />
        </div>
      </div>

      {/* Expand/Collapse Trigger */}
      <div className="px-4 sm:px-5 pb-3 pt-0 flex items-center justify-between border-t border-neutral-100 dark:border-neutral-800/80">
        <button
          type="button"
          onClick={toggleDetails}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 py-1 transition cursor-pointer"
        >
          <Info className="size-3.5" />
          <span>{isExpanded ? 'Hide Cookie Details' : 'View Cookies in this Category'}</span>
          <ChevronDown className={`size-3.5 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
        </button>

        <span className="text-[11px] text-neutral-400 font-mono">
          {category.cookies?.length || 0} items
        </span>
      </div>

      {/* Collapsible Details & Cookies Table */}
      {isExpanded && (
        <div className="px-4 sm:px-5 pb-4 pt-2 bg-neutral-50/70 dark:bg-neutral-950/40 border-t border-neutral-100 dark:border-neutral-800/60 space-y-3.5 animate-in slide-in-from-top-2 duration-200">
          <p id={`desc-${category.id}`} className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
            {category.details}
          </p>

          {/* Cookies Sub-table */}
          {category.cookies && category.cookies.length > 0 && (
            <div className="overflow-x-auto rounded-xl border border-neutral-200 dark:border-neutral-800">
              <table className="w-full text-left text-xs">
                <thead className="bg-neutral-100 dark:bg-neutral-800/60 text-neutral-700 dark:text-neutral-300 text-[11px] font-bold uppercase tracking-wider">
                  <tr>
                    <th className="px-3 py-2">Cookie Name</th>
                    <th className="px-3 py-2">Provider</th>
                    <th className="px-3 py-2 hidden sm:table-cell">Purpose</th>
                    <th className="px-3 py-2">Expiry</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800 bg-white dark:bg-neutral-900/40">
                  {category.cookies.map((ck, cIdx) => (
                    <tr key={cIdx} className="hover:bg-neutral-50/50 dark:hover:bg-neutral-800/30 transition">
                      <td className="px-3 py-2 font-mono font-bold text-neutral-900 dark:text-neutral-100">
                        {ck.name}
                      </td>
                      <td className="px-3 py-2 text-neutral-600 dark:text-neutral-300">
                        {ck.provider}
                      </td>
                      <td className="px-3 py-2 text-neutral-500 dark:text-neutral-400 hidden sm:table-cell">
                        {ck.purpose}
                      </td>
                      <td className="px-3 py-2 text-neutral-500 dark:text-neutral-400 font-mono text-[11px]">
                        {ck.expiry}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
