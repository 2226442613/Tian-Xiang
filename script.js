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

});