document.addEventListener('DOMContentLoaded', () => {
    console.log('Legacy scripts initialized.');

    // Basic AOS-like behavior if AOS is missing
    const reveals = document.querySelectorAll('.animate__animated');
    const windowHeight = window.innerHeight;

    const revealOnScroll = () => {
        reveals.forEach(reveal => {
            const revealTop = reveal.getBoundingClientRect().top;
            if (revealTop < windowHeight - 150) {
                reveal.classList.add('animate__fadeInUp');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
});
