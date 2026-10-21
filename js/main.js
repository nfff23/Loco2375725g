document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.getElementById('menuBtn');
  const navLinks = document.getElementById('navLinks');
  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
      const opened = navLinks.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', String(opened));
    });
    navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
    }));
  }

  const current = location.pathname.split('/').pop() || 'index.html';
  const page = current === 'index.html' ? 'home' : current.replace('.html', '');
  document.querySelectorAll('.links a').forEach(a => {
    if (a.dataset.page === page) a.classList.add('active');
  });

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  const search = document.getElementById('searchInput');
  const cards = [...document.querySelectorAll('.product')];
  const empty = document.getElementById('emptyState');
  const filters = [...document.querySelectorAll('.filter')];
  let activeCategory = 'Semua';
  function filterProducts() {
    if (!search || !cards.length) return;
    const q = search.value.trim().toLowerCase();
    let visible = 0;
    cards.forEach(card => {
      const matches = card.dataset.name.toLowerCase().includes(q) &&
        (activeCategory === 'Semua' || card.dataset.category === activeCategory);
      card.style.display = matches ? '' : 'none';
      if (matches) visible++;
    });
    if (empty) empty.style.display = visible ? 'none' : 'block';
  }
  if (search) search.addEventListener('input', filterProducts);
  filters.forEach(btn => btn.addEventListener('click', () => {
    filters.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeCategory = btn.dataset.category;
    filterProducts();
  }));

  const form = document.getElementById('contactForm');
  if (form) form.addEventListener('submit', event => {
    event.preventDefault();
    alert('Terima kasih! Formulir demo tervalidasi, tetapi belum mengirim pesan ke server.');
    form.reset();
  });
});
