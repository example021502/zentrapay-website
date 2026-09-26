export const imgPlaceholder = "https://placehold.net/600x600.png";

/** Pretty-print a date column (DATE or TIMESTAMP) for the card footers. */
export function formatDate(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * app_updates.changelog stores a single text block whose lines are separated
 * by a literal "\n" two-character sequence (not a real newline), so normalise
 * both cases before rendering it as a list.
 */
export function parseChangelog(changelog) {
  if (!changelog) return [];
  return String(changelog)
    .replace(/\\n/g, "\n")
    .split("\n")
    .map((line) => line.replace(/^[-*\s]+/, "").trim())
    .filter(Boolean);
}

/** "android" / "ios" / "all" -> a human label. */
export function formatPlatform(platform) {
  const value = String(platform || "").toLowerCase();
  if (value === "all" || value === "both") return "iOS & Android";
  if (value === "ios") return "iOS";
  if (value === "android") return "Android";
  return platform || "";
}