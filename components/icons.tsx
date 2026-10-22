import type { CSSProperties } from "react";

type P = { style?: CSSProperties };

const Svg = ({ children, style }: P & { children: React.ReactNode }) => (
  <svg className="ic" viewBox="0 0 24 24" style={style} aria-hidden="true">{children}</svg>
);

export const ArrowUR = ({ style }: P) => <Svg style={style}><path d="M7 17L17 7M8 7h9v9" /></Svg>;
export const Chevron = ({ style }: P) => <Svg style={style}><path d="M7 10l5 5 5-5" /></Svg>;
export const Comment = ({ style }: P) => <Svg style={style}><path d="M20 12a8 8 0 0 1-11.6 7.1L4 20l1-4A8 8 0 1 1 20 12z" /></Svg>;
export const Clock = ({ style }: P) => <Svg style={style}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></Svg>;
export const Eye = ({ style }: P) => <Svg style={style}><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" /></Svg>;
export const Menu = ({ style }: P) => <Svg style={style}><path d="M3 6h18M3 12h18M3 18h18" /></Svg>;
export const ArrowRight = ({ style }: P) => <Svg style={style}><path d="M4 12h16M14 6l6 6-6 6" /></Svg>;
export const Headphones = ({ style }: P) => (
  <Svg style={style}><path d="M4 15v-3a8 8 0 0 1 16 0v3" /><path d="M4 15a2 2 0 0 1 2-2h1v7H6a2 2 0 0 1-2-2zM20 15a2 2 0 0 0-2-2h-1v7h1a2 2 0 0 0 2-2z" /></Svg>
);
export const Doc = ({ style }: P) => <Svg style={style}><rect x="8" y="3" width="12" height="15" rx="2" /><path d="M16 21H6a2 2 0 0 1-2-2V7" /></Svg>;
export const People = ({ style }: P) => <Svg style={style}><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6 6 0 0 1 3.5 6" /></Svg>;
export const Views = ({ style }: P) => <Svg style={style}><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="3" fill="currentColor" /></Svg>;
export const Up = ({ style }: P) => <Svg style={style}><path d="M12 19V5M6 11l6-6 6 6" /></Svg>;

export const Play = ({ size = 18 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true"><path d="M8 5.5v13l11-6.5z" fill="currentColor" /></svg>
);
export const PlaySm = ({ size = 15 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true"><path d="M7 5v14l12-7z" fill="currentColor" /></svg>
);

export const Instagram = ({ style }: P) => (
  <Svg style={style}><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".6" fill="currentColor" /></Svg>
);
export const YouTubeOutline = ({ style }: P) => <Svg style={style}><rect x="2" y="5" width="20" height="14" rx="4.5" /><path d="M10 9v6l5-3z" /></Svg>;
export const YouTubeSolid = () => (
  <svg viewBox="0 0 24 24" width="34" height="34" aria-hidden="true"><rect x="2" y="5" width="20" height="14" rx="4.5" fill="currentColor" /><path d="M10 9v6l5-3z" fill="#fff" /></svg>
);
export const TikTok = ({ style }: P) => <Svg style={style}><path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5" /><path d="M14 3c.4 2.6 2.2 4.4 5 4.6" /></Svg>;
export const XIcon = ({ style }: P) => <Svg style={style}><path d="M4 4l16 16M20 4L4 20" /></Svg>;
export const Share = ({ style }: P) => (
  <Svg style={style}><circle cx="18" cy="5" r="2.5" /><circle cx="6" cy="12" r="2.5" /><circle cx="18" cy="19" r="2.5" /><path d="M8.2 10.8l7.6-4.4M8.2 13.2l7.6 4.4" /></Svg>
);
export const Fire = ({ color }: { color: string }) => (
  <svg viewBox="0 0 24 24" width="22" height="22" role="img" aria-label="Trending">
    <path d="M12 22c4 0 7-2.7 7-6.8 0-3.6-2.4-5.6-4-8.2-.6 2-1.6 3-2.8 3.4C12.6 7 11 4.4 8.5 2 8.8 6 5 8.7 5 14.7 5 19 8 22 12 22z" fill={color} />
  </svg>
);
