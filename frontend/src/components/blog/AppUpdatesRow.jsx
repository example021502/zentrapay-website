import { motion } from "framer-motion";
import ScrollableRow from "./ScrollableRow";
import { formatDate, formatPlatform, parseChangelog } from "./blogUtils";

const platformStyles = {
  ios: "bg-secondary/60 text-primary",
  android: "bg-primary text-green",
  all: "bg-main/60 text-primary",
};

/**
 * Renders the `app_updates` table:
 * id, version_number, title, summary, changelog, platform,
 * is_major_update, released_at, created_at
 *
 * There is no image column, so the top of the card is a version banner
 * instead of a photo.
 */
export default function AppUpdatesRow({ updates = [] }) {
  if (updates.length === 0) return null;

  return (
    <ScrollableRow
      title="App Updates"
      subtitle="Stay up-to-date with the latest features and improvements."
      count={updates.length}
    >
      {updates.map((update, i) => {
        const platformKey = String(update.platform || "all").toLowerCase();
        const changes = parseChangelog(update.changelog);

        return (
          <motion.article
            key={update.id ?? i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, type: "tween", delay: i * 0.1 }}
            whileHover={{ y: -8 }}
            className="card-hover group card-item snap-start shrink-0 w-[min(80vw,300px)]"
          >
            {/* Version banner stands in for the missing image_url column */}
            <div className="bg-linear-to-br from-main to-brand-purple-light p-4 text-white">
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-2xl font-extrabold tracking-tight">
                  {update.version_number}
                </span>
                {update.is_major_update && (
                  <span className="text-[10px] font-bold uppercase tracking-wide bg-white/20 px-2 py-1 rounded-full">
                    Major
                  </span>
                )}
              </div>
              <span
                className={`inline-block shadow-xl text-xs font-semibold px-2.5 py-1 rounded-full ${platformStyles[platformKey] || "bg-secondary/60"}`}
              >
                {formatPlatform(update.platform)}
              </span>
            </div>

            <div className="px-4 py-3 flex flex-col grow text-left">
              <h3 className="text-lg font-bold text-grey-md group-hover:text-brand-purple transition-colors mb-1 line-clamp-2">
                {update.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-2">
                {update.summary}
              </p>

              {changes.length > 0 && (
                <ul className="">
                  {changes.map((change, c) => (
                    <li
                      key={c}
                      className="text-xs text-gray-500 leading-relaxed flex gap-2"
                    >
                      <span className="text-brand-purple shrink-0">•</span>
                      <span className="line-clamp-2">{change}</span>
                    </li>
                  ))}
                </ul>
              )}

              <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                <span className="badge-success">
                  {formatDate(update.released_at || update.created_at)}
                </span>
                <span className="text-xs font-semibold text-brand-purple group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  Read more &rarr;
                </span>
              </div>
            </div>
          </motion.article>
        );
      })}
    </ScrollableRow>
  );
}