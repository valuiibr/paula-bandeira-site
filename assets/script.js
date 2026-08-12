const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
const year = document.querySelector('#year');

const profileMark = document.querySelector('.credential-mark');
if (profileMark) {
  const profileStyles = document.createElement('style');
  profileStyles.textContent = `
    .credential-mark.profile-photo{
      width:min(72%,330px);
      height:auto !important;
      aspect-ratio:3/4;
      display:block;
      border-radius:30px;
      background:url('assets/paula-bandeira.jpg') center 28% / cover no-repeat !important;
      border:7px solid rgba(255,255,255,.82);
      box-shadow:0 28px 65px rgba(83,48,53,.20);
      transform:rotate(-1.25deg);
    }
    .credential-mark.profile-photo span,
    .credential-mark.profile-photo small{display:none}
    @media (max-width:640px){
      .credential-mark.profile-photo{width:min(76%,290px);border-radius:25px;border-width:6px}
    }
  `;
  document.head.appendChild(profileStyles);
  profileMark.classList.add('profile-photo');
  profileMark.innerHTML = '';
  profileMark.setAttribute('role', 'img');
  profileMark.setAttribute('aria-label', 'Paula Bandeira, Neuropsicopedagoga');
  profileMark.closest('.credentials-visual')?.removeAttribute('aria-hidden');
}

const updateHeader = () => header.classList.toggle('scrolled', window.scrollY > 24);
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

year.textContent = new Date().getFullYear();

menuToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
});

nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
