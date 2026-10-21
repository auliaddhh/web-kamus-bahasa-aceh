const PAGE_SIZE = 9;
const state = { all: [], filtered: [], page: 1, direction: 'aceh', query: '', sort: 'az' };
const $ = (id) => document.getElementById(id);
const normalize = (value) => String(value ?? '').toLocaleLowerCase('id').normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();

async function init() {
  try {
    const response = await fetch('./kamus.json');
    if (!response.ok) throw new Error('Data kamus tidak dapat dibuka.');
    state.all = await response.json();
    state.all = state.all.filter(item => item.aceh && item.indonesia);
    $('hero-total').textContent = `${state.all.length.toLocaleString('id-ID')}+`;
    $('total-label').textContent = `${state.all.length.toLocaleString('id-ID')} entri tersedia`;
    const featured = state.all.find(item => normalize(item.aceh).includes('peumulia')) || state.all[0];
    $('featured-word').textContent = featured.aceh;
    $('featured-meaning').textContent = featured.indonesia;
    bindEvents();
    filterWords();
  } catch (error) {
    $('results').innerHTML = `<div class="empty-state"><b>Data kamus belum bisa dimuat.</b>Pastikan file kamus.json berada di folder yang sama dan jalankan website melalui server lokal, bukan membuka index.html langsung.</div>`;
    $('total-label').textContent = 'Data belum tersedia';
  }
}

function bindEvents() {
  $('direction').addEventListener('change', event => { state.direction = event.target.value; state.page = 1; filterWords(); });
  $('query').addEventListener('input', event => { state.query = event.target.value; state.page = 1; $('clear').hidden = !state.query; filterWords(); });
  $('query').addEventListener('keydown', event => { if (event.key === 'Enter') { state.query = event.target.value; filterWords(); } });
  $('search-btn').addEventListener('click', () => { state.query = $('query').value; state.page = 1; filterWords(); });
  $('clear').addEventListener('click', () => { $('query').value = ''; state.query = ''; $('clear').hidden = true; state.page = 1; filterWords(); $('query').focus(); });
  $('sort').addEventListener('change', event => { state.sort = event.target.value; filterWords(); });
  $('prev').addEventListener('click', () => { if (state.page > 1) { state.page--; render(); } });
  $('next').addEventListener('click', () => { const pages = Math.max(1, Math.ceil(state.filtered.length / PAGE_SIZE)); if (state.page < pages) { state.page++; render(); } });
}

function filterWords() {
  const q = normalize(state.query);
  const key = state.direction;
  state.filtered = state.all.filter(item => !q || normalize(item[key]).includes(q) || normalize(key === 'aceh' ? item.indonesia : item.aceh).includes(q));
  state.filtered.sort((a,b) => {
    const first = normalize(a[key]), second = normalize(b[key]);
    return (state.sort === 'az' ? 1 : -1) * first.localeCompare(second, 'id');
  });
  const pages = Math.max(1, Math.ceil(state.filtered.length / PAGE_SIZE));
  state.page = Math.min(state.page, pages);
  render();
}

function escapeHTML(value) {
  return String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
}

function render() {
  const key = state.direction;
  const other = key === 'aceh' ? 'indonesia' : 'aceh';
  const pages = Math.max(1, Math.ceil(state.filtered.length / PAGE_SIZE));
  const start = (state.page - 1) * PAGE_SIZE;
  const visible = state.filtered.slice(start, start + PAGE_SIZE);
  $('results-title').textContent = state.query ? `Hasil pencarian “${state.query}”` : 'Jelajahi kosakata';
  $('results-subtitle').textContent = `${state.filtered.length.toLocaleString('id-ID')} kata ditemukan · Menampilkan ${state.filtered.length ? start + 1 : 0}–${Math.min(start + PAGE_SIZE, state.filtered.length)}`;
  if (!visible.length) {
    $('results').innerHTML = `<div class="empty-state"><b>Kata belum ditemukan.</b>Coba kata lain, periksa ejaan, atau ubah arah pencarian.</div>`;
  } else {
    $('results').innerHTML = visible.map(item => `<article class="word-card"><div class="word-top"><h4>${escapeHTML(item[key])}</h4><span class="word-tag">${key === 'aceh' ? 'Bahasa Aceh' : 'Bahasa Indonesia'}</span></div><div class="word-divider"></div><p class="meaning"><strong>${key === 'aceh' ? 'Arti Indonesia:' : 'Padanan Aceh:'}</strong> ${escapeHTML(item[other])}</p><div class="source">Sumber: ${escapeHTML(item.sumber || 'Kamus Aceh–Indonesia')}</div></article>`).join('');
  }
  $('page-info').textContent = `Halaman ${state.page} dari ${pages}`;
  $('prev').disabled = state.page <= 1;
  $('next').disabled = state.page >= pages;
}

init();
