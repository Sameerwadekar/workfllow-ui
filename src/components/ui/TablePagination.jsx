import React, { useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ChevronDown
} from 'lucide-react';

/**
 * TaskFlow Enterprise Pagination Component
 * Follows TaskFlow Design System specifications:
 * - Fluid offset indicators
 * - Rows per page selector
 * - Sliding window number buttons with emerald active state
 * - Direct page jump input
 */
export default function TablePagination({
  currentPage = 0, // 0-indexed to match Spring Data Page
  totalPages = 1,
  totalElements = 0,
  pageSize = 10,
  pageSizeOptions = [10, 20, 50, 100],
  onPageChange,
  onPageSizeChange,
  itemLabel = 'records',
  className = ''
}) {
  const [jumpPage, setJumpPage] = useState('');

  useEffect(() => {
    setJumpPage(String(currentPage + 1));
  }, [currentPage]);

  const from = totalElements === 0 ? 0 : currentPage * pageSize + 1;
  const to = Math.min((currentPage + 1) * pageSize, totalElements);

  // Generate pagination items with sliding window and ellipsis
  const getPaginationItems = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i);
    }

    const items = [];
    items.push(0); // First page (0-indexed)

    if (currentPage <= 3) {
      items.push(1, 2, 3, 4);
      items.push('ellipsis-right');
      items.push(totalPages - 1);
    } else if (currentPage >= totalPages - 4) {
      items.push('ellipsis-left');
      for (let i = totalPages - 5; i < totalPages - 1; i++) {
        items.push(i);
      }
      items.push(totalPages - 1);
    } else {
      items.push('ellipsis-left');
      items.push(currentPage - 1, currentPage, currentPage + 1);
      items.push('ellipsis-right');
      items.push(totalPages - 1);
    }

    return items;
  };

  const handleJumpSubmit = (e) => {
    e.preventDefault();
    const parsed = parseInt(jumpPage, 10);
    if (!isNaN(parsed) && parsed >= 1 && parsed <= totalPages) {
      onPageChange(parsed - 1); // convert to 0-indexed
    } else {
      setJumpPage(String(currentPage + 1));
    }
  };

  const paginationItems = getPaginationItems();

  return (
    <div
      className={`px-5 py-3.5 bg-slate-50/80 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4 select-none ${className}`}
    >
      {/* Left: Counter & Rows Per Page */}
      <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-start flex-wrap">
        <div className="text-xs text-slate-500">
          Showing <span className="font-bold text-slate-900">{from}</span> to{' '}
          <span className="font-bold text-slate-900">{to}</span> of{' '}
          <span className="font-bold text-slate-900">{totalElements.toLocaleString()}</span> {itemLabel}
        </div>

        {onPageSizeChange && (
          <div className="flex items-center gap-2">
            <label htmlFor="page-size-select" className="text-xs text-slate-500 whitespace-nowrap">
              Rows per page:
            </label>
            <div className="relative">
              <select
                id="page-size-select"
                value={pageSize}
                onChange={(e) => onPageSizeChange(Number(e.target.value))}
                className="appearance-none pl-3 pr-7 py-1 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-800 shadow-xs focus:outline-none focus:ring-2 focus:ring-[#10b981] cursor-pointer"
              >
                {pageSizeOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt} / page
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            </div>
          </div>
        )}
      </div>

      {/* Right: Numbered Stepper + Direct Jump */}
      <div className="flex items-center gap-3 flex-wrap justify-center md:justify-end w-full md:w-auto">
        <nav aria-label="Pagination" className="flex items-center gap-1">
          {/* First Page Button */}
          <button
            type="button"
            onClick={() => onPageChange(0)}
            disabled={currentPage === 0}
            title="First Page"
            className="flex items-center justify-center gap-1 px-2.5 py-1.5 rounded-xl bg-white hover:bg-slate-100 disabled:opacity-40 disabled:hover:bg-white disabled:cursor-not-allowed border border-slate-200 text-slate-700 shadow-xs text-xs font-semibold transition-all cursor-pointer"
          >
            <ChevronsLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">First</span>
          </button>

          {/* Previous Page Button */}
          <button
            type="button"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 0}
            title="Previous Page"
            className="flex items-center justify-center gap-1 px-2.5 py-1.5 rounded-xl bg-white hover:bg-slate-100 disabled:opacity-40 disabled:hover:bg-white disabled:cursor-not-allowed border border-slate-200 text-slate-700 shadow-xs text-xs font-semibold transition-all cursor-pointer"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Prev</span>
          </button>

          {/* Page Numbers */}
          {paginationItems.map((item, idx) => {
            if (typeof item === 'string') {
              return (
                <span
                  key={`ellipsis-${idx}`}
                  className="w-7 h-8 flex items-center justify-center font-bold text-slate-400 select-none text-xs"
                >
                  ...
                </span>
              );
            }

            const isCurrent = item === currentPage;
            return (
              <button
                key={item}
                type="button"
                onClick={() => onPageChange(item)}
                aria-current={isCurrent ? 'page' : undefined}
                className={`w-8 h-8 rounded-xl text-xs transition-all flex items-center justify-center cursor-pointer ${
                  isCurrent
                    ? 'bg-[#10b981] text-white font-bold shadow-sm shadow-emerald-600/30 scale-105'
                    : 'bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-semibold shadow-xs'
                }`}
              >
                {item + 1}
              </button>
            );
          })}

          {/* Next Page Button */}
          <button
            type="button"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage >= totalPages - 1 || totalPages === 0}
            title="Next Page"
            className="flex items-center justify-center gap-1 px-2.5 py-1.5 rounded-xl bg-white hover:bg-slate-100 disabled:opacity-40 disabled:hover:bg-white disabled:cursor-not-allowed border border-slate-200 text-slate-700 shadow-xs text-xs font-semibold transition-all cursor-pointer"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>

          {/* Last Page Button */}
          <button
            type="button"
            onClick={() => onPageChange(totalPages - 1)}
            disabled={currentPage >= totalPages - 1 || totalPages === 0}
            title="Last Page"
            className="flex items-center justify-center gap-1 px-2.5 py-1.5 rounded-xl bg-white hover:bg-slate-100 disabled:opacity-40 disabled:hover:bg-white disabled:cursor-not-allowed border border-slate-200 text-slate-700 shadow-xs text-xs font-semibold transition-all cursor-pointer"
          >
            <span className="hidden sm:inline">Last</span>
            <ChevronsRight className="w-3.5 h-3.5" />
          </button>
        </nav>

        {/* Direct Jump Input */}
        {totalPages > 1 && (
          <form onSubmit={handleJumpSubmit} className="flex items-center gap-1.5 pl-1">
            <span className="text-xs text-slate-400 font-medium">Go to:</span>
            <input
              type="number"
              min="1"
              max={totalPages}
              value={jumpPage}
              onChange={(e) => setJumpPage(e.target.value)}
              placeholder={String(currentPage + 1)}
              className="w-12 px-2 py-1 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-center text-slate-800 shadow-xs focus:outline-none focus:ring-2 focus:ring-[#10b981]"
            />
            <button
              type="submit"
              className="px-2.5 py-1 rounded-xl bg-slate-200 hover:bg-[#10b981] hover:text-white text-xs font-semibold text-slate-700 transition-all cursor-pointer"
            >
              Go
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
