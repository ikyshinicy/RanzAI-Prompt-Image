const SUPABASE_URL = 'https://cavouyzyasnuygkuwizy.supabase.co';
const SUPABASE_ANON = 'sb_publishable_6eixKKot9VleMm2KVD4o7w_C58lRv6r';

function showError(msg) {
  const error = document.getElementById('errorMsg');
  const success = document.getElementById('successMsg');
  if (error) { error.textContent = msg; error.style.display = 'block'; }
  if (success) success.style.display = 'none';
}

function showSuccess(msg) {
  const success = document.getElementById('successMsg');
  const error = document.getElementById('errorMsg');
  if (success) { success.innerHTML = msg; success.style.display = 'block'; }
  if (error) error.style.display = 'none';
}

function setLoading(buttonId, on, idleText) {
  const btn = document.getElementById(buttonId);
  if (!btn) return;
  btn.disabled = on;
  btn.classList.toggle('loading', on);
  const text = btn.querySelector('.btn-text');
  if (text) text.textContent = on ? 'Memproses...' : idleText;
}

function registerWithGoogle() {
  window.location.href = `${SUPABASE_URL}/auth/v1/authorize?provider=google&redirect_to=${encodeURIComponent(location.origin + '/RanzAI/app.html')}`;
}

function loginWithGoogle() {
  registerWithGoogle();
}

function saveSession(data) {
  if (data.session) {
    localStorage.setItem('ranzai_session', JSON.stringify({
      access_token: data.session.access_token,
      refresh_token: data.session.refresh_token,
      user: data.user
    }));
  }
}

function goToApp() {
  window.location.href = '../app.html';
}

function initTheme() {
  const saved = localStorage.getItem('ranzai_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);
  const btn = document.querySelector('[data-theme-toggle]');
  if (btn) btn.textContent = saved === 'light' ? '☀ Light' : '☾ Dark';
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'dark';
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('ranzai_theme', next);
  const btn = document.querySelector('[data-theme-toggle]');
  if (btn) btn.textContent = next === 'light' ? '☀ Light' : '☾ Dark';
}

window.addEventListener('DOMContentLoaded', () => {
  initTheme();
  const themeBtn = document.querySelector('[data-theme-toggle]');
  if (themeBtn) themeBtn.addEventListener('click', toggleTheme);
});
