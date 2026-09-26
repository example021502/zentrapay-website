import { motion } from "framer-motion";
import ScrollableRow from "./ScrollableRow";
import { formatDate, imgPlaceholder } from "./blogUtils";

/**
 * Renders the `fintech_trends` table:
 * id, title, topic, summary, content, cover_image_url,
 * read_time_minutes, is_featured, published_at, created_at
 */
export default function FintechTrendsRow({ trends = [] }) {
  if (trends.length === 0) return null;

  return (
    <ScrollableRow
      title="Fintech Trends Uncovered"
      subtitle="Explore the latest trends and insights shaping the future of fintech and payments."
      count={trends.length}
    >
      {trends.map((trend, i) => (
        <motion.article
          key={trend.id ?? i}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, type: "tween", delay: i * 0.1 }}
          whileHover={{ y: -8 }}
          className="card-hover group card-item snap-start shrink-0 w-[min(80vw,300px)]"
        >
          {/* Compact banner instead of a full aspect-video block: the photo is
              cropped to a short band so the card keeps the same compact rhythm
              as AppUpdatesRow. */}
          <div className="relative shrink-0 w-full h-40 overflow-hidden bg-gray-100">
            <motion.img
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.4, type: "tween" }}
              src={trend.cover_image_url || imgPlaceholder}
              onError={(e) => (e.currentTarget.src = imgPlaceholder)}
              alt={trend.title}
              className="w-full h-full object-cover"
            />
            {trend.is_featured && (
              <span className="absolute top-2 left-2 text-[10px] font-bold uppercase tracking-wide bg-brand-purple text-white px-2 py-1 rounded-full">
                Featured
              </span>
            )}
            <span className="absolute bottom-2 left-2 text-[10px] font-semibold px-2 py-1 rounded-full bg-white/90 text-brand-purple shadow-sm">
              {trend.topic}
            </span>
          </div>

          <div className="px-4 py-3 flex flex-col grow text-left">
            <h3 className="text-lg font-bold text-gray-900 group-hover:text-brand-purple transition-colors mb-1 line-clamp-2">
              {trend.title}
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed mb-2 line-clamp-3">
              {trend.summary}
            </p>

            <div className="flex items-center justify-between mt-auto pt-1 border-t border-gray-100">
              <span className="badge-success">
                {formatDate(trend.published_at || trend.created_at)}
              </span>
              {trend.read_time_minutes ? (
                <span className="text-xs text-gray-500 font-medium">
                  {trend.read_time_minutes} min read
                </span>
              ) : (
                <span className="text-xs font-semibold text-brand-purple group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  Read more &rarr;
                </span>
              )}
            </div>
          </div>
        </motion.article>
      ))}
    </ScrollableRow>
  );
}