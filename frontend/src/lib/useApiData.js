import { useCallback, useEffect, useState } from "react";

// How long a request can be in-flight before we tell the user their
// connection might be the problem, without giving up on the request itself.
const SLOW_THRESHOLD_MS = 6000;

/**
 * Fetches data from `fetcher` on mount (and whenever `retry()` is called).
 *
 * - Failures are only ever logged to the console — callers should never
 *   render the raw error message, just fall back to a friendly UI state.
 * - `isSlow` flips true once the request has been pending longer than
 *   SLOW_THRESHOLD_MS, so the UI can nudge the user to check their
 *   connection while still waiting for a response.
 */
export function useApiData(fetcher) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSlow, setIsSlow] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let isMounted = true;

    const slowTimer = setTimeout(() => {
      if (isMounted) setIsSlow(true);
    }, SLOW_THRESHOLD_MS);

    fetcher()
      .then((result) => {
        if (isMounted) setData(result);
      })
      .catch((err) => {
        console.error(err);
        if (isMounted) setHasError(true);
      })
      .finally(() => {
        clearTimeout(slowTimer);
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
      clearTimeout(slowTimer);
    };
    // `fetcher` is always a stable top-level import (getHome, getAbout, ...);
    // `attempt` is the only thing that should re-trigger the fetch.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attempt]);

  // Resets happen here (an event handler), not synchronously inside the
  // effect body, so bumping `attempt` is the only thing the effect reacts to.
  const retry = useCallback(() => {
    setIsLoading(true);
    setIsSlow(false);
    setHasError(false);
    setAttempt((n) => n + 1);
  }, []);

  return { data, isLoading, isSlow, hasError, retry };
}
