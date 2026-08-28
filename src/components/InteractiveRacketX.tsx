import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  Field hockey stick                                                 */
/* ------------------------------------------------------------------ */

// Silhouette of a 36.5" composite stick: tapering shaft dropping into a
// hook, with the toe rounded off. Outer arc right, inner arc left.
const STICK_OUTLINE =
  "M128 36 L128 570 C128 700 110 780 40 800 C24 804 12 794 12 778 C12 764 22 756 38 752 C66 740 92 706 92 560 L92 36 C92 22 100 16 110 16 C120 16 128 22 128 36 Z";

function HockeyStick() {
  return (
    <svg viewBox="0 0 220 860" className="h-full w-full" aria-hidden="true">
      <defs>
        {/* Cross-section shading: dark edge, mid, specular peak, falloff. */}
        <linearGradient id="hkBody" x1="92" y1="0" x2="128" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#02050A" />
          <stop offset="8%" stopColor="#0A1220" />
          <stop offset="24%" stopColor="#1B2F4B" />
          <stop offset="38%" stopColor="#3A5D87" />
          <stop offset="46%" stopColor="#6D92BC" />
          <stop offset="56%" stopColor="#28405F" />
          <stop offset="74%" stopColor="#111C2E" />
          <stop offset="90%" stopColor="#070C15" />
          <stop offset="100%" stopColor="#010308" />
        </linearGradient>

        {/* The hook sits lower and catches less light. */}
        <linearGradient id="hkHead" x1="0" y1="820" x2="120" y2="700" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#01030A" />
          <stop offset="45%" stopColor="#132339" />
          <stop offset="72%" stopColor="#2C4A6E" />
          <stop offset="100%" stopColor="#050B14" />
        </linearGradient>

        <linearGradient id="hkGloss" x1="0" y1="30" x2="0" y2="700" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
          <stop offset="14%" stopColor="#FFFFFF" stopOpacity="0.55" />
          <stop offset="46%" stopColor="#FFFFFF" stopOpacity="0.20" />
          <stop offset="78%" stopColor="#FFFFFF" stopOpacity="0.07" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>

        {/* Carbon twill: a checker at 45deg reads as woven tow at this scale. */}
        <pattern
          id="hkTwill"
          width="11"
          height="11"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <rect width="11" height="11" fill="#0D1826" />
          <rect width="5.5" height="5.5" fill="#1A2B42" />
          <rect x="5.5" y="5.5" width="5.5" height="5.5" fill="#1A2B42" />
          <line x1="0" y1="5.5" x2="11" y2="5.5" stroke="#05090F" strokeWidth="0.5" opacity="0.7" />
        </pattern>

        {/* Chamois grip: spiral windings, each with a groove and a lit edge. */}
        <linearGradient id="hkBand" x1="0" y1="0" x2="0" y2="21" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#20252C" />
          <stop offset="30%" stopColor="#39424E" />
          <stop offset="58%" stopColor="#252B34" />
          <stop offset="100%" stopColor="#12151A" />
        </linearGradient>
        <pattern
          id="hkGrip"
          width="21"
          height="21"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(-26)"
        >
          <rect width="21" height="21" fill="url(#hkBand)" />
          <rect width="21" height="1.7" fill="#000000" opacity="0.6" />
          <rect y="1.7" width="21" height="0.9" fill="#FFFFFF" opacity="0.14" />
        </pattern>

        <clipPath id="hkClip">
          <path d={STICK_OUTLINE} />
        </clipPath>
        <clipPath id="hkGripClip">
          <path d="M92 36 L128 36 L128 300 L92 300 Z" />
        </clipPath>

        <filter id="hkShadow" x="-60%" y="-30%" width="220%" height="180%">
          <feDropShadow dx="16" dy="26" stdDeviation="20" floodColor="#0B1F3A" floodOpacity="0.30" />
        </filter>
      </defs>

      <g filter="url(#hkShadow)">
        {/* base body */}
        <path d={STICK_OUTLINE} fill="url(#hkBody)" />

        <g clipPath="url(#hkClip)">
          {/* woven carbon under the lacquer */}
          <rect width="220" height="860" fill="url(#hkTwill)" opacity="0.55" />
          {/* re-lay the cross-section shading over the weave */}
          <rect width="220" height="860" fill="url(#hkBody)" opacity="0.72" />
          {/* the hook reads darker than the shaft */}
          <path
            d="M92 540 L128 540 L128 860 L0 860 L0 720 Z"
            fill="url(#hkHead)"
            opacity="0.85"
          />

          {/* lengthwise specular */}
          <rect x="103" y="30" width="7" height="680" fill="url(#hkGloss)" />
          <rect x="99" y="30" width="3" height="680" fill="#FFFFFF" opacity="0.10" />

          {/* lacquer sheen wrapping the hook */}
          <path
            d="M118 600 C118 706 100 768 40 788 L34 764 C86 744 104 692 104 596 Z"
            fill="#FFFFFF"
            opacity="0.13"
          />

          {/* grip wrap */}
          <g clipPath="url(#hkGripClip)">
            <rect x="92" y="36" width="36" height="264" fill="#15181D" />
            <rect x="92" y="36" width="36" height="264" fill="url(#hkGrip)" />
            {/* rounded shading across the grip */}
            <rect x="92" y="36" width="8" height="264" fill="#000000" opacity="0.45" />
            <rect x="120" y="36" width="8" height="264" fill="#000000" opacity="0.5" />
            <rect x="105" y="36" width="4" height="264" fill="#FFFFFF" opacity="0.12" />
          </g>
          {/* grip termination tape */}
          <rect x="92" y="296" width="36" height="7" fill="#A3E635" />
          <rect x="92" y="303" width="36" height="2" fill="#000000" opacity="0.4" />

          {/* decals */}
          <rect x="92" y="352" width="36" height="3" fill="#A3E635" opacity="0.9" />
          <rect x="92" y="360" width="36" height="1.5" fill="#F97316" opacity="0.85" />
          <text
            x="110"
            y="470"
            fill="#F7FAFC"
            opacity="0.55"
            fontSize="17"
            fontWeight="700"
            letterSpacing="9"
            textAnchor="middle"
            transform="rotate(90 110 470)"
            style={{ fontFamily: "Oswald, sans-serif" }}
          >
            MARALA
          </text>
          <text
            x="110"
            y="632"
            fill="#A3E635"
            fontSize="9"
            fontWeight="600"
            letterSpacing="4"
            textAnchor="middle"
            transform="rotate(90 110 632)"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            90 CARBON
          </text>
          {/* toe flash */}
          <path d="M12 778 C12 764 22 756 38 752 L44 774 C28 778 22 784 24 796 Z" fill="#F97316" />
        </g>

        {/* ambient occlusion along the silhouette + crisp edge light */}
        <path d={STICK_OUTLINE} fill="none" stroke="#000000" strokeWidth="2.4" opacity="0.55" />
        <path
          d="M92 36 L92 560 C92 706 66 740 38 752"
          fill="none"
          stroke="#8FB4DC"
          strokeWidth="1.4"
          opacity="0.45"
        />
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Pickleball paddle                                                  */
/* ------------------------------------------------------------------ */

// Inset from the viewBox edge so the 13px edge guard and the cast shadow
// both have room before the SVG viewport clips them.
const PADDLE_FACE =
  "M48 34 L252 34 C274 34 288 52 288 76 L288 486 C288 512 272 528 248 532 L52 532 C28 528 12 512 12 486 L12 76 C12 52 26 34 48 34 Z";

function PickleballPaddle() {
  return (
    <svg viewBox="0 0 300 860" className="h-full w-full" aria-hidden="true">
      <defs>
        {/* Raw T700 carbon: matte, cool, lit from the upper left. */}
        <linearGradient id="pbFace" x1="20" y1="40" x2="290" y2="520" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#39434F" />
          <stop offset="30%" stopColor="#252D38" />
          <stop offset="62%" stopColor="#171D25" />
          <stop offset="100%" stopColor="#0C1017" />
        </linearGradient>

        <linearGradient id="pbGuard" x1="0" y1="30" x2="300" y2="540" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1E2733" />
          <stop offset="24%" stopColor="#0B1F3A" />
          <stop offset="52%" stopColor="#050A12" />
          <stop offset="78%" stopColor="#132234" />
          <stop offset="100%" stopColor="#02050A" />
        </linearGradient>

        <pattern
          id="pbTwill"
          width="13"
          height="13"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <rect width="13" height="13" fill="#1B222B" />
          <rect width="6.5" height="6.5" fill="#28313C" />
          <rect x="6.5" y="6.5" width="6.5" height="6.5" fill="#28313C" />
          <line x1="0" y1="6.5" x2="13" y2="6.5" stroke="#10151B" strokeWidth="0.7" opacity="0.8" />
          <line x1="6.5" y1="0" x2="6.5" y2="13" stroke="#10151B" strokeWidth="0.7" opacity="0.5" />
        </pattern>

        <linearGradient id="pbHandle" x1="119" y1="0" x2="181" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#04070C" />
          <stop offset="22%" stopColor="#1A1F27" />
          <stop offset="44%" stopColor="#333B46" />
          <stop offset="58%" stopColor="#1D232B" />
          <stop offset="82%" stopColor="#0A0E14" />
          <stop offset="100%" stopColor="#020408" />
        </linearGradient>

        <linearGradient id="pbBand" x1="0" y1="0" x2="0" y2="19" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1C212A" />
          <stop offset="32%" stopColor="#333B47" />
          <stop offset="60%" stopColor="#20262F" />
          <stop offset="100%" stopColor="#0E1116" />
        </linearGradient>
        <pattern
          id="pbGrip"
          width="19"
          height="19"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(-30)"
        >
          <rect width="19" height="19" fill="url(#pbBand)" />
          <rect width="19" height="1.6" fill="#000000" opacity="0.62" />
          <rect y="1.6" width="19" height="0.8" fill="#FFFFFF" opacity="0.15" />
          <circle cx="9.5" cy="10" r="1.1" fill="#000000" opacity="0.35" />
        </pattern>

        <clipPath id="pbFaceClip">
          <path d={PADDLE_FACE} />
        </clipPath>
        <clipPath id="pbHandleClip">
          <path d="M119 560 L181 560 L181 790 L119 790 Z" />
        </clipPath>

        <filter id="pbShadow" x="-50%" y="-25%" width="200%" height="160%">
          <feDropShadow dx="16" dy="26" stdDeviation="20" floodColor="#0B1F3A" floodOpacity="0.30" />
        </filter>
      </defs>

      <g filter="url(#pbShadow)">
        {/* handle core, drawn first so the throat overlaps it */}
        <path
          d="M119 548 L181 548 L181 786 C181 800 172 810 158 812 L142 812 C128 810 119 800 119 786 Z"
          fill="url(#pbHandle)"
        />
        <g clipPath="url(#pbHandleClip)">
          <rect x="119" y="560" width="62" height="230" fill="url(#pbGrip)" />
          {/* rounded shading across the wrap */}
          <rect x="119" y="560" width="13" height="230" fill="#000000" opacity="0.5" />
          <rect x="169" y="560" width="12" height="230" fill="#000000" opacity="0.55" />
          <rect x="140" y="560" width="6" height="230" fill="#FFFFFF" opacity="0.13" />
        </g>
        {/* butt cap */}
        <path
          d="M113 782 L187 782 L187 812 C187 828 176 838 158 840 L142 840 C124 838 113 828 113 812 Z"
          fill="#0A0E14"
        />
        <path d="M113 782 L187 782 L187 790 L113 790 Z" fill="#F97316" opacity="0.9" />
        <ellipse cx="150" cy="818" rx="17" ry="11" fill="#151A21" />
        <ellipse
          cx="150"
          cy="816"
          rx="17"
          ry="11"
          fill="none"
          stroke="#3A4756"
          strokeWidth="1.2"
          opacity="0.7"
        />

        {/* throat flowing out of the face */}
        <path
          d="M104 470 C112 520 118 542 119 566 L181 566 C182 542 188 520 196 470 Z"
          fill="url(#pbGuard)"
        />
        <path
          d="M104 470 C112 520 118 542 119 566 L134 566 C132 540 126 516 118 470 Z"
          fill="#FFFFFF"
          opacity="0.07"
        />

        {/* face */}
        <path d={PADDLE_FACE} fill="url(#pbFace)" />
        <g clipPath="url(#pbFaceClip)">
          <rect width="300" height="560" fill="url(#pbTwill)" opacity="0.85" />
          <rect width="300" height="560" fill="url(#pbFace)" opacity="0.55" />

          {/* broad soft key light off the upper-left */}
          <path d="M4 34 L150 34 L60 532 L4 532 Z" fill="#FFFFFF" opacity="0.055" />
          <path d="M4 34 L74 34 L26 532 L4 532 Z" fill="#FFFFFF" opacity="0.05" />

          {/* thermoformed perimeter seam */}
          <rect
            x="30"
            y="62"
            width="240"
            height="438"
            rx="34"
            fill="none"
            stroke="#000000"
            strokeWidth="1.2"
            opacity="0.35"
          />

          {/* decals */}
          <text
            x="150"
            y="214"
            fill="#F7FAFC"
            fontSize="31"
            fontWeight="700"
            letterSpacing="11"
            textAnchor="middle"
            opacity="0.92"
            style={{ fontFamily: "Oswald, sans-serif" }}
          >
            MARALA
          </text>
          <rect x="86" y="234" width="128" height="3" fill="#00A6A6" />
          <text
            x="150"
            y="266"
            fill="#00A6A6"
            fontSize="12"
            fontWeight="600"
            letterSpacing="6"
            textAnchor="middle"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            RAW CARBON 16
          </text>
          <text
            x="150"
            y="474"
            fill="#F7FAFC"
            fontSize="9"
            fontWeight="500"
            letterSpacing="4"
            textAnchor="middle"
            opacity="0.4"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            USAP APPROVED
          </text>

          {/* bottom-right ambient occlusion */}
          <path d="M300 300 L300 560 L60 560 Z" fill="#000000" opacity="0.22" />
        </g>

        {/* edge guard: its own band, matte, catching a rim light */}
        <path
          d={PADDLE_FACE}
          fill="none"
          stroke="url(#pbGuard)"
          strokeWidth="13"
          strokeLinejoin="round"
        />
        <path
          d={PADDLE_FACE}
          fill="none"
          stroke="#000000"
          strokeWidth="2"
          opacity="0.5"
          strokeLinejoin="round"
        />
        <path
          d="M48 40 C30 42 19 56 19 78 L19 300"
          fill="none"
          stroke="#9FC2E4"
          strokeWidth="2"
          opacity="0.5"
          strokeLinecap="round"
        />
        <path
          d="M254 40 C274 42 282 58 282 78 L282 210"
          fill="none"
          stroke="#7C9CC0"
          strokeWidth="1.4"
          opacity="0.3"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Balls                                                              */
/* ------------------------------------------------------------------ */

function PickleBall() {
  return (
    <svg viewBox="0 0 120 120" className="h-full w-full" aria-hidden="true">
      <defs>
        <radialGradient id="pbBallG" cx="0.34" cy="0.28" r="0.85">
          <stop offset="0%" stopColor="#FFD9A8" />
          <stop offset="34%" stopColor="#FB923C" />
          <stop offset="72%" stopColor="#EA6A0A" />
          <stop offset="100%" stopColor="#8A3708" />
        </radialGradient>
        <filter id="pbBallS" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="4" dy="10" stdDeviation="8" floodColor="#0B1F3A" floodOpacity="0.32" />
        </filter>
      </defs>
      <g filter="url(#pbBallS)">
        <circle cx="60" cy="60" r="52" fill="url(#pbBallG)" />
        {/* moulded holes, foreshortened toward the rim */}
        {[
          [40, 30, 6, 5.2],
          [76, 34, 5.6, 5],
          [58, 58, 7, 6.8],
          [30, 62, 5, 6.4],
          [90, 64, 4.4, 6],
          [50, 90, 6, 4.8],
          [80, 92, 5, 4],
        ].map(([cx, cy, rx, ry], i) => (
          <ellipse key={i} cx={cx} cy={cy} rx={rx} ry={ry} fill="#5A2205" opacity="0.85" />
        ))}
        {/* specular + rim bounce */}
        <ellipse
          cx="42"
          cy="34"
          rx="17"
          ry="12"
          fill="#FFFFFF"
          opacity="0.4"
          transform="rotate(-28 42 34)"
        />
        <path d="M18 82 A52 52 0 0 0 96 92" fill="none" stroke="#FFC489" strokeWidth="4" opacity="0.28" />
      </g>
    </svg>
  );
}

function HockeyBall() {
  return (
    <svg viewBox="0 0 120 120" className="h-full w-full" aria-hidden="true">
      <defs>
        <radialGradient id="hkBallG" cx="0.34" cy="0.28" r="0.85">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="30%" stopColor="#F1F5F9" />
          <stop offset="70%" stopColor="#C2CBD6" />
          <stop offset="100%" stopColor="#6B7686" />
        </radialGradient>
        <filter id="hkBallS" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="4" dy="10" stdDeviation="8" floodColor="#0B1F3A" floodOpacity="0.3" />
        </filter>
      </defs>
      <g filter="url(#hkBallS)">
        <circle cx="60" cy="60" r="48" fill="url(#hkBallG)" />
        {/* dimples, denser and flatter toward the limb */}
        {Array.from({ length: 5 }).map((_, ring) =>
          Array.from({ length: 10 }).map((__, i) => {
            const r = 9 + ring * 9.2;
            const a = (i / 10) * Math.PI * 2 + ring * 0.32;
            const cx = 56 + Math.cos(a) * r;
            const cy = 56 + Math.sin(a) * r;
            if (Math.hypot(cx - 60, cy - 60) > 43) return null;
            return (
              <circle key={`${ring}-${i}`} cx={cx} cy={cy} r={2.5} fill="#94A3B8" opacity="0.5" />
            );
          }),
        )}
        <ellipse
          cx="42"
          cy="34"
          rx="15"
          ry="10"
          fill="#FFFFFF"
          opacity="0.75"
          transform="rotate(-28 42 34)"
        />
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Stage                                                              */
/* ------------------------------------------------------------------ */

export default function InteractiveRacketX() {
  const stageRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [revealed, setRevealed] = useState(false);

  const px = useMotionValue(0);
  const py = useMotionValue(0);

  // Slow, heavily damped springs: the rig should drift, not chase.
  const cfg = { stiffness: 55, damping: 26, mass: 1.1 };
  const sx = useSpring(px, cfg);
  const sy = useSpring(py, cfg);

  // Restrained parallax. Enough to feel three-dimensional, nothing more.
  const rotateY = useTransform(sx, [-0.5, 0.5], [-9, 9]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [7, -7]);
  const rotateZ = useTransform(sx, [-0.5, 0.5], [-3.5, 3.5]);
  const shiftX = useTransform(sx, [-0.5, 0.5], [-14, 14]);
  const shiftY = useTransform(sy, [-0.5, 0.5], [-10, 10]);
  const bgX = useTransform(sx, [-0.5, 0.5], [16, -16]);
  const bgY = useTransform(sy, [-0.5, 0.5], [12, -12]);

  useEffect(() => {
    if (reduce) {
      setRevealed(true);
      return;
    }
    const el = stageRef.current;
    if (!el) return;

    let inView = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
      },
      { threshold: 0.1 },
    );
    io.observe(el);

    const onMove = (event: PointerEvent) => {
      if (!inView) return;
      const rect = el.getBoundingClientRect();
      const nx = (event.clientX - (rect.left + rect.width / 2)) / rect.width;
      const ny = (event.clientY - (rect.top + rect.height / 2)) / rect.height;
      px.set(Math.max(-0.5, Math.min(0.5, nx)));
      py.set(Math.max(-0.5, Math.min(0.5, ny)));
    };

    const onLeave = () => {
      px.set(0);
      py.set(0);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    window.addEventListener("blur", onLeave);

    return () => {
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("blur", onLeave);
    };
  }, [reduce, px, py]);

  const settle = reduce ? { duration: 0 } : { duration: 1.5, ease: [0.16, 1, 0.3, 1] as const };

  return (
    <motion.div
      ref={stageRef}
      onViewportEnter={() => setRevealed(true)}
      viewport={{ once: true, margin: "-100px" }}
      className="relative min-h-[62svh] w-full overflow-hidden bg-marala-white sm:min-h-[76vh] lg:min-h-[min(100vh,900px)]"
    >
      {/* ---------- backdrop, keyed to the section's own white ---------- */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-marala-white to-[#EDF2F7]" />

      <motion.div style={{ x: bgX, y: bgY }} className="absolute -inset-20">
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #0B1F3A 1px, transparent 1px), linear-gradient(to bottom, #0B1F3A 1px, transparent 1px)",
            backgroundSize: "88px 88px",
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="aspect-square w-[62%] rounded-full bg-[radial-gradient(circle,rgba(0,166,166,0.10),rgba(0,166,166,0)_68%)]" />
        </div>
      </motion.div>

      {/* oversized ghost wordmark, sitting behind the equipment */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <span className="font-display text-[24vw] font-bold uppercase leading-none tracking-tighter text-marala-navy/[0.045]">
          Marala
        </span>
      </div>

      {/* ---------- the cross ---------- */}
      <div
        className="absolute inset-0"
        style={{ perspective: "1800px", perspectiveOrigin: "50% 45%" }}
      >
        <motion.div
          className="absolute inset-0"
          style={{
            rotateX,
            rotateY,
            rotateZ,
            x: shiftX,
            y: shiftY,
            transformStyle: "preserve-3d",
          }}
        >
          {/* pickleball paddle */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ transformStyle: "preserve-3d" }}
          >
            <motion.div
              initial={false}
              animate={{
                opacity: revealed ? 1 : 0,
                rotate: revealed ? 31 : 46,
                y: revealed ? 0 : 40,
              }}
              transition={settle}
              className="absolute h-[62%] w-[46%] sm:h-[66%] sm:w-[34%] lg:h-[74%] lg:w-[26%]"
              style={{ transform: "translateZ(0px)" }}
            >
              <PickleballPaddle />
            </motion.div>
          </div>

          {/* hockey stick, crossing in front */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ transformStyle: "preserve-3d" }}
          >
            <motion.div
              initial={false}
              animate={{
                opacity: revealed ? 1 : 0,
                rotate: revealed ? -31 : -46,
                y: revealed ? 0 : 40,
              }}
              transition={{ ...settle, delay: reduce ? 0 : 0.12 }}
              className="absolute h-[72%] w-[46%] sm:h-[76%] sm:w-[34%] lg:h-[86%] lg:w-[26%]"
              style={{ transform: "translateZ(60px)" }}
            >
              <HockeyStick />
            </motion.div>
          </div>

          {/* balls resting in the composition */}
          <motion.div
            initial={false}
            animate={{ opacity: revealed ? 1 : 0 }}
            transition={{ ...settle, delay: reduce ? 0 : 0.5 }}
            className="absolute inset-0"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div
              className="absolute left-[22%] top-[26%] h-14 w-14 lg:h-20 lg:w-20"
              style={{ transform: "translateZ(120px)" }}
            >
              <PickleBall />
            </div>
            <div
              className="absolute bottom-[22%] right-[23%] h-11 w-11 lg:h-16 lg:w-16"
              style={{ transform: "translateZ(90px)" }}
            >
              <HockeyBall />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* ---------- quiet annotations ---------- */}
      <motion.div
        initial={false}
        animate={{ opacity: revealed ? 1 : 0 }}
        transition={{ duration: 0.9, delay: reduce ? 0 : 0.8 }}
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute left-6 top-1/2 -translate-y-1/2 lg:left-14">
          <span className="font-display text-[0.6rem] font-bold uppercase tracking-[0.3em] text-marala-orange">
            Pro Series
          </span>
          <p className="mt-2 font-display text-xl font-bold uppercase leading-none text-marala-navy lg:text-3xl">
            Field
            <br />
            Hockey
          </p>
          <div className="mt-3 h-px w-14 bg-marala-navy/20 lg:w-24" />
        </div>

        <div className="absolute right-6 top-1/2 -translate-y-1/2 text-right lg:right-14">
          <span className="font-display text-[0.6rem] font-bold uppercase tracking-[0.3em] text-marala-teal">
            High-Performance
          </span>
          <p className="mt-2 font-display text-xl font-bold uppercase leading-none text-marala-navy lg:text-3xl">
            Pickleball
            <br />
            Paddles
          </p>
          <div className="ml-auto mt-3 h-px w-14 bg-marala-navy/20 lg:w-24" />
        </div>
      </motion.div>
    </motion.div>
  );
}
