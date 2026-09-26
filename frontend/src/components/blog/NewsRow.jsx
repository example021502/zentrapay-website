import { motion } from "framer-motion";
import ScrollableRow from "./ScrollableRow";
import { formatDate, imgPlaceholder } from "./blogUtils";

/**
 * Renders the `news` table:
 * id, title, slug, summary, content, cover_image_url,
 * author_name, is_published, published_at, created_at
 */
export default function NewsRow({ posts = [] }) {
  if (posts.length === 0) return null;

  return (
    <ScrollableRow
      title="Zentrapay News Hub"
      subtitle="Stay informed with the latest developments, features, and updates from Zentrapay."
      count={posts.length}
    >
      {posts.map((post, i) => (
        <motion.article
          key={post.id ?? i}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, type: "tween", delay: i * 0.1 }}
          whileHover={{ y: -8 }}
          className="card-hover group card-item snap-start shrink-0 w-[min(80vw,300px)]"
        >
          <div className="overflow-hidden aspect-video w-full h-40 bg-gray-100">
            <motion.img
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.4, type: "tween" }}
              src={post.cover_image_url || imgPlaceholder}
              onError={(e) => (e.currentTarget.src = imgPlaceholder)}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="py-2 px-4 flex flex-col grow text-left">
            <h3 className="text-lg font-bold text-gray-900 group-hover:text-brand-purple transition-colors line-clamp-2">
              {post.title}
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
              {post.summary}
            </p>

            <div className="flex items-center justify-between mt-auto pt-1 mt-4 border-t border-gray-100">
              <span className="badge-success">
                {formatDate(post.published_at || post.created_at)}
              </span>
              <span className="text-xs text-gray-500 font-medium truncate max-w-[120px]">
                {post.author_name}
              </span>
            </div>
          </div>
        </motion.article>
      ))}
    </ScrollableRow>
  );
}