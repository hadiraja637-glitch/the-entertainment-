import React from 'react';
import { ExternalLink, Sparkles } from 'lucide-react';

/**
 * =========================================================================
 * MONETAG MONETIZATION PLACEHOLDER CONFIGURATION
 * =========================================================================
 * To enable this sponsored placement, the publisher should insert their
 * verified Monetag SmartLink URL into the `CONFIGURED_SMART_LINK` constant below.
 *
 * Example:
 * const CONFIGURED_SMART_LINK: string | null = "https://your-verified-smartlink-url.com";
 *
 * Default: null (DISABLED).
 * When null or empty string, this component renders NOTHING, preventing dead links
 * or unverified ad scripts.
 * =========================================================================
 */
const CONFIGURED_SMART_LINK: string = '';

interface SponsoredPlacementProps {
  className?: string;
  variant?: 'banner' | 'card' | 'inline';
}

export const SponsoredPlacement: React.FC<SponsoredPlacementProps> = ({
  className = '',
  variant = 'card'
}) => {
  // If no verified link is configured, gracefully return null
  if (!CONFIGURED_SMART_LINK || !CONFIGURED_SMART_LINK.trim()) {
    return null;
  }

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Only opened upon explicit deliberate user click
    if (!window.confirm("You are opening an external sponsored partner offer. Continue?")) {
      e.preventDefault();
    }
  };

  if (variant === 'banner') {
    return (
      <aside 
        aria-label="Sponsored advertisement"
        className={`w-full max-w-4xl mx-auto my-6 p-4 rounded-xl border border-dashed border-amber-500/30 bg-amber-500/5 text-amber-200/90 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm ${className}`}
      >
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 text-xs font-semibold uppercase tracking-wider rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
            Sponsored
          </span>
          <p className="text-slate-300">Curated external recommendations & offers</p>
        </div>
        <a
          href={CONFIGURED_SMART_LINK}
          target="_blank"
          rel="noopener noreferrer sponsored"
          onClick={handleClick}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-500/40 transition-colors"
        >
          <span>Explore sponsored offer</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </aside>
    );
  }

  return (
    <div 
      role="complementary"
      aria-label="Sponsored advertisement"
      className={`rounded-2xl border border-dashed border-amber-500/30 bg-[#141b2d]/80 p-5 text-center relative ${className}`}
    >
      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30 mb-3">
        <Sparkles className="w-3 h-3 text-amber-400" />
        <span>Sponsored</span>
      </div>
      <p className="text-xs text-slate-400 mb-4 max-w-sm mx-auto">
        Support The Entertainment playground by exploring partner offers.
      </p>
      <a
        href={CONFIGURED_SMART_LINK}
        target="_blank"
        rel="noopener noreferrer sponsored"
        onClick={handleClick}
        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-medium rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-500/40 transition-all hover:scale-[1.02]"
      >
        <span>Explore sponsored offer</span>
        <ExternalLink className="w-3.5 h-3.5" />
      </a>
    </div>
  );
};
