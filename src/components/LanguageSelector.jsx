import { useTranslation } from '../utils/i18n';
import './LanguageSelector.css';

export default function LanguageSelector() {
  const { lang, setLang } = useTranslation();

  const languages = [
    { code: 'tr', label: 'TR', flag: '🇹🇷' },
    { code: 'en', label: 'EN', flag: '🇬🇧' },
    { code: 'es', label: 'ES', flag: '🇪🇸' },
    { code: 'ar', label: 'AR', flag: '🇸🇦' },
  ];

  return (
    <div className="language-selector-panel">
      {languages.map((l) => (
        <button
          key={l.code}
          type="button"
          className={`lang-btn${lang === l.code ? ' active' : ''}`}
          onClick={() => setLang(l.code)}
          title={l.label}
        >
          <span className="lang-flag">{l.flag}</span>
          <span className="lang-code">{l.code.toUpperCase()}</span>
        </button>
      ))}
    </div>
  );
}
