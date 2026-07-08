import { createContext, useContext, useState, useEffect } from 'react';
import { getDynamicTranslations } from './translationEngine';

export const translations = {
  tr: {
    login: {
      title: "Giriş Yap",
      username: "Kullanıcı Adı",
      password: "Şifre",
      loginBtn: "Giriş Yap",
      registerBtn: "Kayıt Ol",
      noAccount: "Hesabınız yok mu?",
      errorMsg: "Geçersiz kullanıcı adı veya şifre!",
      welcomeBack: "Tekrar hoş geldiniz!",
      enterDetails: "Lütfen bilgilerinizi girin",
      email: "E-posta",
      rememberMe: "Beni hatırla",
      forgotPassword: "Şifremi unuttum?",
      googleLogin: "Google ile giriş yap",
      signUp: "Kayıt Ol",
      errorEmailEmpty: "E-posta adresi boş bırakılamaz",
      errorEmailFormat: "Geçersiz e-posta formatı (@ bulunmalı)",
      errorPasswordEmpty: "Şifre boş bırakılamaz"
    },
    register: {
      title: "Kayıt Ol",
      subtitle: "Yeni bir hesap oluşturun.",
      name: "Ad Soyad",
      username: "Kullanıcı Adı",
      password: "Şifre",
      passwordConfirm: "Şifre Tekrar",
      submitBtn: "Kayıt Ol",
      backToLogin: "Zaten hesabınız var mı? Giriş Yapın",
      errorFields: "Lütfen tüm alanları doldurun.",
      errorMatch: "Şifreler eşleşmiyor!",
      success: "Kayıt başarılı! Yönlendiriliyorsunuz...",
      journey: "Yolculuğa başlayın",
      createAccount: "Yeni bir hesap oluşturun",
      email: "E-posta",
      alreadyHaveAccount: "Zaten bir hesabınız var mı?",
      errorFirstNameEmpty: "Ad alanı boş bırakılamaz",
      errorLastNameEmpty: "Soyad alanı boş bırakılamaz",
      errorConfirmPasswordEmpty: "Şifre tekrarı boş bırakılamaz",
      errorEmailExists: "Bu e-posta adresi zaten kayıtlı!"
    },
    sidebar: {
      dashboard: "Özet Paneli",
      inventoryList: "Ürün Listesi",
      addProduct: "Ürün Ekle",
      aboutUs: "Hakkımızda",
      logout: "Çıkış Yap",
      logoutConfirm: "Çıkış yapmak istediğinize emin misiniz?",
    },
    dashboard: {
      title: "Özet Paneli",
      subtitle: "Envanter durumunuza hızlı bir bakış atın.",
      totalProducts: "Toplam Ürün",
      inStock: "Stokta",
      criticalStock: "Kritik Stok",
      categories: "Kategoriler",
      all: "Tümü",
      emptyFilter: "Bu kategoride ürün bulunmuyor.",
    },
    inventory: {
      title: "Envanter Listesi",
      subtitle: "Ürünleri görüntüleyin ve sıralayın. Detay için görsele tıklayın.",
      searchPlaceholder: "Ürün adı, kategori veya SKU ara...",
      sortLabel: "Sırala",
      emptySearch: "Aramanızla eşleşen ürün bulunamadı.",
    },
    addProductPage: {
      title: "Ürün Ekle",
      subtitle: "Yeni ürün eklemek için + kutusuna tıklayın.",
      newProduct: "Yeni Ürün",
      modalTitle: "Yeni Ürün Bilgileri",
      modalSubtitle: "Görsel, isim, kategori, stok miktarı ve açıklama girin.",
      productName: "Ürün Adı",
      category: "Kategori",
      stock: "Stok Miktarı",
      image: "Ürün Görseli",
      description: "Açıklama",
      defectNotes: "Hata / Durum Notu",
      cancel: "İptal",
      save: "Ürünü Kaydet",
      successMsg: "Ürün başarıyla eklendi",
      errorName: "Ürün adı boş bırakılamaz",
      errorImage: "Ürün görseli eklenmelidir",
      errorStock: "Geçerli bir stok miktarı giriniz",
      editTitle: "Ürünü Düzenle",
      editSubtitle: "Ürün bilgilerini güncelleyin.",
      saveChanges: "Değişiklikleri Kaydet",
      deleteConfirm: "Bu ürünü silmek istediğinize emin misiniz?",
    },
    productDetail: {
      back: "← Envanter listesine dön",
      descTitle: "Açıklama",
      noDesc: "Açıklama eklenmemiş.",
      defectTitle: "Hata / Durum Notu",
      noDefect: "Herhangi bir hata veya durum notu girilmemiş.",
      reviewTitle: "Ürün İnceleme",
      reviewDesc: "Bu ekranda seçilen ürünün görseli ve tüm detayları görüntülenir.",
      notFound: "Ürün bulunamadı",
      deleteBtn: "Ürünü Sil",
      editBtn: "Ürünü Düzenle",
      deleteConfirmTitle: "Ürünü Sil?",
      deleteConfirmDesc: "Bu ürünü envanterden kalıcı olarak silmek istediğinize emin misiniz?",
      cancel: "Vazgeç",
    },
    aboutUsPage: {
      title1: "🏢 Biz Kimiz? (TEİN Teknoloji)",
      text1_1: "2017 yılında Birleşik Krallık'ta temelleri atılan ve 2020 yılından itibaren yoluna TEİN Teknoloji olarak devam eden şirketimiz, dijital dönüşümü sadece bir araç değil, bir vizyon olarak benimsemektedir. Merkez ofisini teknoloji ve inovasyonun kalbinde, Düzce Teknopark'ta konumlandıran firmamız; bankacılık, e-ticaret, telekomünikasyon ve sanal gerçeklik gibi birçok farklı sektörde global ölçekte yenilikçi BT çözümleri sunmaktadır.",
      text1_2: "Yerel yetenekleri keşfederek dünya sahnesine hazırlayan TEİN Teknoloji, istikrarlı büyümesi ve Ar-Ge yatırımlarıyla Türkiye'nin en büyük bilişim şirketleri listelerinde üst sıralarda yer almanın gururunu taşımaktadır.",
      title2: "🎯 Vizyon & Misyon",
      text2_1: "Vizyonumuz: Güçlü altyapımız ve yenilikçi bakış açımızla, Türkiye'den yükselen ve global teknoloji dünyasına yön veren dijital bir köprü olmak.",
      text2_2: "Misyonumuz: İş ortaklarımıza yüksek güvenlikli, ölçeklenebilir ve sürdürülebilir yazılım çözümleri sunarken, teknolojiyi operasyonel süreçleri kusursuzlaştıran bir ekosisteme dönüştürmek.",
      title3: "📦 EnvanterTakip Projesi Hakkında",
      text3: "Kurumsal operasyonlarımızın hızına ivme kazandırmak, donanım ve cihaz yönetimini güvenilir bir dijital zemine oturtmak amacıyla geliştirilen EnvanterTakip sistemi, yenilikçi geliştirme vizyonumuzun bir ürünüdür. Modern arayüzü, dinamik özet paneli ve anlık stok takip özellikleriyle bu platform; şirketimizin şeffaflık, hız ve operasyonel verimlilik hedeflerinin en somut örneklerinden biridir."
    },
    categories: {
      "Bilgisayar": "Bilgisayar",
      "Mouse": "Mouse",
      "Klavye": "Klavye",
      "Kulaklık": "Kulaklık",
      "Diğer": "Diğer"
    },
    products: {
      "Dizüstü Bilgisayar": "Dizüstü Bilgisayar",
      "Kablosuz Mouse": "Kablosuz Mouse",
      "Mekanik Klavye": "Mekanik Klavye",
      "27\" Monitör": "27\" Monitör",
      "USB-C Hub": "USB-C Hub",
      "Yazıcı": "Yazıcı",
      "Webcam HD": "Webcam HD",
      "Kulaklık": "Kulaklık"
    },
    descriptions: {
      "Ofis kullanımı için dizüstü bilgisayar.": "Ofis kullanımı için dizüstü bilgisayar.",
      "Ergonomik kablosuz mouse.": "Ergonomik kablosuz mouse.",
      "Mekanik switch klavye.": "Mekanik switch klavye.",
      "27 inç geniş ekran monitör.": "27 inç geniş ekran monitör.",
      "Çoklu port USB-C hub.": "Çoklu port USB-C hub.",
      "Lazer yazıcı.": "Lazer yazıcı.",
      "HD görüntülü toplantı kamerası.": "HD görüntülü toplantı kamerası.",
      "Gürültü önleyici kulaklık.": "Gürültü önleyici kulaklık."
    },
    placeholders: {
      productName: "Örn: Dizüstü Bilgisayar",
      stock: "Örn: 25",
      imageUrl: "veya görsel URL'si yapıştırın",
      description: "Ürün hakkında kısa açıklama",
      defectNotes: "Örn: Ekran kırık, pil şişmiş"
    }
  },
  en: {
    login: {
      title: "Login",
      username: "Username",
      password: "Password",
      loginBtn: "Login",
      registerBtn: "Register",
      noAccount: "Don't have an account?",
      errorMsg: "Invalid username or password!",
      welcomeBack: "Welcome back!",
      enterDetails: "Please enter your details",
      email: "Email",
      rememberMe: "Remember me",
      forgotPassword: "Forgot password?",
      googleLogin: "Log in with Google",
      signUp: "Sign up",
      errorEmailEmpty: "Email cannot be empty",
      errorEmailFormat: "Invalid email format (must contain @)",
      errorPasswordEmpty: "Password cannot be empty"
    },
    register: {
      title: "Register",
      subtitle: "Create a new account.",
      name: "Full Name",
      username: "Username",
      password: "Password",
      passwordConfirm: "Confirm Password",
      submitBtn: "Register",
      backToLogin: "Already have an account? Login",
      errorFields: "Please fill in all fields.",
      errorMatch: "Passwords do not match!",
      success: "Registration successful! Redirecting...",
      journey: "Start your journey",
      createAccount: "Create a new account",
      email: "Email",
      alreadyHaveAccount: "Already have an account?",
      errorFirstNameEmpty: "First name cannot be empty",
      errorLastNameEmpty: "Last name cannot be empty",
      errorConfirmPasswordEmpty: "Confirm password cannot be empty",
      errorEmailExists: "This email address is already registered!"
    },
    sidebar: {
      dashboard: "Dashboard",
      inventoryList: "Product List",
      addProduct: "Add Product",
      aboutUs: "About Us",
      logout: "Logout",
      logoutConfirm: "Are you sure you want to logout?",
    },
    dashboard: {
      title: "Dashboard",
      subtitle: "Quick look at your inventory status.",
      totalProducts: "Total Products",
      inStock: "In Stock",
      criticalStock: "Critical Stock",
      categories: "Categories",
      all: "All",
      emptyFilter: "No products in this category.",
    },
    inventory: {
      title: "Inventory List",
      subtitle: "View and sort products. Click on image for details.",
      searchPlaceholder: "Search product name, category or SKU...",
      sortLabel: "Sort",
      emptySearch: "No products found matching your search.",
    },
    addProductPage: {
      title: "Add Product",
      subtitle: "Click + tile to add a new product.",
      newProduct: "New Product",
      modalTitle: "New Product Info",
      modalSubtitle: "Enter image, name, category, stock and description.",
      productName: "Product Name",
      category: "Category",
      stock: "Stock Quantity",
      image: "Product Image",
      description: "Description",
      defectNotes: "Defect / Status Notes",
      cancel: "Cancel",
      save: "Save Product",
      successMsg: "Product successfully added",
      errorName: "Product name cannot be empty",
      errorImage: "Product image is required",
      errorStock: "Please enter a valid stock quantity",
      editTitle: "Edit Product",
      editSubtitle: "Update product details.",
      saveChanges: "Save Changes",
      deleteConfirm: "Are you sure you want to delete this product?",
    },
    productDetail: {
      back: "← Back to inventory list",
      descTitle: "Description",
      noDesc: "No description provided.",
      defectTitle: "Defect / Status Notes",
      noDefect: "No defects or status notes reported.",
      reviewTitle: "Product Review",
      reviewDesc: "This screen shows the image and all details of the selected product.",
      notFound: "Product not found",
      deleteBtn: "Delete Product",
      editBtn: "Edit Product",
      deleteConfirmTitle: "Delete Product?",
      deleteConfirmDesc: "Are you sure you want to permanently delete this product from the inventory?",
      cancel: "Cancel",
    },
    aboutUsPage: {
      title1: "🏢 Who We Are? (TEİN Technology)",
      text1_1: "Laid its foundations in the UK in 2017 and continuing its way as TEİN Technology since 2020, our company adopts digital transformation not just as a tool but as a vision. Positioned in the heart of technology and innovation, Düzce Teknopark, our firm offers global-scale BT solutions in various sectors including banking, e-commerce, telecommunications, and virtual reality.",
      text1_2: "Discovering local talent and preparing them for the world stage, TEİN Technology is proud to be ranked at the top of Turkey's largest IT companies lists through its stable growth and R&D investments.",
      title2: "🎯 Vision & Mission",
      text2_1: "Our Vision: To be a digital bridge rising from Turkey and shaping the global technology world with our strong infrastructure and innovative perspective.",
      text2_2: "Our Mission: To turn technology into an ecosystem that perfects operational processes while providing high-security, scalable and sustainable software solutions to our business partners.",
      title3: "📦 About EnvanterTakip Project",
      text3: "Developed to accelerate our corporate operations and put hardware and device management on a reliable digital ground, the EnvanterTakip system is a product of our innovative development vision. With its modern interface, dynamic summary panel, and instant stock tracking features, this platform is one of the most concrete examples of our company's transparency, speed, and operational efficiency goals."
    },
    categories: {
      "Bilgisayar": "Computer",
      "Mouse": "Mouse",
      "Klavye": "Keyboard",
      "Kulaklık": "Headphones",
      "Diğer": "Other"
    },
    products: {
      "Dizüstü Bilgisayar": "Laptop Computer",
      "Kablosuz Mouse": "Wireless Mouse",
      "Mekanik Klavye": "Mechanical Keyboard",
      "27\" Monitör": "27\" Monitor",
      "USB-C Hub": "USB-C Hub",
      "Yazıcı": "Printer",
      "Webcam HD": "HD Webcam",
      "Kulaklık": "Headphones"
    },
    descriptions: {
      "Ofis kullanımı için dizüstü bilgisayar.": "Laptop computer for office use.",
      "Ergonomik kablosuz mouse.": "Ergonomic wireless mouse.",
      "Mekanik switch klavye.": "Mechanical switch keyboard.",
      "27 inç geniş ekran monitör.": "27-inch widescreen monitor.",
      "Çoklu port USB-C hub.": "Multi-port USB-C hub.",
      "Lazer yazıcı.": "Laser printer.",
      "HD görüntülü toplantı kamerası.": "HD video conference camera.",
      "Gürültü önleyici kulaklık.": "Noise-cancelling headphones."
    },
    placeholders: {
      productName: "e.g. Laptop Computer",
      stock: "e.g. 25",
      imageUrl: "or paste image URL",
      description: "Short description of the product",
      defectNotes: "e.g. Broken screen, swollen battery"
    }
  },
  es: {
    login: {
      title: "Iniciar sesión",
      username: "Nombre de usuario",
      password: "Contraseña",
      loginBtn: "Iniciar sesión",
      registerBtn: "Registrarse",
      noAccount: "¿No tienes una cuenta?",
      errorMsg: "¡Usuario o contraseña inválidos!",
      welcomeBack: "¡Bienvenido de nuevo!",
      enterDetails: "Por favor ingrese sus detalles",
      email: "Correo electrónico",
      rememberMe: "Recuérdame",
      forgotPassword: "¿Olvidó su contraseña?",
      googleLogin: "Iniciar sesión con Google",
      signUp: "Registrarse",
      errorEmailEmpty: "El correo electrónico no puede estar vacío",
      errorEmailFormat: "Formato de correo inválido (debe contener @)",
      errorPasswordEmpty: "La contraseña no puede estar vacía"
    },
    register: {
      title: "Registrarse",
      subtitle: "Crea una nueva cuenta.",
      name: "Nombre Completo",
      username: "Nombre de usuario",
      password: "Contraseña",
      passwordConfirm: "Confirmar Contraseña",
      submitBtn: "Registrarse",
      backToLogin: "¿Ya tienes una cuenta? Iniciar sesión",
      errorFields: "Por favor complete todos los campos.",
      errorMatch: "¡Las contraseñas no coinciden!",
      success: "¡Registro exitoso! Redirigiendo...",
      journey: "Comienza tu viaje",
      createAccount: "Crea una nueva cuenta",
      email: "Correo electrónico",
      alreadyHaveAccount: "¿Ya tienes una cuenta?",
      errorFirstNameEmpty: "El primer nombre no puede estar vacío",
      errorLastNameEmpty: "El apellido no puede estar vacío",
      errorConfirmPasswordEmpty: "La confirmación de contraseña no puede estar vacía"
    },
    sidebar: {
      dashboard: "Panel de resumen",
      inventoryList: "Lista de productos",
      addProduct: "Añadir producto",
      aboutUs: "Sobre nosotros",
      logout: "Cerrar sesión",
      logoutConfirm: "¿Estás seguro de que quieres cerrar sesión?",
    },
    dashboard: {
      title: "Panel de resumen",
      subtitle: "Un vistazo rápido al estado de su inventario.",
      totalProducts: "Total de productos",
      inStock: "En stock",
      criticalStock: "Stock crítico",
      categories: "Categorías",
      all: "Todo",
      emptyFilter: "No hay productos en esta categoría.",
    },
    inventory: {
      title: "Lista de inventario",
      subtitle: "Ver y ordenar productos. Haga clic en la imagen para ver los detalles.",
      searchPlaceholder: "Buscar nombre de producto, categoría o SKU...",
      sortLabel: "Ordenar",
      emptySearch: "No se encontraron productos que coincidan con su búsqueda.",
    },
    addProductPage: {
      title: "Añadir producto",
      subtitle: "Haga clic en el botón + para añadir un nuevo producto.",
      newProduct: "Nuevo Producto",
      modalTitle: "Información del nuevo producto",
      modalSubtitle: "Ingrese la imagen, el nombre, la categoría, el stock y la descripción.",
      productName: "Nombre del producto",
      category: "Categoría",
      stock: "Cantidad de stock",
      image: "Imagen del producto",
      description: "Descripción",
      defectNotes: "Notas de defectos / estado",
      cancel: "Cancelar",
      save: "Guardar producto",
      successMsg: "Producto añadido con éxito",
      errorName: "El nombre del producto no puede estar vacío",
      errorImage: "La imagen del producto es obligatoria",
      errorStock: "Ingrese una cantidad de stock válida",
      editTitle: "Editar producto",
      editSubtitle: "Actualizar detalles del producto.",
      saveChanges: "Guardar cambios",
      deleteConfirm: "¿Estás seguro de que deseas eliminar este producto?",
    },
    productDetail: {
      back: "← Volver a la lista de inventario",
      descTitle: "Descripción",
      noDesc: "No se proporcionó descripción.",
      defectTitle: "Notas de defectos / estado",
      noDefect: "No se informaron defectos ni notas de estado.",
      reviewTitle: "Revisión del producto",
      reviewDesc: "Esta pantalla muestra la imagen y todos los detalles del producto seleccionado.",
      notFound: "Producto no encontrado",
      deleteBtn: "Eliminar producto",
      editBtn: "Editar producto",
      deleteConfirmTitle: "¿Eliminar producto?",
      deleteConfirmDesc: "¿Está seguro de que desea eliminar permanentemente este producto del inventario?",
      cancel: "Cancelar",
    },
    aboutUsPage: {
      title1: "🏢 ¿Quiénes somos? (TEİN Technology)",
      text1_1: "Sentando sus bases en el Reino Unido en 2017 y continuando su camino como TEİN Technology desde 2020, nuestra empresa adopta la transformación digital no solo como una herramienta sino como una visión. Ubicada en el corazón de la tecnología y la innovación, Düzce Teknopark, nuestra firma ofrece soluciones BT a escala global en diversos sectores como banca, comercio electrónico, telecomunicaciones y realidad virtual.",
      text1_2: "Descubriendo talento local y preparándolo para el escenario mundial, TEİN Technology se enorgullece de estar en la cima de las listas de las mayores empresas de TI de Turquía gracias a su crecimiento estable y sus inversiones en I+D.",
      title2: "🎯 Visión y Misión",
      text2_1: "Nuestra visión: Ser un puente digital que surge de Turquía y da forma al mundo tecnológico global con nuestra sólida infraestructura y perspectiva innovadora.",
      text2_2: "Nuestra misión: Convertir la tecnología en un ecosistema que perfeccione los procesos operativos al tiempo que brinda soluciones de software de alta seguridad, escalables y sostenibles a nuestros socios comerciales.",
      title3: "📦 Acerca del proyecto EnvanterTakip",
      text3: "Desarrollado para acelerar nuestras operaciones corporativas y colocar la gestión de hardware y dispositivos sobre una base digital confiable, el sistema EnvanterTakip es un producto de nuestra visión de desarrollo innovador. Con su interfaz moderna, panel de resumen dinámico y funciones de seguimiento de stock instantáneo, esta plataforma es uno de los ejemplos más concretos de los objetivos de transparencia, velocidad y eficiencia operativa de nuestra empresa."
    },
    categories: {
      "Bilgisayar": "Ordenador",
      "Mouse": "Ratón",
      "Klavye": "Teclado",
      "Kulaklık": "Auriculares",
      "Diğer": "Otros"
    },
    products: {
      "Dizüstü Bilgisayar": "Ordenador portátil",
      "Kablosuz Mouse": "Ratón inalámbrico",
      "Mekanik Klavye": "Teclado mecánico",
      "27\" Monitör": "Monitor de 27\"",
      "USB-C Hub": "Hub USB-C",
      "Yazıcı": "Impresora",
      "Webcam HD": "Cámara web HD",
      "Kulaklık": "Auriculares"
    },
    descriptions: {
      "Ofis kullanımı için dizüstü bilgisayar.": "Ordenador portátil para uso de oficina.",
      "Ergonomik kablosuz mouse.": "Ratón inalámbrico ergonómico.",
      "Mekanik switch klavye.": "Teclado con interruptores mecánicos.",
      "27 inç geniş ekran monitör.": "Monitor de pantalla ancha de 27 pulgadas.",
      "Çoklu port USB-C hub.": "Hub USB-C multipuerto.",
      "Lazer yazıcı.": "Impresora láser.",
      "HD görüntülü toplantı kamerası.": "Cámara de videoconferencia HD.",
      "Gürültü önleyici kulaklık.": "Auriculares con cancelación de ruido."
    },
    placeholders: {
      productName: "Ej: Ordenador portátil",
      stock: "Ej: 25",
      imageUrl: "o pegue la URL de la imagen",
      description: "Breve descripción del producto",
      defectNotes: "Ej: Pantalla rota, batería hinchada"
    }
  },
  ar: {
    login: {
      title: "تسجيل الدخول",
      username: "اسم المستخدم",
      password: "كلمة المرور",
      loginBtn: "تسجيل الدخول",
      registerBtn: "إنشاء حساب",
      noAccount: "ليس لديك حساب؟",
      errorMsg: "اسم المستخدم أو كلمة المرور غير صالحة!",
      welcomeBack: "مرحباً بعودتك!",
      enterDetails: "يرجى إدخال البيانات الخاصة بك",
      email: "البريد الإلكتروني",
      rememberMe: "تذكرني",
      forgotPassword: "هل نسيت كلمة المرور؟",
      googleLogin: "تسجيل الدخول باستخدام جوجل",
      signUp: "تسجيل حساب",
      errorEmailEmpty: "البريد الإلكتروني لا يمكن أن يكون فارغاً",
      errorEmailFormat: "صيغة البريد الإلكتروني غير صالحة (يجب أن تحتوي على @)",
      errorPasswordEmpty: "كلمة المرور لا يمكن أن تكون فارغة"
    },
    register: {
      title: "إنشاء حساب",
      subtitle: "إنشاء حساب جديد.",
      name: "الاسم الكامل",
      username: "اسم المستخدم",
      password: "كلمة المرور",
      passwordConfirm: "تأكيد كلمة المرور",
      submitBtn: "تسجيل حساب",
      backToLogin: "لديك حساب بالفعل؟ تسجيل الدخول",
      errorFields: "يرجى ملء جميع الحقول.",
      errorMatch: "كلمات المرور غير متطابقة!",
      success: "تم التسجيل بنجاح! جاري التوجيه...",
      journey: "ابدأ رحلتك",
      createAccount: "إنشاء حساب جديد",
      email: "البريد الإلكتروني",
      alreadyHaveAccount: "هل لديك حساب بالفعل؟",
      errorFirstNameEmpty: "الاسم الأول لا يمكن أن يكون فارغاً",
      errorLastNameEmpty: "الاسم الأخير لا يمكن أن يكون فارغاً",
      errorConfirmPasswordEmpty: "تأكيد كلمة المرور لا يمكن أن يكون فارغاً"
    },
    sidebar: {
      dashboard: "لوحة الملخص",
      inventoryList: "قائمة المنتجات",
      addProduct: "إضافة منتج",
      aboutUs: "معلومات عنا",
      logout: "تسجيل الخروج",
      logoutConfirm: "هل أنت متأكد أنك تريد تسجيل الخروج؟",
    },
    dashboard: {
      title: "لوحة الملخص",
      subtitle: "نظرة سريعة على حالة المخزون الخاص بك.",
      totalProducts: "إجمالي المنتجات",
      inStock: "في المخزن",
      criticalStock: "المخزون الحرج",
      categories: "الفئات",
      all: "الكل",
      emptyFilter: "لا توجد منتجات في هذه الفئة.",
    },
    inventory: {
      title: "قائمة المخزون",
      subtitle: "عرض وفرز المنتجات. انقر على الصورة للحصول على التفاصيل.",
      searchPlaceholder: "البحث عن اسم المنتج، الفئة أو رمز SKU...",
      sortLabel: "فرز",
      emptySearch: "لم يتم العثور على منتجات مطابقة لبحثك.",
    },
    addProductPage: {
      title: "إضافة منتج",
      subtitle: "انقر على مربع + لإضافة منتج جديد.",
      newProduct: "منتج جديد",
      modalTitle: "معلومات المنتج الجديد",
      modalSubtitle: "أدخل الصورة والاسم والفئة والكمية والوصف.",
      productName: "اسم المنتج",
      category: "الفئة",
      stock: "كمية المخزون",
      image: "صورة المنتج",
      description: "الوصف",
      defectNotes: "ملاحظات العيوب / الحالة",
      cancel: "إلغاء",
      save: "حفظ المنتج",
      successMsg: "تم إضافة المنتج بنجاح",
      errorName: "لا يمكن أن يكون اسم المنتج فارغًا",
      errorImage: "صورة المنتج مطلوبة",
      errorStock: "يرجى إدخال كمية مخزون صالحة",
      editTitle: "تعديل المنتج",
      editSubtitle: "تحديث تفاصيل المنتج.",
      saveChanges: "حفظ التغييرات",
      deleteConfirm: "هل أنت متأكد أنك تريد حذف هذا المنتج؟",
    },
    productDetail: {
      back: "← العودة إلى قائمة المخزون",
      descTitle: "الوصف",
      noDesc: "لم يتم تقديم وصف.",
      defectTitle: "ملاحظات العيوب / الحالة",
      noDefect: "لم يتم الإبلاغ عن أي عيوب أو ملاحظات حالة.",
      reviewTitle: "مراجعة المنتج",
      reviewDesc: "تعرض هذه الشاشة الصورة وجميع تفاصيل المنتج المحدد.",
      notFound: "المنتج غير موجود",
      deleteBtn: "حذف المنتج",
      editBtn: "تعديل المنتج",
      deleteConfirmTitle: "حذف المنتج؟",
      deleteConfirmDesc: "هل أنت متأكد أنك تريد حذف هذا المنتج نهائيًا من المخزن؟",
      cancel: "إلغاء",
    },
    aboutUsPage: {
      title1: "🏢 من نحن؟ (TEİN للاتصالات والتكنولوجيا)",
      text1_1: "تأسست شركتنا في المملكة المتحدة عام 2017، وواصلت مسيرتها باسم TEİN Technology منذ عام 2020، وهي تتبنى التحول الرقمي ليس كمجرد أداة بل كرؤية. يقع مقرنا الرئيسي في قلب التكنولوجيا والابتكار، Düzce Teknopark، وتقدم شركتنا حلول تكنولوجيا معلومات على نطاق عالمي في قطاعات مختلفة بما في ذلك الخدمات المصرفية والتجارة الإلكترونية والاتصالات والواقع الافتراضي.",
      text1_2: "تفتخر شركة TEİN Technology، التي تكتشف المواهب المحلية وتعدها للمسرح العالمي، بتصنيفها في مقدمة قوائم أكبر شركات تكنولوجيا المعلومات في تركيا من خلال نموها المستقر واستثماراتها في البحث والتطوير.",
      title2: "🎯 الرؤية والرسالة",
      text2_1: "رؤيتنا: أن نكون جسرًا رقميًا ينطلق من تركيا ويوجه عالم التكنولوجيا العالمي ببنيتنا التحتية القوية ومنظورنا المبتكر.",
      text2_2: "رسالتنا: تحويل التكنولوجيا إلى نظام بيئي يحسن العمليات التشغيلية مع تقديم حلول برمجية عالية الأمان وقابلة للتوسع ومستدامة لشركائنا التجاريين.",
      title3: "📦 حول مشروع EnvanterTakip",
      text3: "تم تطوير نظام EnvanterTakip لتسريع عملياتنا المؤسسية ووضع إدارة الأجهزة والمعدات على أرضية رقمية موثوقة، وهو نتاج رؤيتنا التنموية المبتكرة. بفضل واجهته الحديثة، ولوحة الملخص الديناميكية، وميزات تتبع المخزون الفوري، تعد هذه المنصة واحدة من أكثر الأمثلة الملموسة على أهداف الشفافية والسرعة والكفاءة التشغيلية لشركتنا."
    },
    categories: {
      "Bilgisayar": "كمبيوتر",
      "Mouse": "ماوس",
      "Klavye": "لوحة المفاتيح",
      "Kulaklık": "سماعات",
      "Diğer": "أخرى"
    },
    products: {
      "Dizüstü Bilgisayar": "كمبيوتر محمول",
      "Kablosuz Mouse": "ماوس لاسلكي",
      "Mekanik Klavye": "لوحة مفاتيح ميكانيكية",
      "27\" Monitör": "شاشة ٢٧ بوصة",
      "USB-C Hub": "موزع يو إس بي سي",
      "Yazıcı": "طابعة",
      "Webcam HD": "كاميرا ويب عالية الدقة",
      "Kulaklık": "سماعات الرأس"
    },
    descriptions: {
      "Ofis kullanımı için dizüstü bilgisayar.": "كمبيوتر محمول للاستخدام المكتبي.",
      "Ergonomik kablosuz mouse.": "ماوس لاسلكي مريح.",
      "Mekanik switch klavye.": "لوحة مفاتيح ذات مفاتيح ميكانيكية.",
      "27 inç geniş ekran monitör.": "شاشة عريضة مقاس ٢٧ بوصة.",
      "Çoklu port USB-C hub.": "موزع يو إس بي سي متعدد المنافذ.",
      "Lazer yazıcı.": "طابعة ليزر.",
      "HD görüntülü toplantı kamerası.": "كاميرا ويب عالية الدقة للمؤتمرات.",
      "Gürültü önleyici kulaklık.": "سماعات رأس عازلة للضوضاء."
    },
    placeholders: {
      productName: "مثال: كمبيوتر محمول",
      stock: "مثال: ٢٥",
      imageUrl: "أو الصق رابط الصورة",
      description: "وصف قصير عن المنتج",
      defectNotes: "مثال: الشاشة مكسورة، البطارية منتفخة"
    }
  }
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('envanter_lang') || 'tr';
  });

  const [dynamicTranslations, setDynamicTranslations] = useState(() => getDynamicTranslations());

  useEffect(() => {
    localStorage.setItem('envanter_lang', lang);
    document.documentElement.dir = 'ltr';
  }, [lang]);

  useEffect(() => {
    const handleUpdate = () => {
      setDynamicTranslations(getDynamicTranslations());
    };
    window.addEventListener('dynamic-translations-updated', handleUpdate);
    return () => {
      window.removeEventListener('dynamic-translations-updated', handleUpdate);
    };
  }, []);

  const t = (path, defaultValue) => {
    const keys = path.split('.');
    let current = translations[lang];
    let found = true;
    for (const key of keys) {
      if (current === undefined || current[key] === undefined) {
        found = false;
        break;
      }
      current = current[key];
    }
    if (found) return current;

    // Dinamik çeviri araması
    const isProduct = path.startsWith('products.');
    const isDesc = path.startsWith('descriptions.');
    if (isProduct || isDesc) {
      const originalText = isProduct ? path.substring(9) : path.substring(13);
      if (dynamicTranslations[originalText] && dynamicTranslations[originalText][lang]) {
        return dynamicTranslations[originalText][lang];
      }
    }

    return defaultValue !== undefined ? defaultValue : path;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  return useContext(LanguageContext);
}
