import React from 'react';

interface ErrorProps {
  message?: string;
  onRetry?: () => void;
}

const Error: React.FC<ErrorProps> = ({ message = 'Something went wrong or no data found.', onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <svg className="w-16 h-16 text-red-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" />
      </svg>
      <p className="text-lg text-gray-700 mb-4 text-center">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-[#B8E986] bg-opacity-80 text-gray-800 rounded hover:bg-opacity-100 transition cursor-pointer"
        >
          Retry
        </button>
      )}
    </div>
  );
};

export default Error;
