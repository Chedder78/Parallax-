// GSAP and ScrollTrigger Animations
gsap.registerPlugin(ScrollTrigger);

gsap.from(".header h1", {
    duration: 2,
    y: -100,
    opacity: 0,
    ease: "power4.out"
});

gsap.utils.toArray(".content").forEach((section) => {
    ScrollTrigger.create({
        trigger: section,
        start: "top 80%",
        end: "bottom 20%",
        onEnter: () => gsap.to(section, { opacity: 1, y: 0, duration: 1 }),
        onLeave: () => gsap.to(section, { opacity: 0, y: 50, duration: 1 }),
        onEnterBack: () => gsap.to(section, { opacity: 1, y: 0, duration: 1 }),
        onLeaveBack: () => gsap.to(section, { opacity: 0, y: 50, duration: 1 }),
    });
});

// Sticky Navbar Background Change
window.addEventListener('scroll', () => {
    const header = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        header.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
    } else {
        header.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    }
});
