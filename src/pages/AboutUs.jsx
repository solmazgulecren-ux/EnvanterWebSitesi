import './AboutUs.css';

export default function AboutUs() {
  return (
    <div className="about-us-page">
      <div className="about-us-container">

        {/* Sevimli Maskot Canavar */}
        <div className="about-us-mascot" aria-hidden="true">
          <svg viewBox="0 0 300 350" width="100%" height="100%">
            {/* Canavarın Gölgesi */}
            <ellipse cx="150" cy="320" rx="70" ry="10" fill="rgba(0,0,0,0.15)" />

            {/* Boynuzlar (Gövdenin/Kafanın arkasında kalması için önce çizilir - Gözlerin bittiği yere son derece yakın) */}
            <path d="M 116 176 Q 90 145 98 120 Q 118 130 128 164 Z" fill="#FFC0DC" />
            <path d="M 184 176 Q 210 145 202 120 Q 182 130 172 164 Z" fill="#FFC0DC" />

            {/* Canavarın Gövdesi (Mavi Canavar) */}
            <path
              d="M 90 280 C 70 120, 230 120, 210 280 Z"
              fill="#439BF1"
            />

            {/* Ayaklar */}
            <rect x="110" y="275" width="24" height="40" rx="10" fill="#2d82d6" />
            <rect x="166" y="275" width="24" height="40" rx="10" fill="#2d82d6" />
            <circle cx="122" cy="315" r="12" fill="#439BF1" />
            <circle cx="178" cy="315" r="12" fill="#439BF1" />

            {/* Kolları */}
            {/* Sol Kol - Elinde Tablet Tutuyor */}
            <path
              d="M 92 210 C 60 210, 50 250, 75 260"
              fill="none"
              stroke="#439BF1"
              strokeWidth="20"
              strokeLinecap="round"
            />
            {/* Tablet */}
            <g transform="translate(35, 230) rotate(-10)">
              <rect x="0" y="0" width="35" height="50" rx="4" fill="#222" />
              <rect x="3" y="3" width="29" height="44" rx="2" fill="#fff" />
              {/* Tablet Ekranındaki Renkli Barlar (Arayüz Temsili) */}
              <rect x="6" y="8" width="23" height="6" rx="1" fill="#EA4076" />
              <rect x="6" y="18" width="15" height="4" rx="1" fill="#73D2C8" />
              <rect x="6" y="26" width="23" height="4" rx="1" fill="#FFD15C" />
              <circle cx="17.5" cy="42" r="2.5" fill="#222" />
            </g>

            {/* Sağ Kol - Kargo Kutusu Tutuyor */}
            <path
              d="M 208 210 C 240 210, 250 240, 225 260"
              fill="none"
              stroke="#439BF1"
              strokeWidth="20"
              strokeLinecap="round"
            />
            {/* Kargo Kutusu */}
            <g transform="translate(210, 215) rotate(5)">
              {/* Kutu Gövdesi */}
              <rect x="0" y="10" width="55" height="40" rx="4" fill="#D3A26D" />
              {/* Kutu Kapağı */}
              <rect x="-3" y="5" width="61" height="10" rx="2" fill="#B98854" />
              {/* Kargo Bantı */}
              <rect x="23" y="5" width="9" height="45" fill="#A47543" />
              {/* Kargo Etiketi */}
              <rect x="8" y="22" width="12" height="15" fill="#fff" />
              <line x1="11" y1="26" x2="17" y2="26" stroke="#555" strokeWidth="1.5" />
              <line x1="11" y1="30" x2="15" y2="30" stroke="#555" strokeWidth="1.5" />
            </g>

            {/* Canavarın Gözleri */}
            <circle cx="130" cy="180" r="16" fill="#fff" />
            <circle cx="130" cy="180" r="7" fill="#111" />
            <circle cx="127" cy="177" r="3.5" fill="#fff" /> {/* Işıltı */}

            <circle cx="170" cy="180" r="16" fill="#fff" />
            <circle cx="170" cy="180" r="7" fill="#111" />
            <circle cx="167" cy="177" r="3.5" fill="#fff" /> {/* Işıltı */}

            {/* Yanaklar (Allık) */}
            <circle cx="112" cy="196" r="6" fill="#EA4076" opacity="0.6" />
            <circle cx="188" cy="196" r="6" fill="#EA4076" opacity="0.6" />

            {/* Sevimli Ağız */}
            <path
              d="M 142 205 Q 150 215 158 205"
              fill="none"
              stroke="#111"
              strokeWidth="4.5"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Not Kağıdı Görünümlü Alan */}
        <div className="about-us-note">
          <div className="note-pin">📌</div>

          <h2 className="note-title">🏢 Biz Kimiz? (TEİN Teknoloji)</h2>
          <p className="note-text">
            2017 yılında Birleşik Krallık'ta temelleri atılan ve 2020 yılından itibaren yoluna <strong>TEİN Teknoloji</strong> olarak devam eden şirketimiz, dijital dönüşümü sadece bir araç değil, bir vizyon olarak benimsemektedir. Merkez ofisini teknoloji ve inovasyonun kalbinde, <strong>Düzce Teknopark</strong>'ta konumlandıran firmamız; bankacılık, e-ticaret, telekomünikasyon ve sanal gerçeklik gibi birçok farklı sektörde global ölçekte yenilikçi BT çözümleri sunmaktadır.
          </p>
          <p className="note-text">
            Yerel yetenekleri keşfederek dünya sahnesine hazırlayan TEİN Teknoloji, istikrarlı büyümesi ve Ar-Ge yatırımlarıyla Türkiye'nin en büyük bilişim şirketleri listelerinde üst sıralarda yer almanın gururunu taşımaktadır.
          </p>

          <h2 className="note-title">🎯 Vizyon & Misyon</h2>
          <p className="note-text">
            <strong>Vizyonumuz:</strong> Güçlü altyapımız ve yenilikçi bakış açımızla, Türkiye'den yükselen ve global teknoloji dünyasına yön veren dijital bir köprü olmak.
          </p>
          <p className="note-text">
            <strong>Misyonumuz:</strong> İş ortaklarımıza yüksek güvenlikli, ölçeklenebilir ve sürdürülebilir yazılım çözümleri sunarken, teknolojiyi operasyonel süreçleri kusursuzlaştıran bir ekosisteme dönüştürmek.
          </p>

          <h2 className="note-title">📦 EnvanterTakip Projesi Hakkında</h2>
          <p className="note-text">
            Kurumsal operasyonlarımızın hızına ivme kazandırmak, donanım ve cihaz yönetimini güvenilir bir dijital zemine oturtmak amacıyla geliştirilen <strong>EnvanterTakip</strong> sistemi, yenilikçi geliştirme vizyonumuzun bir ürünüdür. Modern arayüzü, dinamik özet paneli ve anlık stok takip özellikleriyle bu platform; şirketimizin şeffaflık, hız ve operasyonel verimlilik hedeflerinin en somut örneklerinden biridir.
          </p>
        </div>

      </div>
    </div>
  );
}
