// Menu mobile : ouverture et fermeture du menu de navigation.
const menuBtn = document.getElementById('menuBtn');
const menu = document.getElementById('menu');
const navLinks = document.querySelectorAll('.nav-link');

menuBtn.addEventListener('click', () => {
  const isOpen = menu.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', isOpen);
  menuBtn.innerHTML = isOpen
    ? '<i class="fa-solid fa-xmark"></i>'
    : '<i class="fa-solid fa-bars"></i>';
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    menu.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
  });
});

// Animation douce des blocs lorsqu'ils arrivent à l'écran.
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(element => revealObserver.observe(element));

// Barre de progression en haut de la page.
const progressBar = document.getElementById('scrollProgress');
function updateProgress() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  progressBar.style.width = `${progress}%`;
}
window.addEventListener('scroll', updateProgress, { passive: true });
updateProgress();

// Met en évidence dans le menu la section actuellement consultée.
const sections = document.querySelectorAll('main section[id]');
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
      });
    }
  });
}, { rootMargin: '-35% 0px -55% 0px' });
sections.forEach(section => sectionObserver.observe(section));

// Année automatique dans le pied de page.
document.getElementById('year').textContent = new Date().getFullYear();

// Le formulaire prépare un e-mail dans le logiciel de messagerie de l'utilisateur.
// Remplace l'adresse ci-dessous par ta véritable adresse e-mail.
const adresseDestinataire = 'remplacer-par-ton-email@example.com';
const contactForm = document.getElementById('contactForm');
const formNotice = document.getElementById('formNotice');
contactForm.addEventListener('submit', event => {
  event.preventDefault();
  const nom = document.getElementById('nom').value.trim();
  const email = document.getElementById('email').value.trim();
  const sujet = document.getElementById('sujet').value.trim();
  const message = document.getElementById('message').value.trim();
  if (!nom || !email || !sujet || !message) {
    formNotice.textContent = 'Merci de remplir tous les champs.';
    return;
  }
  if (adresseDestinataire === 'remplacer-par-ton-email@example.com') {
    formNotice.textContent = 'Configure d’abord ton adresse e-mail dans script.js.';
    return;
  }
  const corps = `Nom : ${nom}\nE-mail : ${email}\n\n${message}`;
  const lien = `mailto:${adresseDestinataire}?subject=${encodeURIComponent(sujet)}&body=${encodeURIComponent(corps)}`;
  formNotice.textContent = 'Ouverture de ton application e-mail…';
  window.location.href = lien;
});
