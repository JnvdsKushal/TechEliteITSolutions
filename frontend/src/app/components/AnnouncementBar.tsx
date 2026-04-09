// src/components/AnnouncementBar.tsx
import { useState, useEffect, useRef } from 'react';
import { X, Megaphone, ChevronRight } from 'lucide-react';

interface Announcement {
  id: number;
  text: string;
  link?: string;
  link_label?: string;
  badge?: string;
  badge_color: 'blue' | 'green' | 'orange' | 'red' | 'purple';
  is_active: boolean;
  order: number;
}

const BADGE_STYLES: Record<string, string> = {
  blue:   'bg-blue-100 text-blue-700 border-blue-200',
  green:  'bg-emerald-100 text-emerald-700 border-emerald-200',
  orange: 'bg-orange-100 text-orange-700 border-orange-200',
  red:    'bg-rose-100 text-rose-700 border-rose-200',
  purple: 'bg-violet-100 text-violet-700 border-violet-200',
};

// Fallback items shown if API is unavailable
const FALLBACK: Announcement[] = [
  { id: 1, text: 'New batch starting for Cyber Security — limited seats available!', badge: 'New Batch', badge_color: 'blue',   is_active: true, order: 1 },
  { id: 2, text: 'Free demo class every Saturday at 10 AM — register now.',         badge: 'Free Demo', badge_color: 'green',  is_active: true, order: 2 },
  { id: 3, text: 'AWS & Azure certifications — early bird discount ends soon.',      badge: 'Offer',     badge_color: 'orange', is_active: true, order: 3 },
];

export function AnnouncementBar() {
  const [items, setItems]       = useState<Announcement[]>([]);
  const [dismissed, setDismissed] = useState(false);
  const [paused, setPaused]     = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('/api/announcements/?active=true')
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        const list: Announcement[] = Array.isArray(data)
          ? data
          : data?.results ?? [];
        setItems(list.length > 0 ? list : FALLBACK);
      })
      .catch(() => setItems(FALLBACK));
  }, []);

  if (dismissed || items.length === 0) return null;

  // Duplicate items so the scroll feels seamless
  const repeated = [...items, ...items, ...items];

  return (
    <div
      className="relative z-40 w-full overflow-hidden"
      style={{
        background: 'linear-gradient(90deg, #1e40af 0%, #2563eb 40%, #3b82f6 70%, #1d4ed8 100%)',
        height: 40,
      }}
    >
      {/* Subtle shimmer overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 50%, transparent 100%)',
          animation: 'shimmerBar 3s ease-in-out infinite',
        }}
      />

      <style>{`
        @keyframes shimmerBar {
          0%,100% { opacity: 0.4; }
          50%      { opacity: 1; }
        }
        @keyframes scrollTrack {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .announcement-track {
          display: flex;
          align-items: center;
          width: max-content;
          animation: scrollTrack ${items.length * 8}s linear infinite;
          animation-play-state: running;
        }
        .announcement-track.paused {
          animation-play-state: paused;
        }
      `}</style>

      {/* Left megaphone badge */}
      <div className="absolute left-0 top-0 bottom-0 z-10 flex items-center pl-3 pr-4"
        style={{ background: 'linear-gradient(90deg, #1e3a8a 80%, transparent)' }}>
        <div className="flex items-center gap-1.5 text-white/90">
          <Megaphone size={13} strokeWidth={2.5} />
          <span className="text-[10px] font-bold uppercase tracking-widest hidden sm:block">
            News
          </span>
        </div>
        {/* Divider */}
        <div className="ml-3 w-px h-4 bg-white/20" />
      </div>

      {/* Scrolling track */}
      <div
        className="flex items-center h-full pl-24 pr-14"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        style={{ overflow: 'hidden' }}
      >
        <div
          ref={trackRef}
          className={`announcement-track${paused ? ' paused' : ''}`}
        >
          {repeated.map((item, i) => (
            <span key={`${item.id}-${i}`} className="flex items-center gap-3 pr-16 shrink-0">
              {/* Badge */}
              {item.badge && (
                <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${BADGE_STYLES[item.badge_color] ?? BADGE_STYLES.blue} shrink-0`}>
                  {item.badge}
                </span>
              )}

              {/* Text */}
              <span className="text-white/90 text-xs font-medium whitespace-nowrap">
                {item.text}
              </span>

              {/* Optional link */}
              {item.link && (
                <a
                  href={item.link}
                  className="flex items-center gap-0.5 text-[10px] font-bold text-white underline underline-offset-2 decoration-white/50 hover:text-white hover:decoration-white transition-colors shrink-0"
                  target={item.link.startsWith('http') ? '_blank' : '_self'}
                  rel="noreferrer"
                  onClick={e => e.stopPropagation()}
                >
                  {item.link_label ?? 'Learn more'}
                  <ChevronRight size={10} />
                </a>
              )}

              {/* Dot separator */}
              <span className="text-white/25 text-lg leading-none select-none">·</span>
            </span>
          ))}
        </div>
      </div>

      {/* Right fade + dismiss button */}
      <div className="absolute right-0 top-0 bottom-0 flex items-center pr-2 pl-8"
        style={{ background: 'linear-gradient(270deg, #1d4ed8 60%, transparent)' }}>
        <button
          onClick={() => setDismissed(true)}
          className="text-white/60 hover:text-white transition-colors p-1 rounded"
          aria-label="Dismiss announcement bar"
        >
          <X size={13} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}