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
  window.location.href = `${SUPABASE_URL}/auth/v1/authorize?provider=google&redirect_to=${encodeURIComponent('https://prompt.ranz-ai.com/dashboard/index.html')}`;
}

function loginWithGoogle() {
  registerWithGoogle();
}

// ── Simpan session ──────────────────────────────────────────
function saveSession(data) {
  const session = data.session || data;
  const user    = data.user || session.user;
  if (!session?.access_token) return false;
  const payload = {
    access_token:  session.access_token,
    refresh_token: session.refresh_token || '',
    expires_at:    Date.now() + (session.expires_in ? session.expires_in * 1000 : 3600000),
    user:          user
  };
  try {
    localStorage.setItem('ranzai_session', JSON.stringify(payload));
    return !!localStorage.getItem('ranzai_session');
  } catch(e) { return false; }
}

// ── Ambil session dari localStorage ────────────────────────
function getSession() {
  try {
    const raw = localStorage.getItem('ranzai_session');
    return raw ? JSON.parse(raw) : null;
  } catch(e) { return null; }
}

// ── Cek apakah access_token sudah expired ──────────────────
function isExpired(session) {
  if (!session?.expires_at) return true;
  // anggap expired 5 menit sebelum waktu sebenarnya (buffer)
  return Date.now() > (session.expires_at - 5 * 60 * 1000);
}

// ── Refresh token — minta access_token baru ────────────────
async function refreshSession() {
  const session = getSession();
  if (!session?.refresh_token) return null;

  try {
    const res = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=refresh_token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_ANON
      },
      body: JSON.stringify({ refresh_token: session.refresh_token })
    });

    const data = await res.json();
    if (!res.ok || !data.access_token) return null;

    // simpan session baru
    saveSession({ session: data, user: data.user || session.user });
    return data;
  } catch(e) { return null; }
}

// ── Validasi session — refresh kalau perlu ─────────────────
// Dipanggil di dashboard sebelum load konten
async function requireAuth() {
  const session = getSession();

  // tidak ada session sama sekali
  if (!session?.access_token || !session?.user?.id) {
    window.location.replace(toLoginPath());
    return null;
  }

  // token masih valid
  if (!isExpired(session)) return session;

  // token expired — coba refresh
  const refreshed = await refreshSession();
  if (refreshed) return getSession();

  // refresh gagal — paksa logout
  localStorage.removeItem('ranzai_session');
  window.location.replace(toLoginPath());
  return null;
}

// ── Helper path ────────────────────────────────────────────
function toLoginPath() {
  const base = window.location.origin;
  const path = window.location.pathname.includes('/dashboard/')
    ? window.location.pathname.replace(/\/dashboard\/.*$/, '')
    : window.location.pathname.includes('/auth/')
    ? window.location.pathname.replace(/\/auth\/.*$/, '')
    : '';
  return base + path + '/auth/login.html';
}

function goToDashboard() {
  const base = window.location.origin;
  const path = window.location.pathname.includes('/auth/')
    ? window.location.pathname.replace(/\/auth\/.*$/, '')
    : '';
  window.location.replace(base + path + '/dashboard/index.html');
}

function goToApp() { goToDashboard(); }

// ── Logout ─────────────────────────────────────────────────
function logout() {
  localStorage.removeItem('ranzai_session');
  window.location.replace(toLoginPath());
}

// ── Theme ──────────────────────────────────────────────────
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

// ── Baca token dari URL hash (setelah login Google) ────────
(async function readHashToken() {
  const hash = window.location.hash;
  if (!hash.includes('access_token')) return;
  const params = new URLSearchParams(hash.substring(1));
  const access_token  = params.get('access_token');
  const refresh_token = params.get('refresh_token');
  const expires_in    = params.get('expires_in');
  if (!access_token) return;
  try {
    const res = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
      headers: { 'apikey': SUPABASE_ANON, 'Authorization': `Bearer ${access_token}` }
    });
    const user = await res.json();
    if (user?.id) {
      saveSession({ session: { access_token, refresh_token, expires_in: Number(expires_in) || 3600 }, user });
      window.history.replaceState({}, '', window.location.pathname);
      goToDashboard();
    }
  } catch(e) {}
})();

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
  window.location.href = `${SUPABASE_URL}/auth/v1/authorize?provider=google&redirect_to=${encodeURIComponent('https://prompt.ranz-ai.com/dashboard/index.html')}`;
}

function loginWithGoogle() {
  registerWithGoogle();
}

function saveSession(data) {
  // support both {session, user} and flat token response
  const session = data.session || data;
  const user    = data.user || session.user;

  if (!session?.access_token) return false;

  const payload = {
    access_token:  session.access_token,
    refresh_token: session.refresh_token || '',
    user:          user
  };

  try {
    localStorage.setItem('ranzai_session', JSON.stringify(payload));
    // verify it was actually written
    const check = localStorage.getItem('ranzai_session');
    return !!check;
  } catch(e) {
    return false;
  }
}

function goToDashboard() {
  // absolute path supaya tidak salah dari mana pun
  const base = window.location.origin;
  // cari root project — kalau ada /auth/ di path, naik 1 level
  const path = window.location.pathname.includes('/auth/')
    ? window.location.pathname.replace(/\/auth\/.*$/, '')
    : '';
  window.location.replace(base + path + '/dashboard/index.html');
}

// alias lama tetap jalan
function goToApp() { goToDashboard(); }

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

// Baca token dari URL hash (setelah login Google)
(async function readHashToken() {
  const hash = window.location.hash;
  if (!hash.includes('access_token')) return;
  const params = new URLSearchParams(hash.substring(1));
  const access_token  = params.get('access_token');
  const refresh_token = params.get('refresh_token');
  if (!access_token) return;
  try {
    const res = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
      headers: {
        'apikey': SUPABASE_ANON,
        'Authorization': `Bearer ${access_token}`
      }
    });
    const user = await res.json();
    if (user?.id) {
      localStorage.setItem('ranzai_session', JSON.stringify({ access_token, refresh_token, user }));
      window.history.replaceState({}, '', window.location.pathname);
    }
  } catch(e) {}
})();
