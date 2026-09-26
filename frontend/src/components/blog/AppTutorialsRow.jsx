import { motion } from "framer-motion";
import ScrollableRow from "./ScrollableRow";
import { formatDate } from "./blogUtils";

/**
 * Renders the `app_tutorials` table:
 * id, category, title, summary, explanation, created_at, updated_at
 *
 * No image column here either, so the card leads with its category tag.
 */
export default function AppTutorialsRow({ tutorials = [] }) {
  if (tutorials.length === 0) return null;

  return (
    <ScrollableRow
      title="Mastering ZWallet"
      subtitle="Your go-to resource for unlocking the full potential of ZWallet and its features."
      count={tutorials.length}
    >
      {tutorials.map((tutorial, i) => (
        <motion.article
          key={tutorial.id ?? i}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, type: "tween", delay: i * 0.1 }}
          whileHover={{ y: -8 }}
          className="card-hover group card-item snap-start shrink-0 w-[min(80vw,300px)]"
        >
          {/* No aspect ratio here: the banner is sized by its own content,
              matching the version banner in AppUpdatesRow. */}
          <div className="bg-linear-to-br from-main to-brand-purple-light p-4 text-white">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] leading-2 px-4 py-1 bg-secondary shadow-xl rounded-full font-normal tracking-widest text-primary">
                Tutorial
              </span>
            </div>
            <span className="text-lg font-bold text-white line-clamp-2">
              {tutorial.category}
            </span>
          </div>

          <div className="px-4 py-3 flex flex-col grow text-left">
            <h3 className="text-lg font-bold text-gray-900 group-hover:text-brand-purple transition-colors mb-1 line-clamp-2">
              {tutorial.title}
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed mb-1 line-clamp-2">
              {tutorial.summary}
            </p>
            <p className="text-xs text-gray-500 leading-relaxed mb-1 line-clamp-2">
              {tutorial.explanation}
            </p>
            <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
              <span className="badge-success">
                {formatDate(tutorial.updated_at || tutorial.created_at)}
              </span>
              <span className="text-xs font-semibold text-brand-purple group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                Start learning &rarr;
              </span>
            </div>
          </div>
        </motion.article>
      ))}
    </ScrollableRow>
  );
}