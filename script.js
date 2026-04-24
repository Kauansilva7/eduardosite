// Initialize Lucide Icons
lucide.createIcons();

// GSAP Animations setup
document.addEventListener("DOMContentLoaded", (event) => {
    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Number Counter & Chart Animation on Scroll
    const mockup = document.querySelector(".hero-mockup");
    if(mockup) {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: mockup,
                start: "top 85%", // Triggers when the top of the mockup hits 85% of viewport
                toggleActions: "play none none none"
            }
        });

        // Animate the simulated SVG chart line drawing
        tl.to(".trend-line", {
            strokeDashoffset: 0,
            duration: 2,
            ease: "power2.inOut"
        });

        // Number Counter Animation
        const counterElement = document.querySelector(".counter");
        if(counterElement) {
            const targetValue = parseInt(counterElement.getAttribute("data-target"));
            const formatter = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 });
            
            tl.to({ value: 0 }, {
                value: targetValue,
                duration: 2,
                ease: "power2.out",
                onUpdate: function() {
                    const num = Math.floor(this.targets()[0].value);
                    counterElement.innerHTML = formatter.format(num);
                }
            }, "<"); // Starts at the same time as the trend-line animation
        }
    }

    // Entrance Animations Removed

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

    // Floating Bar Visibility Logic
    const floatingBar = document.getElementById('floatingBar');
    if(floatingBar) {
        ScrollTrigger.create({
            trigger: "#results", 
            start: "top 80%",
            onEnter: () => floatingBar.classList.add('visible'),
            onLeaveBack: () => floatingBar.classList.remove('visible')
        });

        // Hide floating bar when reaching the final offer section
        ScrollTrigger.create({
            trigger: "#offer",
            start: "top bottom", // when top of offer hits bottom of viewport
            onEnter: () => floatingBar.classList.remove('visible'),
            onLeaveBack: () => floatingBar.classList.add('visible')
        });
    }
});
