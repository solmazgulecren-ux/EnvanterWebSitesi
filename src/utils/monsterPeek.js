const MAX_PUPIL_OFFSET = 6;

export function getMonsterPeekState({
  focusedField,
  showPassword,
  mouse,
  hovered = null,
  isError = false,
  chatting = false,
}) {
  const textFields = ['firstName', 'lastName', 'email'];
  const passwordFields = ['password', 'confirmPassword'];

  const isTextFieldFocused = textFields.includes(focusedField);
  const isPasswordFocused = passwordFields.includes(focusedField);
  const isPasswordVisiblePeek = isPasswordFocused && showPassword;
  const isThinking = isTextFieldFocused;
  const isHiddenPeeking = isPasswordFocused && !showPassword;
  const isLeaning = isThinking || isPasswordVisiblePeek;
  const isPeeking = isHiddenPeeking || isLeaning;

  const lean = isPasswordVisiblePeek ? 1 : isThinking ? 0.62 : 0;

  let globalPupilOffset = { x: 0, y: 0 };
  let tealPupilOffset = { x: 0, y: 0 };
  let bluePupilOffset = { x: 0, y: 0 };

  if (isHiddenPeeking) {
    globalPupilOffset = { x: -MAX_PUPIL_OFFSET, y: 0 };
    tealPupilOffset = { x: -MAX_PUPIL_OFFSET, y: 0 };
    bluePupilOffset = { x: MAX_PUPIL_OFFSET, y: 0 };
  } else if (chatting && isThinking) {
    tealPupilOffset = { x: 5, y: 0 };
    bluePupilOffset = { x: -5, y: 0 };
    globalPupilOffset = { x: MAX_PUPIL_OFFSET, y: 0 };
  } else if (isLeaning) {
    globalPupilOffset = { x: MAX_PUPIL_OFFSET, y: 0 };
    tealPupilOffset = { x: MAX_PUPIL_OFFSET, y: 0 };
    bluePupilOffset = { x: MAX_PUPIL_OFFSET, y: 0 };
  } else {
    const dx = mouse.x - window.innerWidth * 0.25;
    const dy = mouse.y - window.innerHeight * 0.5;
    const angle = Math.atan2(dy, dx);
    const dist = Math.min(Math.hypot(dx, dy) * 0.015, MAX_PUPIL_OFFSET);
    globalPupilOffset = { x: Math.cos(angle) * dist, y: Math.sin(angle) * dist };
    tealPupilOffset = globalPupilOffset;
    bluePupilOffset = globalPupilOffset;
  }

  const mLegX = isHiddenPeeking ? -30 : lean ? Math.round(40 * lean) : 0;
  const mLegY = isHiddenPeeking ? 5 : lean ? Math.round(10 * lean) : 0;
  const tLegX = isHiddenPeeking ? -25 : lean ? Math.round(30 * lean) : 0;
  const tLegY = isHiddenPeeking ? 5 : lean ? Math.round(10 * lean) : 0;
  const bLegX = isHiddenPeeking ? -15 : lean ? Math.round(35 * lean) : 0;
  const bLegY = isHiddenPeeking ? 0 : lean ? Math.round(-15 * lean) : 0;
  const pinkRotate = isHiddenPeeking
    ? 'rotate(-5deg)'
    : lean
      ? `rotate(${6 * lean}deg)`
      : 'none';

  let pinkPupilR = 11;
  let pinkMouthY = 245;
  let pinkMouthRy = hovered === 'lightPink' ? 22 : 12;
  let pinkMouthRx = hovered === 'lightPink' ? 14 : 10;
  let pinkTeethY = pinkMouthY - pinkMouthRy + 1;
  let pinkTeethHeight = hovered === 'lightPink' ? 12 : 8;

  let showMagentaTeeth = hovered === 'magenta' || isError;
  let magentaMouthRy = 8;
  let magentaMouthRx = 12;

  let tealMouthRy = hovered === 'teal' ? 12 : 6;
  let tealMouthRx = 8;
  let blueMouthRy = hovered === 'blue' ? 14 : 6;
  let blueMouthRx = 10;

  if (isError) {
    pinkMouthY = 240;
    pinkMouthRy = 12;
    pinkTeethY = 240;
    pinkTeethHeight = 12;
    showMagentaTeeth = true;
  } else if (isHiddenPeeking) {
    pinkPupilR = 7;
    pinkMouthY = 245;
    pinkMouthRy = 5;
    pinkMouthRx = 5;
    pinkTeethHeight = 0;
    magentaMouthRy = 2;
    magentaMouthRx = 10;
    tealMouthRy = 2;
    tealMouthRx = 8;
    blueMouthRy = 2;
    blueMouthRx = 10;
  } else if (isPasswordVisiblePeek) {
    pinkPupilR = 17;
    pinkMouthY = 350;
    pinkMouthRy = 65;
    pinkMouthRx = 14;
    pinkTeethY = pinkMouthY - pinkMouthRy + 7;
    pinkTeethHeight = 16;
    showMagentaTeeth = true;
    tealMouthRy = 16;
    tealMouthRx = 10;
    blueMouthRy = 16;
    blueMouthRx = 12;
  } else if (isThinking) {
    pinkPupilR = 10;
    pinkMouthY = 248;
    pinkMouthRy = 8;
    pinkMouthRx = 9;
    pinkTeethHeight = 6;
    magentaMouthRy = 5;
    magentaMouthRx = 11;
    tealMouthRy = chatting ? 9 : 6;
    tealMouthRx = 8;
    blueMouthRy = chatting ? 9 : 6;
    blueMouthRx = 9;
  }

  const tealFaceTransform = chatting && isThinking
    ? 'rotate(10deg)'
    : 'none';
  const blueFaceTransform = chatting && isThinking
    ? 'rotate(-10deg)'
    : 'none';
  const tealFaceClass = chatting && isThinking ? 'monster-chat-talk' : '';
  const blueFaceClass = chatting && isThinking ? 'monster-chat-talk' : '';

  return {
    isPeeking,
    isHiddenPeeking,
    isThinking,
    isPasswordVisiblePeek,
    isTextFieldFocused,
    globalPupilOffset,
    tealPupilOffset,
    bluePupilOffset,
    mLegX,
    mLegY,
    tLegX,
    tLegY,
    bLegX,
    bLegY,
    pinkRotate,
    pinkPupilR,
    pinkMouthY,
    pinkMouthRy,
    pinkMouthRx,
    pinkTeethY,
    pinkTeethHeight,
    showMagentaTeeth,
    magentaMouthRy,
    magentaMouthRx,
    tealMouthRy,
    tealMouthRx,
    blueMouthRy,
    blueMouthRx,
    tealFaceTransform,
    blueFaceTransform,
    tealFaceClass,
    blueFaceClass,
  };
}
