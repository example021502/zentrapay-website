import { useEffect } from "react";
import { getBlog } from "../lib/api";
import { useApiData } from "../lib/useApiData";
import ConnectionNotice from "./ui/ConnectionNotice";
import { CardSkeletonGroup } from "./ui/Skeletons";
import ScrollableRow from "./blog/ScrollableRow";
import AppUpdatesRow from "./blog/AppUpdatesRow";
import AppTutorialsRow from "./blog/AppTutorialsRow";
import FintechTrendsRow from "./blog/FintechTrendsRow";
import NewsRow from "./blog/NewsRow";

export default function Blog() {
  // Failures are logged to the console only (see useApiData) - the UI falls
  // back to skeletons/a friendly notice instead of an error message.
  const { data, isLoading, isSlow, hasError, retry } = useApiData(getBlog);

  // The /blog endpoint returns four independent tables with four different
  // column sets, so each row below is rendered by its own component rather
  // than one generic section that assumes a shared shape.
  const appUpdates = data?.app_updates || [];
  const appTutorials = data?.app_tutorials || [];
  const fintechTrends = data?.fintech_trends || [];
  const news = data?.news || [];

  useEffect(() => {
    return () => localStorage.removeItem("draftForm");
  }, []);

  if (isLoading) {
    return (
      <div className="w-full py-16 px-6 bg-gray-50 flex flex-col justify-center items-center space-y-20">
        <CardSkeletonGroup
          count={3}
          className="w-full max-w-7xl flex gap-6 overflow-hidden"
        />
        {isSlow && <ConnectionNotice className="mt-2" />}
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="w-full py-16 px-6 bg-gray-50 flex flex-col justify-center items-center">
        <ConnectionNotice onRetry={retry} />
      </div>
    );
  }

  return (
    <div className="w-full sm:py-8 px-4 py-4 bg-primary flex flex-col justify-center items-center space-y-10">
      {/* {isLoading && } */}
      <AppUpdatesRow updates={appUpdates} />
      <AppTutorialsRow tutorials={appTutorials} />
      <FintechTrendsRow trends={fintechTrends} />
      <NewsRow posts={news} />

      {!appUpdates.length &&
        !appTutorials.length &&
        !fintechTrends.length &&
        !news.length && (
          <p className="text-gray-500 text-sm">No blog content published yet.</p>
        )}
    </div>
  );
}
