import { RefreshCw, WifiOff } from "lucide-react";

/**
 * Friendly fallback shown instead of a raw error/loading message whenever a
 * fetch is either taking unusually long or has failed outright. The actual
 * error detail always stays in the console (see useApiData) — this is the
 * only thing the visitor ever sees.
 */
export default function ConnectionNotice({ onRetry, className = "" }) {
  return (
    <div
      className={`w-full flex flex-col items-center justify-center gap-2 text-center py-6 px-4 ${className}`}
    >
      <WifiOff className="w-6 h-6 text-gray-400" />
      <p className="text-sm text-gray-500 max-w-sm">
        {onRetry
          ? "We couldn't load this content. Please check your internet connection and try again."
          : "This is taking longer than usual. Please check your internet connection."}
      </p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex items-center gap-2 text-sm font-semibold text-brand-purple hover:underline cursor-pointer"
        >
          <RefreshCw className="w-4 h-4" />
          Try again
        </button>
      )}
    </div>
  );
}
