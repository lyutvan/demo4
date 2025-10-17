
// Mobile menu
const burger = document.querySelector('.burger');
const nav = document.getElementById('nav');
if (burger && nav) {
  burger.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}

// Smooth scroll to form
document.querySelectorAll('[data-scroll="#lead-form"]').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const el = document.getElementById('lead-form');
    if (el) el.scrollIntoView({behavior: 'smooth'});
  });
});

// Simple accordion
document.querySelectorAll('.accordion .item').forEach(item => {
  const btn = item.querySelector('button');
  const panel = item.querySelector('.panel');
  if (btn && panel) {
    btn.addEventListener('click', () => {
      const shown = panel.style.display === 'block';
      document.querySelectorAll('.accordion .panel').forEach(p => p.style.display = 'none');
      panel.style.display = shown ? 'none' : 'block';
    });
  }
});

// Two-step form (basic client-side only)
function handleTwoStepForm(formId) {
  const form = document.getElementById(formId);
  if (!form) return;
  const step1 = form.querySelector('[data-step="1"]');
  const step2 = form.querySelector('[data-step="2"]');
  const nextBtn = form.querySelector('[data-next]');
  const backBtn = form.querySelector('[data-back]');
  const submitBtn = form.querySelector('button[type="submit"]');

  if (nextBtn) nextBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const name = form.querySelector('input[name="name"]');
    const phone = form.querySelector('input[name="phone"]');
    if (!name.value.trim() || !phone.value.trim()) {
      alert('Заполните имя и телефон');
      return;
    }
    step1.style.display = 'none';
    step2.style.display = 'grid';
  });
  if (backBtn) backBtn.addEventListener('click', (e) => {
    e.preventDefault();
    step2.style.display = 'none';
    step1.style.display = 'grid';
  });
  if (submitBtn) form.addEventListener('submit', (e) => {
    const consent = form.querySelector('input[name="consent"]');
    if (!consent.checked) {
      e.preventDefault();
      alert('Необходимо согласие на обработку персональных данных (152-ФЗ).');
    }
  });
}
handleTwoStepForm('lead-form');

// Call-back widget
const cbForm = document.getElementById('callback-form');
if (cbForm) {
  cbForm.addEventListener('submit', (e) => {
    const inp = cbForm.querySelector('input[name="phone"]');
    if (!inp.value.trim()) {
      e.preventDefault();
      alert('Укажите телефон');
    }
  });
}

// Cookie consent
(function(){
  const key='cookieConsent';
  if(localStorage.getItem(key)) return;
  const banner = document.createElement('div');
  banner.className='cookie-banner';
  banner.innerHTML = '<span>Мы используем файлы cookie. Продолжая пользоваться сайтом, вы соглашаетесь с <a href="cookies.html" style="color:#C9A227">Cookie‑политикой</a>.</span><button>Согласен</button>';
  document.body.appendChild(banner);
  banner.querySelector('button').addEventListener('click', ()=>{
    localStorage.setItem(key,'1'); banner.remove();
  });
})();
