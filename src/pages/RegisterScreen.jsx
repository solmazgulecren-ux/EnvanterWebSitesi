import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../utils/auth';
import './RegisterScreen.css';
import '../styles/monsterAnimations.css';
import YellowMonster from '../components/YellowMonster';
import RegisterEdgeMonster from '../components/RegisterEdgeMonster';
import { getMonsterPeekState } from '../utils/monsterPeek';
import { useMonsterChat } from '../hooks/useMonsterChat';

const MAGENTA = '#EA4076';
const TEAL = '#73D2C8';
const BLUE = '#439BF1';
const LIGHT_PINK = '#FFC0DC';

export default function RegisterScreen() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Odaklanma durumları
  const [focusedField, setFocusedField] = useState(null);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [hovered, setHovered] = useState(null);

  // Hata mesajı state'leri
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  // Fare takibi
  useEffect(() => {
    const handleMouseMove = (e) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    let hasErr = false;

    // Ad Doğrulama
    if (!firstName.trim()) {
      setFirstNameError('Ad alanı boş bırakılamaz');
      hasErr = true;
    } else {
      setFirstNameError('');
    }

    // Soyad Doğrulama
    if (!lastName.trim()) {
      setLastNameError('Soyad alanı boş bırakılamaz');
      hasErr = true;
    } else {
      setLastNameError('');
    }

    // E-posta Doğrulama
    if (!email) {
      setEmailError('E-posta adresi boş bırakılamaz');
      hasErr = true;
    } else if (!email.includes('@')) {
      setEmailError('Geçersiz e-posta formatı (@ bulunmalı)');
      hasErr = true;
    } else {
      setEmailError('');
    }

    // Şifre 1 Doğrulama
    if (!password) {
      setPasswordError('Şifre alanı boş bırakılamaz');
      hasErr = true;
    } else {
      setPasswordError('');
    }

    // Şifre 2 Doğrulama
    if (!confirmPassword) {
      setConfirmPasswordError('Şifre tekrarı boş bırakılamaz');
      hasErr = true;
    } else if (password && password !== confirmPassword) {
      setConfirmPasswordError('Şifreler uyuşmuyor');
      hasErr = true;
    } else {
      setConfirmPasswordError('');
    }

    if (hasErr) {
      setIsSuccess(false);
      setSuccessMessage('');
      setIsError(true);
      setTimeout(() => setIsError(false), 2000);
      return;
    }

    const result = registerUser({ firstName, lastName, email, password });
    if (!result.ok) {
      setEmailError(result.error);
      setIsSuccess(false);
      setSuccessMessage('');
      setIsError(true);
      setTimeout(() => setIsError(false), 2000);
      return;
    }

    setIsError(false);
    setIsSuccess(true);
    setSuccessMessage('Kayıt başarılı');
    setTimeout(() => navigate('/login', { state: { registered: true, email } }), 2500);
  };

  const hasAnyErrors = !!(firstNameError || lastNameError || emailError || passwordError || confirmPasswordError);
  const faceAnimClass = isSuccess ? 'happy-nod' : isError ? 'shake-face' : '';

  const isTextFieldFocused = ['firstName', 'lastName', 'email'].includes(focusedField);
  const chatting = useMonsterChat(isTextFieldFocused);

  const peek = getMonsterPeekState({
    focusedField,
    showPassword,
    mouse,
    hovered,
    isError,
    chatting,
  });

  const {
    isHiddenPeeking,
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
  } = peek;
  const pOffset = globalPupilOffset;

  return (
    <div className="register-page">
      {/* ── Sol Panel (Karakterler) ── */}
      <div className="register-left">
        <svg viewBox="0 0 500 500" className="monsters-svg" width="100%" height="100%">

          {/* 1. Light Pink Monster (En arkadaki büyük karakter) */}
          <g className="monster light-pink roll-down-entry pink-entry">
            {/* Gövde */}
            <g className="monster-body" style={{ transformOrigin: '285px 500px', transform: pinkRotate }}>
              <path d="M 175 500 L 175 200 A 110 110 0 0 1 395 200 L 395 500 Z" fill={LIGHT_PINK} />

              {/* Yüz */}
              <g className={faceAnimClass}>
                <circle cx="275" cy="200" r="26" fill="#FFF" />
                <circle cx={275 + pOffset.x} cy={200 + pOffset.y} r={pinkPupilR} fill="#222" style={{ transition: 'all 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }} />

                {/* Ağız ve Tavşan Dişleri */}
                <g>
                  <defs>
                    <clipPath id="pink-mouth-clip-reg">
                      {isError ? (
                        <path d="M 270 240 Q 295 270 320 240 Z" />
                      ) : (
                        <ellipse cx="295" cy={pinkMouthY} rx={pinkMouthRx} ry={pinkMouthRy} />
                      )}
                    </clipPath>
                  </defs>

                  {/* Ağız Arka Planı */}
                  {isError ? (
                    <path d="M 270 240 Q 295 270 320 240 Z" fill="#B85B81" style={{ transition: 'all 0.35s' }} />
                  ) : (
                    <ellipse cx="295" cy={pinkMouthY} rx={pinkMouthRx} ry={pinkMouthRy} fill="#B85B81" style={{ transition: 'all 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }} />
                  )}

                  {/* Dişler */}
                  <g clipPath="url(#pink-mouth-clip-reg)">
                    <rect x="288" y={pinkTeethY - 5} width="6" height={pinkTeethHeight + 5} fill="#fff" rx="1" style={{ transition: 'all 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }} />
                    <rect x="296" y={pinkTeethY - 5} width="6" height={pinkTeethHeight + 5} fill="#fff" rx="1" style={{ transition: 'all 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }} />
                  </g>
                </g>
              </g>
            </g>
            <path d="M 175 500 L 175 200 A 110 110 0 0 1 395 200 L 395 500 Z" fill="transparent"
              onMouseEnter={() => setHovered('lightPink')} onMouseLeave={() => setHovered(null)} />
          </g>

          {/* 2. Magenta Monster (Dikdörtgen kafalı) */}
          <g className="monster magenta roll-down-entry magenta-entry">
            {/* Bacaklar */}
            <path className="monster-leg" fill={MAGENTA} d={`M 180 500 L ${100 + mLegX} ${135 + mLegY} L ${116 + mLegX} ${135 + mLegY} L 196 500 Z`} />
            <path className="monster-leg" fill={MAGENTA} d={`M 215 500 L ${135 + mLegX} ${135 + mLegY} L ${151 + mLegX} ${135 + mLegY} L 231 500 Z`} />

            {/* Gövde */}
            <g className="monster-body" style={{ transform: `translate(${mLegX}px, ${mLegY}px)` }}>
              <rect x="50" y="110" width="170" height="50" rx="25" fill={MAGENTA} />

              <g className={faceAnimClass}>
                <circle cx="100" cy="95" r="16" fill="#FFF" />
                <circle cx={100 + pOffset.x} cy={95 + pOffset.y} r="7" fill="#222" />
                <circle cx="135" cy="95" r="16" fill="#FFF" />
                <circle cx={135 + pOffset.x} cy={95 + pOffset.y} r="7" fill="#222" />

                {/* Ağız */}
                {showMagentaTeeth ? (
                  <g>
                    <rect x="65" y="115" width="110" height="35" rx="17.5" fill="#fff" style={{ transition: 'all 0.3s' }} />
                    <path d="M 65 132.5 L 175 132.5" stroke={MAGENTA} strokeWidth="3" />
                    <path d="M 83.3 115 L 83.3 150" stroke={MAGENTA} strokeWidth="3" />
                    <path d="M 101.6 115 L 101.6 150" stroke={MAGENTA} strokeWidth="3" />
                    <path d="M 120 115 L 120 150" stroke={MAGENTA} strokeWidth="3" />
                    <path d="M 138.3 115 L 138.3 150" stroke={MAGENTA} strokeWidth="3" />
                    <path d="M 156.6 115 L 156.6 150" stroke={MAGENTA} strokeWidth="3" />
                  </g>
                ) : (
                  <ellipse cx="120" cy="135" rx={magentaMouthRx} ry={magentaMouthRy} fill="#801C39" style={{ transition: 'all 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }} />
                )}
              </g>
              <rect x="50" y="75" width="170" height="85" fill="transparent"
                onMouseEnter={() => setHovered('magenta')} onMouseLeave={() => setHovered(null)} />
            </g>
          </g>

          {/* 3. Teal Monster (Bulut gibi) */}
          <g className="monster teal roll-down-entry teal-entry">
            <path className="monster-leg" fill={TEAL} d={`M 100 500 L ${100 + tLegX} ${260 + tLegY} L ${116 + tLegX} ${260 + tLegY} L 116 500 Z`} />
            <path className="monster-leg" fill={TEAL} d={`M 140 500 L ${140 + tLegX} ${260 + tLegY} L ${156 + tLegX} ${260 + tLegY} L 156 500 Z`} />

            <g className="monster-body" style={{ transform: `translate(${tLegX}px, ${tLegY}px)` }}>
              {/* Bulut gövdesi */}
              <circle cx="130" cy="260" r="45" fill={TEAL} />
              <circle cx="95" cy="250" r="28" fill={TEAL} />
              <circle cx="165" cy="250" r="28" fill={TEAL} />
              <circle cx="130" cy="220" r="32" fill={TEAL} />
              <circle cx="130" cy="300" r="32" fill={TEAL} />
              <circle cx="100" cy="225" r="24" fill={TEAL} />
              <circle cx="160" cy="225" r="24" fill={TEAL} />
              <circle cx="100" cy="285" r="24" fill={TEAL} />
              <circle cx="160" cy="285" r="24" fill={TEAL} />

              <g
                className={`${faceAnimClass} monster-face-turn`}
                style={{ transform: tealFaceTransform }}
              >
                <circle cx="115" cy="250" r="14" fill="#FFF" />
                <circle cx={115 + tealPupilOffset.x} cy={250 + tealPupilOffset.y} r="6" fill="#222" />
                <circle cx="145" cy="250" r="14" fill="#FFF" />
                <circle cx={145 + tealPupilOffset.x} cy={250 + tealPupilOffset.y} r="6" fill="#222" />
                <g className={tealFaceClass}>
                  <ellipse cx="130" cy="275" rx={tealMouthRx} ry={tealMouthRy} fill="#2C7B76" style={{ transition: 'all 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }} />
                </g>
              </g>
              <circle cx="130" cy="260" r="60" fill="transparent"
                onMouseEnter={() => setHovered('teal')} onMouseLeave={() => setHovered(null)} />
            </g>
          </g>

          {/* 4. Blue Monster (Yuvarlak) */}
          <g className="monster blue roll-down-entry blue-entry">
            <path className="monster-leg" fill={BLUE} d={`M 190 500 L ${190 + bLegX} ${320 + bLegY} L ${206 + bLegX} ${320 + bLegY} L 206 500 Z`} />
            <path className="monster-leg" fill={BLUE} d={`M 230 500 L ${230 + bLegX} ${320 + bLegY} L ${246 + bLegX} ${320 + bLegY} L 246 500 Z`} />

            <g className="monster-body" style={{ transform: `translate(${bLegX}px, ${bLegY}px)` }}>
              <circle cx="215" cy="320" r="50" fill={BLUE} />

              <g
                className={`${faceAnimClass} monster-face-turn`}
                style={{ transform: blueFaceTransform }}
              >
                <circle cx="195" cy="305" r="15" fill="#FFF" />
                <circle cx={195 + bluePupilOffset.x} cy={305 + bluePupilOffset.y} r="6" fill="#222" />
                <circle cx="230" cy="305" r="15" fill="#FFF" />
                <circle cx={230 + bluePupilOffset.x} cy={305 + bluePupilOffset.y} r="6" fill="#222" />
                <g className={blueFaceClass}>
                  <ellipse cx="215" cy="335" rx={blueMouthRx} ry={blueMouthRy} fill="#1B5494" style={{ transition: 'all 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }} />
                </g>
              </g>
              <circle cx="215" cy="320" r="50" fill="transparent"
                onMouseEnter={() => setHovered('blue')} onMouseLeave={() => setHovered(null)} />
            </g>
          </g>

          {/* 5. Yellow Monster (Hata durumunda ortada beliren konuşan/jest yapan canavar) */}
          <YellowMonster
            animated
            className={`yellow-monster-container ${hasAnyErrors ? 'active' : 'inactive'}`}
            style={{ opacity: hasAnyErrors ? 1 : 0 }}
          />

        </svg>
      </div>

      {/* ── Sağ Panel (Kayıt Formu) ── */}
      <div className="register-right">
        <RegisterEdgeMonster mouse={mouse} isPeeking={peek.isThinking || peek.isPasswordVisiblePeek} />
        <div className="register-card">
          <div className="logo-container">
            {/* Taç (Crown) Logosu */}
            <svg width="28" height="28" viewBox="0 0 24 24" fill="#111">
              <path d="M2 19h20v2H2v-2zm1.2-5l2-9 4.3 4.3L12 3l2.5 6.3L18.8 5l2 9H3.2z" />
            </svg>
          </div>
          <h2>Create Account</h2>
          <p className="subtitle">Please fill details to register</p>

          {successMessage && (
            <div className="register-success-toast" role="status">
              {successMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            {/* Ad Alanı */}
            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label style={{ margin: 0 }}>First Name</label>
                {firstNameError && <span style={{ color: '#E02B6D', fontSize: '11px', fontWeight: '600' }}>{firstNameError}</span>}
              </div>
              <input
                type="text"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                  if (firstNameError) setFirstNameError('');
                }}
                onFocus={() => setFocusedField('firstName')}
                onBlur={() => setFocusedField(null)}
                autoComplete="given-name"
              />
            </div>

            {/* Soyad Alanı */}
            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label style={{ margin: 0 }}>Last Name</label>
                {lastNameError && <span style={{ color: '#E02B6D', fontSize: '11px', fontWeight: '600' }}>{lastNameError}</span>}
              </div>
              <input
                type="text"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                  if (lastNameError) setLastNameError('');
                }}
                onFocus={() => setFocusedField('lastName')}
                onBlur={() => setFocusedField(null)}
                autoComplete="family-name"
              />
            </div>

            {/* E-posta Alanı */}
            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label style={{ margin: 0 }}>Email</label>
                {emailError && <span style={{ color: '#E02B6D', fontSize: '11px', fontWeight: '600' }}>{emailError}</span>}
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (emailError) setEmailError('');
                }}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                autoComplete="email"
              />
            </div>

            {/* Şifre 1 Alanı */}
            <div className="form-group" style={{ position: 'relative' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label style={{ margin: 0 }}>Password</label>
                {passwordError && <span style={{ color: '#E02B6D', fontSize: '11px', fontWeight: '600' }}>{passwordError}</span>}
              </div>
              <input 
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (passwordError) setPasswordError('');
                }}
                onFocus={() => setFocusedField('password')}
                onBlur={() => setFocusedField(null)}
                autoComplete="new-password"
              />
              <span className="eye-icon" onMouseDown={(e) => e.preventDefault()} onClick={() => setShowPassword(!showPassword)} title="Şifreyi Göster/Gizle">
                {showPassword ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </span>
            </div>

            {/* Şifre 2 Alanı (Confirm Password) */}
            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label style={{ margin: 0 }}>Confirm Password</label>
                {confirmPasswordError && <span style={{ color: '#E02B6D', fontSize: '11px', fontWeight: '600' }}>{confirmPasswordError}</span>}
              </div>
              <input
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (confirmPasswordError) setConfirmPasswordError('');
                }}
                onFocus={() => setFocusedField('confirmPassword')}
                onBlur={() => setFocusedField(null)}
                autoComplete="new-password"
              />
            </div>

            <button type="submit" className="btn-register" id="register-submit-btn">
              Register
            </button>
          </form>

          <div className="form-footer">
            Already have an account? <Link to="/login">Log in</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
