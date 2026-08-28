/**
 * Custom icon set for Marala Club.
 *
 * Drawn specifically for this site's subject matter — hockey, pickleball,
 * composite manufacturing and export — rather than borrowed from a generic
 * business icon pack. All are stroked on a 24x24 grid at 1.75 weight with
 * round caps and joins, so they sit consistently beside the lucide icons
 * still used for interface chrome (arrows, menu, close).
 *
 * Every icon inherits `currentColor`, so the accent-colour transitions on the
 * feature cards drive them without any extra wiring.
 */
import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement> & { className?: string };

function IconBase({ children, className, ...rest }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
      {...rest}
    >
      {children}
    </svg>
  );
}

/** Field hockey stick and ball — the "Pro Series" badge. */
export const HockeyStickIcon = (props: IconProps) => (
  <IconBase {...props}>
    <path d="M17.2 2.9 L11.4 13.4 C9.6 17 9.9 20 12.4 20.6 C15 21.2 17 19.6 16.9 17.2" />
    <circle cx="5.3" cy="18.2" r="2.8" />
  </IconBase>
);

/** Pickleball paddle and perforated ball — the "High-Performance" badge. */
export const PaddleIcon = (props: IconProps) => (
  <IconBase {...props}>
    <rect x="8.8" y="2.2" width="10.8" height="11.6" rx="3.1" />
    <rect x="12.8" y="13.8" width="2.8" height="7.6" rx="1.3" />
    <circle cx="4.6" cy="17.6" r="3.1" />
  </IconBase>
);

/** Forming press closing on a stick blank — "Vertical Mfg". */
export const PressIcon = (props: IconProps) => (
  <IconBase {...props}>
    <rect x="4.4" y="2.6" width="15.2" height="4" rx="1.3" />
    <path d="M6.8 6.6 V16.4" />
    <path d="M17.2 6.6 V16.4" />
    <rect x="7.8" y="10.6" width="8.4" height="2.8" rx="1.4" />
    <rect x="3.2" y="16.4" width="17.6" height="4.4" rx="1.3" />
    <path d="M10.6 8 L12 9.4 L13.4 8" />
  </IconBase>
);

/** Strapped crate heading out — "Export Ready". */
export const ExportIcon = (props: IconProps) => (
  <IconBase {...props}>
    <rect x="2.6" y="11.8" width="11.4" height="9.4" rx="1.6" />
    <path d="M2.6 15 H14" />
    <path d="M8.3 15 V21.2" />
    <path d="M13.4 13.4 L20.9 5.9" />
    <path d="M15.7 6.3 L21.1 5.7 L20.5 11.1" />
  </IconBase>
);

/** Honeycomb core, as used in composite paddles — "Innovation First". */
export const HoneycombIcon = (props: IconProps) => (
  <IconBase {...props}>
    <polygon points="12,2.15 15.94,4.43 15.94,8.98 12,11.25 8.06,8.98 8.06,4.43" />
    <polygon points="8.05,9 11.99,11.28 11.99,15.83 8.05,18.1 4.11,15.83 4.11,11.28" />
    <polygon points="15.95,9 19.89,11.28 19.89,15.83 15.95,18.1 12.01,15.83 12.01,11.28" />
  </IconBase>
);

/** Globe with the home plant marked — "Global Reach". */
export const GlobeMarkIcon = (props: IconProps) => (
  <IconBase {...props}>
    <circle cx="12" cy="12" r="9" />
    <ellipse cx="12" cy="12" rx="3.7" ry="9" />
    <path d="M3.4 12 H20.6" />
    <circle cx="12" cy="7.5" r="1.5" fill="currentColor" stroke="none" />
  </IconBase>
);
