import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { loginUser } from '../utils/auth';
import './Login.css';
import '../styles/monsterAnimations.css';
import { getMonsterPeekState } from '../utils/monsterPeek';
import { useMonsterChat } from '../hooks/useMonsterChat';
import { useTranslation } from '../utils/i18n';
import LanguageSelector from '../components/LanguageSelector';

const MAGENTA = '#EA4076';
const TEAL = '#73D2C8';
const BLUE = '#439BF1';
const LIGHT_PINK = '#FFC0DC';

export default function Login() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const registeredNotice = location.state?.registered ? (t('lang') === 'ar' ? 'تم التسجيل بنجاح! يمكنك الدخول الآن.' : t('lang') === 'es' ? '¡Registro exitoso! Ahora puedes iniciar sesión.' : t('lang') === 'en' ? 'Registration successful! You can now log in.' : 'Kayıt başarılı! Şimdi giriş yapabilirsiniz.') : '';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [focusedField, setFocusedField] = useState(null);
  const [isError, setIsError] = useState(false);
  const [hovered, setHovered] = useState(null);

  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [infoMessage, setInfoMessage] = useState(registeredNotice);

  useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email);
    }
  }, [location.state?.email]);

  // Fare takibi
  useEffect(() => {
    const handleMouseMove = (e) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    let hasErr = false;

    // E-posta Doğrulama
    if (!email) {
      setEmailError(t('login.errorEmailEmpty'));
      hasErr = true;
    } else if (!email.includes('@')) {
      setEmailError(t('login.errorEmailFormat'));
      hasErr = true;
    } else {
      setEmailError('');
    }

    // Şifre Doğrulama
    if (!password) {
      setPasswordError(t('login.errorPasswordEmpty'));
      hasErr = true;
    } else {
      setPasswordError('');
    }

    if (hasErr) {
      setIsError(true);
      setTimeout(() => setIsError(false), 2000);
      return;
    }

    const result = loginUser(email, password);
    if (!result.ok) {
      if (result.error.includes('şifre') || result.error.includes('password') || result.error.includes('contraseña')) {
        setPasswordError(t('login.errorMsg'));
      } else {
        setEmailError(t('login.errorMsg'));
      }
      setIsError(true);
      setTimeout(() => setIsError(false), 2000);
      return;
    }

    setIsError(false);
    setInfoMessage('');
    navigate('/dashboard');
  };

  const isTextFieldFocused = focusedField === 'email';
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
    <div className="login-page">
      <LanguageSelector />
      {/* ── Sol Panel (Karakterler) ── */}
      <div className="login-left">
        <svg viewBox="0 0 500 500" className="monsters-svg" width="100%" height="100%">

          {/* 1. Light Pink Monster (En arkadaki büyük karakter) */}
          <g className="monster light-pink">
            {/* Gövde - Odaklanınca duruma göre yatar */}
            <g className="monster-body" style={{ transformOrigin: '285px 500px', transform: pinkRotate }}>
              <path d="M 175 500 L 175 200 A 110 110 0 0 1 395 200 L 395 500 Z" fill={LIGHT_PINK} />

              {/* Yüz (Göz + Ağız) - Hata durumunda sadece burası sallanır */}
              <g className={isError ? 'shake-face' : ''}>
                <circle cx="275" cy="200" r="26" fill="#FFF" />
                <circle cx={275 + pOffset.x} cy={200 + pOffset.y} r={pinkPupilR} fill="#222" style={{ transition: 'all 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }} />

                {/* Ağız ve Tavşan Dişleri (Boşluk kalmaması için clipPath ile maskelendi) */}
                <g>
                  <defs>
                    <clipPath id="pink-mouth-clip">
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

                  {/* Dişler (Ağız sınırlarına göre kırpılmış) */}
                  <g clipPath="url(#pink-mouth-clip)">
                    <rect x="288" y={pinkTeethY - 5} width="6" height={pinkTeethHeight + 5} fill="#fff" rx="1" style={{ transition: 'all 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }} />
                    <rect x="296" y={pinkTeethY - 5} width="6" height={pinkTeethHeight + 5} fill="#fff" rx="1" style={{ transition: 'all 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }} />
                  </g>
                </g>
              </g>
            </g>
            {/* Hover tetikleyici görünmez alan */}
            <path d="M 175 500 L 175 200 A 110 110 0 0 1 395 200 L 395 500 Z" fill="transparent"
              onMouseEnter={() => setHovered('lightPink')} onMouseLeave={() => setHovered(null)} />
          </g>

          {/* 2. Magenta Monster (Dikdörtgen kafalı) */}
          <g className="monster magenta">
            {/* Bacaklar - 2 adet çapraz bacak, boyları toz pembe canavarın altıyla aynı seviyede (Y = 500) sonlanacak şekilde çizildi */}
            <path className="monster-leg" fill={MAGENTA} d={`M 180 500 L ${100 + mLegX} ${135 + mLegY} L ${116 + mLegX} ${135 + mLegY} L 196 500 Z`} />
            <path className="monster-leg" fill={MAGENTA} d={`M 215 500 L ${135 + mLegX} ${135 + mLegY} L ${151 + mLegX} ${135 + mLegY} L 231 500 Z`} />

            {/* Gövde - Boyunla beraber yer değiştirir */}
            <g className="monster-body" style={{ transform: `translate(${mLegX}px, ${mLegY}px)` }}>
              <rect x="50" y="110" width="170" height="50" rx="25" fill={MAGENTA} />

              <g className={isError ? 'shake-face' : ''}>
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
          <g className="monster teal">
            {/* Bacaklar - Toz pembe büyük canavarın başladığı yerden (Y = 500) başlar */}
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
                className={`${isError ? 'shake-face' : ''} monster-face-turn`}
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
          <g className="monster blue">
            {/* Bacaklar - Toz pembe büyük canavarın başladığı yerden (Y = 500) başlar */}
            <path className="monster-leg" fill={BLUE} d={`M 190 500 L ${190 + bLegX} ${320 + bLegY} L ${206 + bLegX} ${320 + bLegY} L 206 500 Z`} />
            <path className="monster-leg" fill={BLUE} d={`M 230 500 L ${230 + bLegX} ${320 + bLegY} L ${246 + bLegX} ${320 + bLegY} L 246 500 Z`} />

            <g className="monster-body" style={{ transform: `translate(${bLegX}px, ${bLegY}px)` }}>
              <circle cx="215" cy="320" r="50" fill={BLUE} />

              <g
                className={`${isError ? 'shake-face' : ''} monster-face-turn`}
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

        </svg>
      </div>

      {/* ── Sağ Panel (Form) ── */}
      <div className="login-right">
        <div className="login-card">
          <div className="logo-container">
            {/* Taç (Crown) Logosu */}
            <svg width="28" height="28" viewBox="0 0 24 24" fill="#111">
              <path d="M2 19h20v2H2v-2zm1.2-5l2-9 4.3 4.3L12 3l2.5 6.3L18.8 5l2 9H3.2z" />
            </svg>
          </div>
          <h2>{t('login.welcomeBack')}</h2>
          <p className="subtitle">{t('login.enterDetails')}</p>

          {infoMessage && (
            <div className="login-info-toast" role="status">
              {infoMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label style={{ margin: 0 }}>{t('login.email')}</label>
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

            <div className="form-group" style={{ position: 'relative' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label style={{ margin: 0 }}>{t('login.password')}</label>
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
                autoComplete="current-password"
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

            <div className="form-extras">
              <label>
                <input type="checkbox" /> {t('login.rememberMe')}
              </label>
              <a href="#forgot">{t('login.forgotPassword')}</a>
            </div>

            <button type="submit" className="btn-login" id="login-submit-btn">
              {t('login.loginBtn')}
            </button>
            <button type="button" className="btn-google">
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              {t('login.googleLogin')}
            </button>
          </form>

          <div className="form-footer">
            {t('login.noAccount')} <Link to="/kayit">{t('login.signUp')}</Link>
          </div>
        </div>
      </div>
    </div>
  );
}