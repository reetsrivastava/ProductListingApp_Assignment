import React, { useState, useMemo } from 'react';

interface PaginationProps<T> {
  data: T[];
  pageSizeOptions?: number[];
  defaultPageSize?: number;
  onPageChange?: (pageData: T[], page: number, pageSize: number) => void;
  selectClassName?: string;
}

function Pagination<T>({
  data,
  pageSizeOptions = [10, 20, 50],
  defaultPageSize = 10,
  onPageChange,
  selectClassName = 'border border-gray-300 rounded px-2 py-1 cursor-pointer',
}: PaginationProps<T>) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);

  const totalPages = Math.ceil(data.length / pageSize);

  const paginatedData = useMemo(() => {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    return data.slice(start, end);
  }, [data, page, pageSize]);

  React.useEffect(() => {
    if (onPageChange) {
      onPageChange(paginatedData, page, pageSize);
    }
  }, [paginatedData, page, pageSize, onPageChange]);

  // Reset to first page if data or pageSize changes
  React.useEffect(() => {
    setPage(1);
  }, [data, pageSize]);

  return (
    <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end text-xs sm:text-sm md:text-base">
      <span className="text-gray-700">Rows per page:</span>
      <select
        className={selectClassName + ' min-w-[60px]'}
        value={pageSize}
        onChange={e => setPageSize(Number(e.target.value))}
      >
        {pageSizeOptions.map(opt => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
      <button
        className="px-3 py-2 sm:py-1 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium cursor-pointer min-w-[40px]"
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
      >
        {'<'}
      </button>
      <span className="text-gray-700">
        Page <span className="font-bold">{page}</span> of <span className="font-bold">{totalPages}</span>
      </span>
      <button
        className="px-3 py-2 sm:py-1 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium cursor-pointer min-w-[40px]"
        onClick={() => setPage(page + 1)}
        disabled={page === totalPages || totalPages === 0}
      >
        {'>'}
      </button>
    </div>
  );
}

export default Pagination;
