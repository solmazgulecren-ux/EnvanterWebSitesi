const YELLOW = '#FFD15C';

const LEFT_SHOULDER = { x: 140, y: 450 };
const RIGHT_SHOULDER = { x: 190, y: 450 };

export default function YellowMonster({ animated = false, className = '', style }) {
  const leftArmClass = animated ? 'yellow-arm-left' : '';
  const rightArmClass = animated ? 'yellow-arm-right' : '';
  const eyeClass = animated ? 'yellow-eye' : '';
  const mouthClass = animated ? 'yellow-mouth-g' : '';

  return (
    <g className={className} style={style}>
      <ellipse cx="165" cy="497" rx="38" ry="5" fill="rgba(0,0,0,0.15)" />

      <path d="M 130 478 Q 106 502 154 498" fill="none" stroke={YELLOW} strokeWidth="10" strokeLinecap="round" />
      <path d="M 200 478 Q 224 502 176 498" fill="none" stroke={YELLOW} strokeWidth="10" strokeLinecap="round" />

      <g className={leftArmClass}>
        <path
          d={`M ${LEFT_SHOULDER.x} ${LEFT_SHOULDER.y} C 126 416 116 380 108 342`}
          fill="none"
          stroke={YELLOW}
          strokeWidth="11"
          strokeLinecap="round"
        />
      </g>

      <g className={rightArmClass}>
        <path
          d={`M ${RIGHT_SHOULDER.x} ${RIGHT_SHOULDER.y} C 204 416 214 380 222 342`}
          fill="none"
          stroke={YELLOW}
          strokeWidth="11"
          strokeLinecap="round"
        />
      </g>

      <ellipse cx="165" cy="458" rx="34" ry="28" fill={YELLOW} />
      <circle cx={LEFT_SHOULDER.x} cy={LEFT_SHOULDER.y} r="7" fill={YELLOW} />
      <circle cx={RIGHT_SHOULDER.x} cy={RIGHT_SHOULDER.y} r="7" fill={YELLOW} />
      <circle cx="165" cy="408" r="24" fill={YELLOW} />

      <g className={eyeClass}>
        <circle cx="156" cy="403" r="5" fill="#FFF" />
        <circle cx="156" cy="403" r="2.2" fill="#222" />
      </g>
      <g className={eyeClass}>
        <circle cx="174" cy="403" r="5" fill="#FFF" />
        <circle cx="174" cy="403" r="2.2" fill="#222" />
      </g>

      <g className={mouthClass}>
        <ellipse cx="165" cy="420" rx="6" ry="3.5" fill="#B72D43" className="yellow-mouth" />
      </g>
    </g>
  );
}

export const YELLOW_MONSTER_VIEWBOX = '80 320 170 190';
