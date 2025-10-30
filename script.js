/* ========== NAV MOBILE ========== */
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
if (menuBtn) {
  menuBtn.addEventListener('click', () => {
    const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
    menuBtn.setAttribute('aria-expanded', !expanded);
    mobileMenu.classList.toggle('hidden');
  });
}

/* ========== SLIDER / GALLERY ========== */
const slides = Array.from(document.querySelectorAll('#gallery .slide'));
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const indicators = document.getElementById('indicators');

let current = 0;
let autoplayInterval = null;

function showSlide(index){
  if(!slides.length) return;
  slides.forEach((s, i) => s.style.display = (i === index) ? 'block' : 'none');
  // indicators
  if(indicators){
    indicators.querySelectorAll('button').forEach((b, i)=> {
      b.classList.toggle('active', i === index);
    });
  }
  current = index;
}

function nextSlide(){
  showSlide((current + 1) % slides.length);
}
function prevSlide(){
  showSlide((current - 1 + slides.length) % slides.length);
}

// build indicators
if(indicators){
  slides.forEach((_, i) => {
    const b = document.createElement('button');
    b.className = i === 0 ? 'active' : '';
    b.addEventListener('click', ()=> { showSlide(i); resetAutoplay(); });
    indicators.appendChild(b);
  });
}

nextBtn && nextBtn.addEventListener('click', () => { nextSlide(); resetAutoplay(); });
prevBtn && prevBtn.addEventListener('click', () => { prevSlide(); resetAutoplay(); });

// autoplay
function startAutoplay(){
  stopAutoplay();
  autoplayInterval = setInterval(nextSlide, 4000);
}
function stopAutoplay(){ if(autoplayInterval) clearInterval(autoplayInterval); }
function resetAutoplay(){ stopAutoplay(); startAutoplay(); }
startAutoplay();

/* pause autoplay when user hovers gallery (desktop) */
const gallery = document.getElementById('gallery');
if(gallery){
  gallery.addEventListener('mouseenter', stopAutoplay);
  gallery.addEventListener('mouseleave', startAutoplay);
}

/* ========== MEMBER MODAL ========== */
const openBtns = Array.from(document.querySelectorAll('.openMemberBtn'));
const memberModal = document.getElementById('memberModal');
const modalName = document.getElementById('modalName');
const modalRole = document.getElementById('modalRole');
const modalDesc = document.getElementById('modalDesc');
const closeModal = document.getElementById('closeModal');

openBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const name = btn.dataset.name;
    const role = btn.dataset.role;
    const desc = btn.dataset.desc;
    modalName.textContent = name;
    modalRole.textContent = role;
    modalDesc.textContent = desc;
    memberModal.classList.add('show');
  });
});
closeModal && closeModal.addEventListener('click', ()=> memberModal.classList.remove('show'));
memberModal && memberModal.addEventListener('click', (e)=> { if(e.target === memberModal) memberModal.classList.remove('show'); });

/* ========== FORM PENDAFTARAN (client-side only) ========== */
const joinForm = document.getElementById('joinForm');
const formMsg = document.getElementById('formMsg');

if(joinForm){
  joinForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // simple validation (HTML required + pattern already set)
    const formData = new FormData(joinForm);
    const data = Object.fromEntries(formData.entries());

    // basic WA formatting check (starts with 08)
    if(!/^08[0-9]{6,}$/.test(data.wa || '')) {
      formMsg.textContent = 'Nomor WA tidak valid (contoh: 08xxxxxxxx).';
      formMsg.classList.add('text-red-400');
      return;
    }

    // simulate submission (no backend)
    formMsg.classList.remove('text-red-400');
    formMsg.textContent = 'Mengirim...';
    setTimeout(()=> {
      formMsg.textContent = 'Terima kasih! Pendaftaran berhasil dikirim (simulasi). Kami akan menghubungi via WA.';
      joinForm.reset();
    }, 900);
  });
}

/* ========== AUTO YEAR ========== */
const yearEl = document.getElementById('year');
if(yearEl) yearEl.innerText = new Date().getFullYear();

/* ========== SMOOTH SCROLL OFFSET for sticky nav ========== */
/* If browser doesn't honor CSS smooth scroll offset, optional JS:
   (kept minimal — anchor links already smooth via CSS) */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const target = document.querySelector(a.getAttribute('href'));
    if(target){
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 80; // offset for sticky nav
      window.scrollTo({ top, behavior: 'smooth' });
      // close mobile menu if open
      if(!mobileMenu.classList.contains('hidden')) mobileMenu.classList.add('hidden');
    }
  });
});
