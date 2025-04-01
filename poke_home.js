// POPUP
window.onload = function () {
    setTimeout(function () {
        document.getElementById("popup").style.display = "block";
    }, 1000);
};

function closePopup() {
    document.getElementById("popup").style.display = "none";
}


window.addEventListener('click', function (e) {
    const popup = document.getElementById("popup");
    const modalContent = document.querySelector(".modal-content");

    if (e.target === popup) {
        closePopup();
    }
});


// NAVBAR
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('active');
}

// Team GO Rocket
const arloBtn = document.querySelector('.view-team-btn');
const cliffBtn = document.getElementById('cliffBtn');
const sierraBtn = document.getElementById('sierraBtn');

const arloModal = document.getElementById('arloModal');
const cliffModal = document.getElementById('cliffModal');
const sierraModal = document.getElementById('sierraModal');

const arloClose = arloModal.querySelector('.close-modal');
const cliffClose = cliffModal.querySelector('.close-modal');
const sierraClose = sierraModal.querySelector('.close-modal');

arloBtn.addEventListener('click', () => arloModal.style.display = 'block');
cliffBtn.addEventListener('click', () => cliffModal.style.display = 'block');
sierraBtn.addEventListener('click', () => sierraModal.style.display = 'block');

arloClose.addEventListener('click', () => arloModal.style.display = 'none');
cliffClose.addEventListener('click', () => cliffModal.style.display = 'none');
sierraClose.addEventListener('click', () => sierraModal.style.display = 'none');

window.addEventListener('click', (e) => {
    if (e.target === arloModal) arloModal.style.display = 'none';
    if (e.target === cliffModal) cliffModal.style.display = 'none';
    if (e.target === sierraModal) sierraModal.style.display = 'none';
});
