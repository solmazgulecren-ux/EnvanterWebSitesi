import { useEffect, useRef, useState } from 'react';

const PURPLE = '#9B59B6';
const PURPLE_DARK = '#6D3A9E';

const EYES = [
  { cx: 58, cy: 52 },
  { cx: 58, cy: 78 },
];

export default function RegisterEdgeMonster({ mouse, isPeeking = false }) {
  const svgRef = useRef(null);
  const [pupilOffset, setPupilOffset] = useState({ x: 2, y: 0 });

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const rect = svg.getBoundingClientRect();
    const scaleX = rect.width / 100;
    const scaleY = rect.height / 150;

    const eyeScreenX = rect.left + EYES[0].cx * scaleX;
    const eyeScreenY = rect.top + ((EYES[0].cy + EYES[1].cy) / 2) * scaleY;

    const dx = mouse.x - eyeScreenX;
    const dy = mouse.y - eyeScreenY;
    const angle = Math.atan2(dy, dx);
    const dist = Math.min(Math.hypot(dx, dy) * 0.018, 4);

    setPupilOffset({
      x: Math.cos(angle) * dist,
      y: Math.sin(angle) * dist,
    });
  }, [mouse]);

  return (
    <div className={`register-edge-monster${isPeeking ? ' peeking' : ''}`} aria-hidden="true">
      <svg ref={svgRef} viewBox="0 0 100 150" className="register-edge-monster-svg">
        <circle cx="28" cy="68" r="46" fill={PURPLE} />
        <circle cx="42" cy="42" r="22" fill={PURPLE} />
        <circle cx="42" cy="108" r="20" fill={PURPLE} />

        <path
          d="M 82 48 Q 96 52 98 66"
          fill="none"
          stroke={PURPLE}
          strokeWidth="9"
          strokeLinecap="round"
        />
        <path
          d="M 82 88 Q 96 92 98 106"
          fill="none"
          stroke={PURPLE}
          strokeWidth="9"
          strokeLinecap="round"
        />

        {EYES.map((eye) => (
          <g key={`${eye.cx}-${eye.cy}`} className="edge-monster-eye">
            <circle cx={eye.cx} cy={eye.cy} r="9" fill="#FFF" />
            <circle
              cx={eye.cx}
              cy={eye.cy}
              r="3.5"
              fill="#222"
              transform={`translate(${pupilOffset.x} ${pupilOffset.y})`}
              style={{ transition: 'transform 0.12s ease' }}
            />
          </g>
        ))}

        <g className="edge-monster-mouth">
          <ellipse cx="62" cy="96" rx="7" ry="4" fill={PURPLE_DARK} />
        </g>
      </svg>
    </div>
  );
}
