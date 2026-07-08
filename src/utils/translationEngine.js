// Ofis ve IT envanteri terimleri sözlüğü
const TRANSLATION_DICTIONARY = {
  // Sıfatlar ve Belirteçler
  "yeni": { en: "New", es: "Nuevo", ar: "جديد" },
  "kablosuz": { en: "Wireless", es: "Inalámbrico", ar: "لاسلكي" },
  "kablolu": { en: "Wired", es: "Cableado", ar: "سلكي" },
  "mekanik": { en: "Mechanical", es: "Mecánico", ar: "ميكانيكي" },
  "ofis": { en: "Office", es: "Oficina", ar: "مكتب" },
  "oyuncu": { en: "Gaming", es: "Juego", ar: "ألعاب" },
  "taşınabilir": { en: "Portable", es: "Portátil", ar: "محمول" },
  "akıllı": { en: "Smart", es: "Inteligente", ar: "ذكية" },
  "hızlı": { en: "Fast", es: "Rápido", ar: "سريع" },
  "büyük": { en: "Large", es: "Grande", ar: "كبير" },
  "küçük": { en: "Small", es: "Pequeño", ar: "صغير" },
  "yedek": { en: "Backup", es: "Respaldo", ar: "احتياطي" },
  "ergonomik": { en: "Ergonomic", es: "Ergonómico", ar: "مريح" },
  
  // Ürünler
  "bilgisayar": { en: "Computer", es: "Ordenador", ar: "كمبيوتر" },
  "dizüstü": { en: "Laptop", es: "Portátil", ar: "كمبيوتر محمول" },
  "masaüstü": { en: "Desktop", es: "Escritorio", ar: "كمبيوتر مكتبي" },
  "mouse": { en: "Mouse", es: "Ratón", ar: "ماوس" },
  "fare": { en: "Mouse", es: "Ratón", ar: "ماوس" },
  "klavye": { en: "Keyboard", es: "Teclado", ar: "لوحة المفاتيح" },
  "kulaklık": { en: "Headphones", es: "Auriculares", ar: "سماعات" },
  "monitör": { en: "Monitor", es: "Monitor", ar: "شاشة" },
  "ekran": { en: "Screen", es: "Pantalla", ar: "شاشة" },
  "yazıcı": { en: "Printer", es: "Impresora", ar: "طابعة" },
  "kamera": { en: "Camera", es: "Cámara", ar: "كاميرا" },
  "webcam": { en: "Webcam", es: "Cámara web", ar: "كاميرا ويب" },
  "telefon": { en: "Phone", es: "Teléfono", ar: "هاتف" },
  "tablet": { en: "Tablet", es: "Tableta", ar: "جهاز لوحي" },
  "masa": { en: "Desk", es: "Mesa", ar: "طاولة" },
  "sandalye": { en: "Chair", es: "Silla", ar: "كرسي" },
  "koltuk": { en: "Chair", es: "Silla", ar: "كرسي" },
  "kablo": { en: "Cable", es: "Cable", ar: "كابل" },
  "şarj": { en: "Charger", es: "Cargador", ar: "شاحn" },
  "adaptör": { en: "Adapter", es: "Adaptador", ar: "محول" },
  "hoparlör": { en: "Speaker", es: "Altavoz", ar: "مكبر الصوت" },
  "mikrofon": { en: "Microphone", es: "Micrófono", ar: "ميكروفون" },
  "disk": { en: "Drive", es: "Disco", ar: "قرص" },
  "ssd": { en: "SSD", es: "SSD", ar: "قرص SSD" },
  "bellek": { en: "Memory", es: "Memoria", ar: "ذاكرة" },
  "kulaklığı": { en: "Headphones", es: "Auriculares", ar: "سماعات" },
  "bilgisayarı": { en: "Computer", es: "Ordenador", ar: "كمبيوتر" },
  "masası": { en: "Desk", es: "Mesa", ar: "طاولة" },
  "sandalyesi": { en: "Chair", es: "Silla", ar: "كرسي" },

  // Açıklama Kelimeleri / Bağlaçlar
  "için": { en: "for", es: "para", ar: "لـ" },
  "kullanımı": { en: "use", es: "uso", ar: "استخدام" },
  "ve": { en: "and", es: "y", ar: "و" },
  "ile": { en: "with", es: "con", ar: "مع" },
  "cihazı": { en: "device", es: "dispositivo", ar: "جهاز" },
  "kullanım": { en: "use", es: "uso", ar: "استخدام" },
  "ev": { en: "home", es: "hogar", ar: "منزل" },
  "iş": { en: "work", es: "trabajo", ar: "عمل" },
  "yüksek": { en: "high", es: "alto", ar: "عالٍ" },
  "kaliteli": { en: "quality", es: "calidad", ar: "جودة" },
  "çözünürlüklü": { en: "resolution", es: "resolución", ar: "دقة" }
};

