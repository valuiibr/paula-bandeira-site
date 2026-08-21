const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
const year = document.querySelector('#year');

// Assets oficiais com nomes e extensões coerentes, mais versão para evitar cache antigo.
const assetVersion = '20260821b';
const headerLogo = document.querySelector('.brand img');
const footerLogo = document.querySelector('.footer-brand img');

if (headerLogo) {
  headerLogo.src = `assets/logo-header.png?v=${assetVersion}`;
  headerLogo.alt = 'Paula Bandeira — Neuropsicopedagoga';
  headerLogo.onerror = () => {
    headerLogo.onerror = null;
    headerLogo.src = `assets/logo.png?v=${assetVersion}`;
  };
}

if (footerLogo) {
  footerLogo.src = `assets/logo-footer.png?v=${assetVersion}`;
  footerLogo.alt = 'Paula Bandeira — Neuropsicopedagoga';
  footerLogo.onerror = () => {
    footerLogo.onerror = null;
    footerLogo.src = `assets/logo.png?v=${assetVersion}`;
  };
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

  .footer-brand{
    display:flex!important;
    align-items:center!important;
    justify-content:flex-start!important;
    width:100%;
    min-height:96px;
    padding:8px 0;
    overflow:visible!important;
  }
  .footer-brand img{
    display:block!important;
    width:min(230px,100%)!important;
    height:auto!important;
    max-width:100%!important;
    max-height:none!important;
    object-fit:contain!important;
    object-position:left center!important;
    overflow:visible!important;
    clip-path:none!important;
    filter:none!important;
    opacity:1!important;
  }
  .site-footer,
  .site-footer .container,
  .site-footer .footer-grid{
    overflow:visible!important;
  }

  @media (max-width:980px){
    .nav-wrap{height:96px}
    .main-nav{top:96px}
    .brand img{width:158px!important;max-height:90px}
    .footer-brand{min-height:90px}
    .footer-brand img{width:min(215px,100%)!important;max-height:none!important}
  }
  @media (max-width:640px){
    .nav-wrap{height:90px}
    .main-nav{top:90px}
    .brand img{width:145px!important;max-height:83px}
    .footer-brand{min-height:84px;padding:6px 0}
    .footer-brand img{width:min(200px,100%)!important;max-height:none!important}
  }
`;
document.head.appendChild(brandStyles);

const profileMark = document.querySelector('.credential-mark');
if (profileMark) {
  const originalMarkup = profileMark.innerHTML;
  const photo = document.createElement('img');
  photo.src = `assets/paula-bandeira-photo.jpg?v=${assetVersion}`;
  photo.alt = 'Paula Bandeira, Neuropsicopedagoga';
  photo.className = 'profile-photo-img';

  const profileStyles = document.createElement('style');
  profileStyles.textContent = `
    .credential-mark.profile-photo{
      width:min(72%,330px);
      height:auto!important;
      aspect-ratio:3/4;
      display:block;
      padding:0;
      overflow:hidden;
      border-radius:30px;
      background:#fff!important;
      border:7px solid rgba(255,255,255,.82);
      box-shadow:0 28px 65px rgba(83,48,53,.20);
      transform:rotate(-1.25deg);
    }
    .credential-mark.profile-photo .profile-photo-img{
      width:100%;height:100%;display:block;object-fit:cover;object-position:center 28%;
    }
    @media (max-width:640px){
      .credential-mark.profile-photo{width:min(76%,290px);border-radius:25px;border-width:6px}
    }
  `;
  document.head.appendChild(profileStyles);

  photo.onload = () => {
    profileMark.classList.add('profile-photo');
    profileMark.innerHTML = '';
    profileMark.appendChild(photo);
    profileMark.setAttribute('role', 'img');
    profileMark.setAttribute('aria-label', 'Paula Bandeira, Neuropsicopedagoga');
    profileMark.closest('.credentials-visual')?.removeAttribute('aria-hidden');
  };
  photo.onerror = () => {
    profileMark.classList.remove('profile-photo');
    profileMark.innerHTML = originalMarkup;
  };
}

const updateHeader = () => {
  if (header) header.classList.toggle('scrolled', window.scrollY > 24);
};
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

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
} else {
  document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
}
