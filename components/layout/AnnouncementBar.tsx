import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function AnnouncementBar() {
  return (
    <div
      className="flex items-center justify-center gap-2 py-1.5 text-center"
      style={{
        backgroundColor: "var(--color-banner-bg)",
        color: "var(--color-banner-text)",
        fontFamily: "var(--font-body)",
        fontWeight: "var(--weight-medium)",
        fontSize: "var(--text-banner)",
        lineHeight: "var(--leading-banner)",
      }}
    >
      <Link
        href="/#precios"
        className="inline-flex items-center justify-center gap-1.5 transition-opacity hover:opacity-90"
      >
        <span>Limited Time Offer: 50% Off Your First 3 Months</span>
        <ChevronRight className="size-4 shrink-0" aria-hidden />
      </Link>
    </div>
  );
}
