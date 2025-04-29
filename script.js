document.addEventListener('DOMContentLoaded', () => {

    // --- 导航栏滚动效果 ---
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- 移动端汉堡菜单 ---
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link'); // 获取所有导航链接

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // 点击导航链接后关闭菜单 (移动端)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
            // 更新active状态 (可选，如果需要滚动时自动更新高亮)
            // updateActiveNavLink(link);
        });
    });

    // --- 滚动到目标区域后添加高亮 --- (可选，增强体验)
    const sections = document.querySelectorAll('section[id]'); // 获取所有带ID的section

    function updateActiveNavLink() {
        let currentSection = '';
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 80; // 考虑导航栏高度和偏移
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                currentSection = sectionId;
            }
        });

        // 处理 Hero Section 的特殊情况 (页面顶部)
        if (scrollY < sections[0].offsetTop - 80 && sections[0].id === 'hero') {
             currentSection = 'hero';
        }
        // 处理滚动到页面底部，最后一个section仍是active的情况
        else if (scrollY + window.innerHeight >= document.documentElement.scrollHeight - 50) { // 接近底部
            currentSection = sections[sections.length - 1].getAttribute('id');
        }


        navLinks.forEach(link => {
            link.classList.remove('active');
            // link.href 包含 #, 需要去除
            if (link.getAttribute('href').substring(1) === currentSection) {
                link.classList.add('active');
            }
        });
        // 如果没有匹配的section (比如滚动到footer)，移除所有active
        if (!currentSection && scrollY > 50) { // 避免页面加载时清除hero的active
            navLinks.forEach(link => link.classList.remove('active'));
            // 如果需要，可以在滚动到footer时高亮contact
            // const contactLink = document.querySelector('.nav-link[href="#contact"]');
            // if (contactLink && scrollY + window.innerHeight >= document.querySelector('#contact').offsetTop) {
            //     contactLink.classList.add('active');
            // }
        } else if (!currentSection && scrollY <= 50){
             // 确保首页链接在顶部时是 active
             const homeLink = document.querySelector('.nav-link[href="#hero"]');
             if(homeLink) homeLink.classList.add('active');
        }
    }

    // 页面加载和滚动时更新导航栏高亮
    window.addEventListener('scroll', updateActiveNavLink);
    window.addEventListener('load', updateActiveNavLink); // 初始加载时也执行一次

    // --- 元素滚动进入视口动画 (Intersection Observer) ---
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // 可选：动画触发一次后取消观察，提高性能
                // observer.unobserve(entry.target);
            }
            // 可选：如果希望元素离开视口后再次隐藏，可以取消下面的注释
            // else {
            //     entry.target.classList.remove('visible');
            // }
        });
    }, {
        threshold: 0.1 // 元素进入视口10%时触发
        // rootMargin: '-50px 0px' // 可以调整触发区域
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

     // Lan Toggle Stuff en,cn,
 
  // extended i18n dictionary
  const T = {
    en: {
      homepage:        "Home",
      product:         "Product",
      about_us:        "About Us",
      core_services:   "Core Services",
      why_us:          "Why Tianxiang",
      contact_us:      "Contact Us",
      hero_title:      "Building Dreams, Creating Futures.",
      hero_sub:        "Tianxiang International - Your Trusted Global construction Partner",
      request_quote:   "Request a Quote",
      about_title:     "About Tianxiang International",
      about_p1:        "Tianxiang International is a leading import and export company specializing in construction materials, dedicated to providing high-quality products and tailored solutions to clients worldwide.",
      about_p2:        "With years of industry experience, a strong global network, and a professional team, we ensure that our materials meet the highest standards and are delivered reliably and efficiently. We focus on flooring, lighting, building supplies, and more, always putting our clients first, driving innovation, and striving for excellence in everything we do.",
      discover_more:   "Discover More",
      services_title:  "Core Services",
      svc1_title:      "Interior Material Consultation",
      svc1_desc:       "Expert advice to help you select the best flooring, wall coverings, and lighting solutions tailored to your project’s style and functionality needs.",
      svc2_title:      "Flooring & Wall Solutions",
      svc2_desc:       "Wide selection of premium floors, wallpapers, and wall panels, with professional recommendations to bring your design vision to life.",
      svc3_title:      "Lighting Solutions",
      svc3_desc:       "Modern and classic lighting options to enhance every space, from ambient to accent lighting, customized to your design and installation needs.",
      svc4_title:      "Material Sourcing & Custom Orders",
      svc4_desc:       "Access to a vast network of high-quality suppliers for custom flooring, wall, and lighting materials, ensuring unique solutions for every project.",
      svc5_title:      "Project Coordination Support",
      svc5_desc:       "Assistance with planning and coordinating material deliveries, installation schedules, and design timelines to ensure smooth project execution.",
      svc6_title:      "After-Sales Service & Warranty Support",
      svc6_desc:       "Reliable after-sales care including warranty handling, material maintenance guidance, and support for future upgrades or replacements.",
      why_title:       "Why Choose Tianxiang International?",
      feat1_title:     "Global Reach",
      feat1_desc:      "We supply construction materials to major markets worldwide, ensuring seamless international distribution and reliable service.",
      feat2_title:     "Industry Expertise",
      feat2_desc:      "Our experienced team has deep knowledge in sourcing, exporting, and handling a wide range of construction materials for diverse project needs.",
      feat3_title:     "Reliable Quality",
      feat3_desc:      "We adhere to strict quality standards, ensuring that every product we deliver meets safety, durability, and regulatory requirements.",
      feat4_title:     "Dedicated Support",
      feat4_desc:      "We provide one-on-one customer service with quick responses, keeping you informed throughout the entire supply and delivery process.",
      feat5_title:     "Sustainability Commitment",
      feat5_desc:      "We prioritize eco-friendly materials and sustainable sourcing practices, supporting green construction projects around the world.",
      feat6_title:     "Material Sourcing Flexibility",
      feat6_desc:      "We offer flexible sourcing options tailored to your project’s specific material needs, ensuring you get the right products at the right time.",
      feat7_title:     "Technology-Driven",
      feat7_desc:      "Leveraging advanced systems for inventory tracking and order management, we offer transparency and convenience at every step.",
      feat8_title:     "Long-Term Partnerships",
      feat8_desc:      "We are committed to building lasting relationships with our clients, growing together and creating mutual success in every project.",
      contact_title:   "Contact & Quote",
      contact_sub:     "Our professional team is always ready to assist you. Please fill out the form below or contact us using the information provided.",
      your_name:       "Your Name *",
      your_email:      "Email *",
      your_phone:      "Phone Number",
      your_company:    "Name of the Company",
      your_message:    "Please describe your needs *",
      submit_inquiry:  "Submit Inquiry",
      info_title:      "Contact Information",
      info_addr:       "Address: 113 5718 1a St SW",
      info_phone:      "Phone: +1 [company’s number]",
      info_fax:        "Fax: +1 [company’s fax]",
      info_email:      "Email: info@tianxiang.com",
      footer_text:     "© 2024 | Tianxiang International. All Rights Reserved."
    },
    zh: {
      homepage:        "首页",
      product:         "产品",
      about_us:        "关于我们",
      core_services:   "核心服务",
      why_us:          "为何选择天翔国际",
      contact_us:      "联系我们",
      hero_title:      "建设梦想，创造未来。",
      hero_sub:        "天翔国际 — 您值得信赖的全球建材伙伴",
      request_quote:   "请求报价",
      about_title:     "关于天翔国际",
      about_p1:        "天翔国际是一家领先的进出口公司，专注于建筑材料，为全球客户提供高品质产品和定制化解决方案。",
      about_p2:        "凭借多年行业经验、强大全球网络和专业团队，我们确保材料符合最高标准，可靠高效地交付。我们专注于地板、照明、建筑用品等，始终以客户为先，推动创新，追求卓越。",
      discover_more:   "了解更多",
      services_title:  "核心服务",
      svc1_title:      "室内材料咨询",
      svc1_desc:       "专业建议，帮助您选择最适合项目风格和功能需求的地板、墙面及照明方案。",
      svc2_title:      "地板与墙面解决方案",
      svc2_desc:       "多种优质地板、墙纸和墙板，专业推荐，实现您的设计愿景。",
      svc3_title:      "照明解决方案",
      svc3_desc:       "现代与经典照明选项，提升空间氛围，按需定制。",
      svc4_title:      "材料采购与定制",
      svc4_desc:       "连接高品质供应商网络，提供定制地板、墙面和照明材料，满足项目独特需求。",
      svc5_title:      "项目协调支持",
      svc5_desc:       "协助规划和协调材料交付、安装进度和设计时间表，确保项目顺利进行。",
      svc6_title:      "售后与质保支持",
      svc6_desc:       "可靠售后服务，包括质保处理、材料维护指导及后续升级支持。",
      why_title:       "为何选择天翔国际",
      feat1_title:     "全球覆盖",
      feat1_desc:      "我们向全球主要市场供应建材，确保无缝国际配送与可靠服务。",
      feat2_title:     "行业专长",
      feat2_desc:      "团队深耕采购、出口及建材处理，满足各类项目需求。",
      feat3_title:     "质量保障",
      feat3_desc:      "严格质量标准，确保每件产品符合安全、耐用及法规要求。",
      feat4_title:     "专属支持",
      feat4_desc:      "一对一客户服务，快速响应，实时跟踪进度。",
      feat5_title:     "可持续承诺",
      feat5_desc:      "优先使用环保材料与可持续采购，支持绿色建筑项目。",
      feat6_title:     "采购灵活性",
      feat6_desc:      "根据项目需求灵活定制材料，确保按时按需交付。",
      feat7_title:     "科技驱动",
      feat7_desc:      "借助先进系统进行库存跟踪和订单管理，实现透明便捷。",
      feat8_title:     "长期合作",
      feat8_desc:      "致力于与客户建立长期合作，共同成长，互利共赢。",
      contact_title:   "联系与报价",
      contact_sub:     "我们的专业团队随时为您提供帮助。请填写以下表单或使用下面的信息与我们联系。",
      your_name:       "您的姓名 *",
      your_email:      "邮箱 *",
      your_phone:      "电话号码",
      your_company:    "公司名称",
      your_message:    "请描述您的需求 *",
      submit_inquiry:  "提交咨询",
      info_title:      "联系信息",
      info_addr:       "地址：113 5718 1a St SW",
      info_phone:      "电话：+1 [公司号码]",
      info_fax:        "传真：+1 [公司传真]",
      info_email:      "邮箱：info@tianxiang.com",
      footer_text:     "© 2024 | 天翔国际 版权所有。"
    },
    fr: {
      homepage:        "Accueil",
      product:         "Produit",
      about_us:        "À propos",
      core_services:   "Services",
      why_us:          "Pourquoi nous",
      contact_us:      "Contactez-nous",
      hero_title:      "Bâtir des rêves, créer l’avenir.",
      hero_sub:        "Tianxiang International – Votre partenaire mondial de construction",
      request_quote:   "Demander un devis",
      about_title:     "À propos de Tianxiang International",
      about_p1:        "Tianxiang International est une entreprise leader dans l'import-export de matériaux de construction. Elle s'engage à fournir des produits de haute qualité et des solutions sur mesure à ses clients du monde entier.",
      about_p2:        "Forts de nombreuses années d'expérience dans le secteur, d'un solide réseau mondial et d'une équipe professionnelle, nous garantissons que nos matériaux répondent aux normes les plus strictes et sont livrés de manière fiable et efficace. Nous nous concentrons sur les revêtements de sol, l'éclairage, les matériaux de construction et bien plus encore, en donnant toujours la priorité à nos clients, en favorisant l'innovation et en visant l'excellence dans tout ce que nous entreprenons.",
      discover_more:   "En savoir plus",
      services_title:  "Services principaux",
      
     
      services_title:  "Services clés",
      svc1_title:      "Conseil en matériaux intérieurs",
      svc1_desc:       "Conseils d'experts pour vous aider à sélectionner les meilleurs revêtements de sol, revêtements muraux et solutions d'éclairage adaptés au style et aux besoins fonctionnels de votre projet.",
      svc2_title:      "Solutions de revêtement de sol et de mur",
      svc2_desc:       "Large sélection de sols, papiers peints et panneaux muraux haut de gamme, avec des recommandations professionnelles pour donner vie à votre vision de design.",
      svc3_title:      "Solutions d'éclairage",
      svc3_desc:       "Options d'éclairage modernes et classiques pour sublimer chaque espace, de l'ambiance à l'éclairage d'accentuation, personnalisées selon vos besoins de conception et d'installation.",
      svc4_title:      "Approvisionnement & commandes personnalisées",
      svc4_desc:       "Accès à un vaste réseau de fournisseurs de haute qualité pour des matériaux de sol, muraux et d'éclairage sur mesure, garantissant des solutions uniques pour chaque projet.",
      svc5_title:      "Support de coordination de projet",
      svc5_desc:       "Assistance à la planification et à la coordination des livraisons de matériaux, des plannings d'installation et des délais de conception pour assurer une exécution de projet fluide.",
      svc6_title:      "Service après-vente & support garantie",
      svc6_desc:       "Service après-vente fiable incluant gestion des garanties, conseils d'entretien des matériaux et support pour futures mises à niveau ou remplacements.",
      why_title:       "Pourquoi choisir Tianxiang International ?",
      feat1_title:     "Couverture mondiale",
      feat1_desc:      "Nous fournissons des matériaux de construction aux principaux marchés mondiaux, assurant une distribution internationale fluide et un service fiable.",
      feat2_title:     "Expertise sectorielle",
      feat2_desc:      "Notre équipe expérimentée possède une connaissance approfondie de l'approvisionnement, de l'exportation et de la gestion de divers matériaux de construction pour répondre aux besoins variés des projets.",
      feat3_title:     "Qualité fiable",
      feat3_desc:      "Nous appliquons des normes de qualité strictes, garantissant que chaque produit livré répond aux exigences de sécurité, de durabilité et de conformité réglementaire.",
      feat4_title:     "Support dédié",
      feat4_desc:      "Nous offrons un service client personnalisé avec des réponses rapides, vous tenant informé tout au long du processus d'approvisionnement et de livraison.",
      feat5_title:     "Engagement durable",
      feat5_desc:      "Nous privilégions les matériaux écologiques et les pratiques d'approvisionnement durables, soutenant les projets de construction verte dans le monde entier.",
      feat6_title:     "Flexibilité d'approvisionnement",
      feat6_desc:      "Nous proposons des options d'approvisionnement flexibles adaptées aux besoins spécifiques de votre projet, garantissant la bonne quantité de produits au bon moment.",
      feat7_title:     "Axé sur la technologie",
      feat7_desc:      "Grâce à des systèmes avancés de suivi des stocks et de gestion des commandes, nous offrons transparence et commodité à chaque étape.",
      feat8_title:     "Partenariats durables",
      feat8_desc:      "Nous nous engageons à établir des relations durables avec nos clients, grandir ensemble et créer un succès mutuel dans chaque projet.",
      contact_title:   "Contact & Devis",
      contact_sub:     "Notre équipe est prête à vous aider. Remplissez le formulaire ou contactez-nous.",
      your_name:       "Votre nom *",
      your_email:      "Email *",
      your_phone:      "Téléphone",
      your_company:    "Nom de l’entreprise",
      your_message:    "Veuillez décrire vos besoins *",
      submit_inquiry:  "Envoyer",
      info_title:      "Informations de contact",
      info_addr:       "Adresse : 113 5718 1a St SW",
      info_phone:      "Tél : +1 [numéro]",
      info_fax:        "Fax : +1 [fax]",
      info_email:      "Email : info@tianxiang.com",
      footer_text:     "© 2024 | Tianxiang International. Tous droits réservés."
    }
  };

  // grab the <select>
  const langSelect = document.getElementById("lang-select");

  function setLang(lang) {
    document.documentElement.lang = lang;
    // translate all text
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.dataset.i18n;
      if (T[lang] && T[lang][key]) el.textContent = T[lang][key];
    });
    // translate placeholders
    document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
      const key = el.dataset.i18nPlaceholder;
      if (T[lang] && T[lang][key]) el.placeholder = T[lang][key];
    });
    // update dropdown if change came from code
    langSelect.value = lang;
  }

  // listen for user change
  langSelect.addEventListener("change", () => {
    setLang(langSelect.value);
  });

  // initialize default language
  setLang("en");
});
