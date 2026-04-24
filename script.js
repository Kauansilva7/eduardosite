// Initialize Lucide Icons
lucide.createIcons();

// GSAP Animations setup
document.addEventListener("DOMContentLoaded", (event) => {
    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Initial Hero Animations
    const tl = gsap.timeline();
    tl.to(".hero .fade-up", {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out"
    })
    .to(".hero .fade-in", {
        opacity: 1,
        duration: 1,
        ease: "power2.out"
    }, "-=0.4");

    // Animate the simulated SVG chart line drawing
    tl.to(".trend-line", {
        strokeDashoffset: 0,
        duration: 2,
        ease: "power2.inOut"
    }, "-=0.8");

    // Number Counter Animation
    const counterElement = document.querySelector(".counter");
    if(counterElement) {
        const targetValue = parseInt(counterElement.getAttribute("data-target"));
        tl.to({ value: 0 }, {
            value: targetValue,
            duration: 2,
            ease: "power2.out",
            onUpdate: function() {
                // Formatting as Brazilian Real string e.g. R$ 12.847,00
                const num = Math.floor(this.targets()[0].value);
                const formatter = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 });
                counterElement.innerHTML = formatter.format(num);
            }
        }, "-=2");
    }

    // Scroll Animations for rest of the page
    const fadeUpElements = gsap.utils.toArray('section:not(.hero) .fade-up');
    fadeUpElements.forEach(el => {
        gsap.to(el, {
            scrollTrigger: {
                trigger: el,
                start: "top 85%", // Trigger when upper part hits 85% of viewport
                toggleActions: "play none none none"
            },
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out"
        });
    });

    // FAQ Accordion Logic
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            
            // Close others
            document.querySelectorAll('.accordion-item').forEach(otherItem => {
                if(otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });

            // Toggle current
            item.classList.toggle('active');
        });
    });

    // Smooth scroll for anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            if(targetId === "checkout" || targetId === "offer") {
                const targetEl = document.querySelector('#offer');
                if(targetEl) {
                    window.scrollTo({
                        top: targetEl.offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});
