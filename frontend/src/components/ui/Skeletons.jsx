import {
  RectShape,
  RoundShape,
  TextRow,
} from "react-placeholder/lib/placeholders";
import "react-placeholder/lib/reactPlaceholder.css";

// Tailwind's gray-200, kept as a plain hex since these components take a
// `color` prop rather than a className for their fill.
const COLOR = "#e5e7eb";
const PULSE = "animate-pulse";

/** One image-card-with-text skeleton, sized to match the real content cards. */
export function CardSkeleton({ widthClass = "w-[320px] sm:w-[350px]" }) {
  return (
    <div
      className={`shrink-0 ${widthClass} rounded-xl overflow-hidden border border-gray-100 bg-white`}
    >
      <div className="aspect-video w-full bg-gray-100">
        <RectShape color={COLOR} className={PULSE} />
      </div>
      <div className="p-6 flex flex-col gap-3">
        <TextRow color={COLOR} className={`${PULSE} rounded`} style={{ width: "70%", height: "1.1em" }} />
        <TextRow color={COLOR} className={`${PULSE} rounded`} style={{ width: "100%" }} />
        <TextRow color={COLOR} className={`${PULSE} rounded`} style={{ width: "85%" }} />
      </div>
    </div>
  );
}

/** A row/grid of CardSkeletons — for card grids and horizontal-scroll rows alike. */
export function CardSkeletonGroup({
  count = 3,
  widthClass,
  className = "flex gap-6 overflow-hidden",
}) {
  return (
    <div className={className}>
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} widthClass={widthClass} />
      ))}
    </div>
  );
}

/** A checklist line: round bullet + a line of text (device features, etc). */
export function ChecklistSkeleton({ count = 4 }) {
  return (
    <div className="space-y-6 w-full">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex gap-4 items-start">
          <div className="w-8 h-8 shrink-0">
            <RoundShape color={COLOR} className={PULSE} />
          </div>
          <div className="flex-1 pt-1.5">
            <TextRow
              color={COLOR}
              className={`${PULSE} rounded`}
              style={{ width: `${85 - i * 8}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

/** A single quoted testimonial block with an avatar strip beneath it. */
export function TestimonialSkeleton() {
  return (
    <div className="w-full flex flex-col items-center gap-6">
      <div className="w-full p-4 rounded-lg bg-secondary/10 flex flex-col items-center gap-3">
        <TextRow color={COLOR} className={`${PULSE} rounded`} style={{ width: "90%" }} />
        <TextRow color={COLOR} className={`${PULSE} rounded`} style={{ width: "75%" }} />
        <TextRow color={COLOR} className={`${PULSE} rounded`} style={{ width: "60%" }} />
        <div className="w-10 h-10 mt-4">
          <RoundShape color={COLOR} className={PULSE} />
        </div>
      </div>
      <div className="flex flex-row gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="w-8 h-8">
            <RoundShape color={COLOR} className={PULSE} />
          </div>
        ))}
      </div>
    </div>
  );
}

/** A labelled info row: round icon + two short lines (contact details, etc). */
export function InfoRowSkeleton({ count = 3 }) {
  return (
    <div className="flex flex-col gap-6 w-full">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex items-start gap-4">
          <div className="w-11 h-11 shrink-0">
            <RoundShape color={COLOR} className={PULSE} />
          </div>
          <div className="flex-1 flex flex-col gap-2 pt-1">
            <TextRow color={COLOR} className={`${PULSE} rounded`} style={{ width: "40%", height: "0.9em" }} />
            <TextRow color={COLOR} className={`${PULSE} rounded`} style={{ width: "70%" }} />
          </div>
        </div>
      ))}
    </div>
  );
}
