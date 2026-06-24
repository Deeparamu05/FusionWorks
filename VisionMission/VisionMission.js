document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.vision-card');

    cards.forEach((card, index) => {
        card.dataset.index = index;
        card.classList.add('fade-in');
    });
});
