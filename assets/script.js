const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
const year = document.querySelector('#year');

// Logos oficiais da identidade visual Paula Bandeira.
const headerLogo = document.querySelector('.brand img');
const footerLogo = document.querySelector('.footer-brand img');

if (headerLogo) {
  headerLogo.src = 'assets/logo-header.webp';
  headerLogo.alt = 'Paula Bandeira — Neuropsicopedagoga';
}

if (footerLogo) {
  footerLogo.src = 'assets/logo-footer.webp';
  footerLogo.alt = 'Paula Bandeira — Neuropsicopedagoga';
}

const brandStyles = document.createElement('style');
brandStyles.textContent = `
  .nav-wrap{height:112px}
  .brand img{
    width:180px!important;
    height:auto!important;
    max-height:104px;
    object-fit:contain;
  }
  .footer-brand img{
    width:220px!important;
    height:auto!important;
    max-height:128px;
    object-fit:contain;
    filter:none!important;
    opacity:1!important;
  }
  @media (max-width:980px){
    .nav-wrap{height:96px}
    .main-nav{top:96px}
    .brand img{width:158px!important;max-height:90px}
    .footer-brand img{width:200px!important;max-height:116px}
  }
  @media (max-width:640px){
    .nav-wrap{height:90px}
    .main-nav{top:90px}
    .brand img{width:145px!important;max-height:83px}
    .footer-brand img{width:185px!important;max-height:107px}
  }
`;
document.head.appendChild(brandStyles);

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

if (year) year.textContent = new Date().getFullYear();

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(open));
  });

  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  }));
}

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