// LocalStorage'da saklanacak dinamik çeviriler anahtarı
const DYNAMIC_TRANSLATIONS_KEY = 'envanter_dynamic_translations';

// Dinamik çevirileri getiren yardımcı
export function getDynamicTranslations() {
  try {
    return JSON.parse(localStorage.getItem(DYNAMIC_TRANSLATIONS_KEY) || '{}');
  } catch {
    return {};
  }
}

// Yeni çevirileri LocalStorage'a ve runtime i18n dictionary'sine kaydeden yardımcı
export function saveDynamicTranslation(key, values) {
  const current = getDynamicTranslations();
  current[key] = values;
  localStorage.setItem(DYNAMIC_TRANSLATIONS_KEY, JSON.stringify(current));
  
  // Runtime event tetikleyelim ki i18n güncellensin
  window.dispatchEvent(new Event('dynamic-translations-updated'));
}

// Kelime bazlı akıllı çeviri motoru
export function translateText(text, sourceLang = 'tr') {
  if (!text || typeof text !== 'string') return { en: text, es: text, ar: text };

  // Kelimeleri ayır
  const words = text.toLowerCase().split(/[\s,.\-\/]+/);
  
  const translations = {
    en: [],
    es: [],
    ar: []
  };

  words.forEach((word) => {
    if (!word.trim()) return;
    
    // Sözlükte ara
    if (TRANSLATION_DICTIONARY[word]) {
      translations.en.push(TRANSLATION_DICTIONARY[word].en);
      translations.es.push(TRANSLATION_DICTIONARY[word].es);
      // Arapça sağdan sola yazıldığı için sıfat kelimelerini sıralarken özel bir durum yoksa düz birleştirelim
      translations.ar.push(TRANSLATION_DICTIONARY[word].ar);
    } else {
      // Sözlükte yoksa orijinal kelimeyi ekle (Örn: "Logitech", "27-inch" vb. özel isimler)
      // İlk harfi büyükse koruyalım
      const capitalized = word.charAt(0).toUpperCase() + word.slice(1);
      translations.en.push(capitalized);
      translations.es.push(capitalized);
      translations.ar.push(capitalized);
    }
  });

  // Sonuçları birleştir
  let enResult = translations.en.join(' ');
  let esResult = translations.es.join(' ');
  // Arapça kelimeler sağdan sola okunduğu için sıfat tamlamalarında (Yeni Bilgisayar) sıfat kelimesi Arapça kuralı gereği isimden sonra gelebilir.
  // Basitlik ve okunabilirlik adına kelimeleri düzgün bir sırada birleştirelim
  let arResult = translations.ar.join(' ');

  // İlk harfleri düzgünce büyük yap (Arapça hariç)
  if (enResult.length > 0) {
    enResult = enResult.charAt(0).toUpperCase() + enResult.slice(1);
  }
  if (esResult.length > 0) {
    esResult = esResult.charAt(0).toUpperCase() + esResult.slice(1);
  }

  return {
    en: enResult || text,
    es: esResult || text,
    ar: arResult || text
  };
}

// Ürün veya Açıklama eklendiğinde/güncellendiğinde tüm diller için çevirileri kaydeder
export function registerNewTranslations(text) {
  if (!text) return;
  const translated = translateText(text);
  saveDynamicTranslation(text, translated);
}
