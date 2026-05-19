// RanzAI App Logic
let imageBase64 = null;
let imageMime = 'image/jpeg';

let currentFormat = 'json';
let currentTargetAI = 'chatgpt';
let currentVisualStyle = 'normal';

let rawResult = '';

const SUPABASE_URL = 'https://cavouyzyasnuygkuwizy.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_6eixKKot9VleMm2KVD4o7w_C58lRv6r';
const GENERATE_ENDPOINT = 'https://cavouyzyasnuygkuwizy.supabase.co/functions/v1/generate-prompt';

// ── Baca token dari URL hash setelah login Google ─────────────────────
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
        'apikey': SUPABASE_PUBLISHABLE_KEY,
        'Authorization': `Bearer ${access_token}`
      }
    });
    const user = await res.json();
    if (user?.id) {
      localStorage.setItem('ranzai_session', JSON.stringify({ access_token, refresh_token, user }));
    }
  } catch(e) {}
  window.history.replaceState({}, '', window.location.pathname);
})();

  const raw = localStorage.getItem('ranzai_session');
  return raw ? JSON.parse(raw) : null;
}

// ── Get user credits ─────────────────────────────────────────────────
async function getUserCredits() {
  const session = getSession();
  if (!session?.user?.id) return { free_used: 0, paid_credits: 0 };

  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/user_credits?user_id=eq.${session.user.id}&select=free_used,paid_credits`,
    {
      headers: {
        apikey: SUPABASE_PUBLISHABLE_KEY,
        Authorization: `Bearer ${session.access_token}`
      }
    }
  );

  const data = await res.json();
  if (!data.length) return { free_used: 0, paid_credits: 0 };
  return {
    free_used:    data[0].free_used    || 0,
    paid_credits: data[0].paid_credits || 0
  };
}

// ── Decrease credits setelah generate ────────────────────────────────
async function decreaseCredits(useFree) {
  const session = getSession();
  if (!session?.user?.id) return;

  const credits = await getUserCredits();

  const body = useFree
    ? { free_used: credits.free_used + 1 }
    : { paid_credits: credits.paid_credits - 1 };

  await fetch(
    `${SUPABASE_URL}/rest/v1/user_credits?user_id=eq.${session.user.id}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        apikey: SUPABASE_PUBLISHABLE_KEY,
        Authorization: `Bearer ${session.access_token}`
      },
      body: JSON.stringify(body)
    }
  );
}

// ── DOM Elements ─────────────────────────────────────────────────────
const fileInput     = document.getElementById('fileInput');
const uploadZone    = document.getElementById('uploadZone');
const previewWrap   = document.getElementById('previewWrap');
const previewImg    = document.getElementById('previewImg');
const generateBtn   = document.getElementById('generateBtn');
const resultBox     = document.getElementById('resultBox');
const resultContent = document.getElementById('resultContent');
const errorMsg      = document.getElementById('errorMsg');
const removeBtn     = document.getElementById('removeBtn');
const copyBtn       = document.getElementById('copyBtn');

// ── Upload events ─────────────────────────────────────────────────────
uploadZone.addEventListener('click', () => fileInput.click());

uploadZone.addEventListener('dragover', e => {
  e.preventDefault();
  uploadZone.classList.add('drag-over');
});

uploadZone.addEventListener('dragleave', () => {
  uploadZone.classList.remove('drag-over');
});

uploadZone.addEventListener('drop', e => {
  e.preventDefault();
  uploadZone.classList.remove('drag-over');
  const file = e.dataTransfer.files[0];
  if (file) loadImage(file);
});

fileInput.addEventListener('change', () => {
  if (fileInput.files[0]) loadImage(fileInput.files[0]);
});

removeBtn.addEventListener('click', () => {
  imageBase64 = null;
  previewWrap.style.display = 'none';
  uploadZone.style.display = 'block';
  generateBtn.disabled = true;
  resultBox.style.display = 'none';
  errorMsg.style.display = 'none';
  fileInput.value = '';
});

generateBtn.addEventListener('click', generatePrompt);
copyBtn.addEventListener('click', copyResult);

// ── Toggle buttons ────────────────────────────────────────────────────
document.querySelectorAll('[data-format]').forEach(button => {
  button.addEventListener('click', () => {
    currentFormat = button.dataset.format;
    setActiveButton(button);
  });
});

document.querySelectorAll('[data-target]').forEach(button => {
  button.addEventListener('click', () => {
    currentTargetAI = button.dataset.target;
    setActiveButton(button);
  });
});

document.querySelectorAll('[data-style]').forEach(button => {
  button.addEventListener('click', () => {
    currentVisualStyle = button.dataset.style;
    setActiveButton(button);
  });
});

function setActiveButton(button) {
  const group = button.closest('.option-group');
  group.querySelectorAll('.fmt-btn').forEach(btn => btn.classList.remove('active'));
  button.classList.add('active');
}

// ── Load image ────────────────────────────────────────────────────────
function loadImage(file) {
  if (!file.type.startsWith('image/')) return showError('File harus berupa gambar.');
  if (file.size > 10 * 1024 * 1024) return showError('Ukuran file maks 10MB.');

  imageMime = file.type;
  const reader = new FileReader();

  reader.onload = e => {
    imageBase64 = e.target.result.split(',')[1];
    previewImg.src = e.target.result;
    previewWrap.style.display = 'block';
    uploadZone.style.display = 'none';
    generateBtn.disabled = false;
    errorMsg.style.display = 'none';
    resultBox.style.display = 'none';
  };

  reader.readAsDataURL(file);
}

function buildPrompt() {
  return window.RanzAIEngine.buildPrompt({
    format: currentFormat,
    targetAI: currentTargetAI,
    visualStyle: currentVisualStyle
  });
}

// ── Generate ──────────────────────────────────────────────────────────
async function generatePrompt() {
  if (!imageBase64) return;

  // Cek session
  const session = getSession();
  if (!session?.user?.id) {
    return showError('Kamu belum login. Silakan login dulu.');
  }

  // Cek credits
  const credits = await getUserCredits();
  const canUseFree = credits.free_used < 1;
  const hasPaid    = credits.paid_credits > 0;

  if (!canUseFree && !hasPaid) {
    return showTopUpPopup();
  }

  generateBtn.disabled = true;
  generateBtn.classList.add('loading');
  generateBtn.querySelector('.btn-text').textContent =
    document.documentElement.lang === 'en' ? 'Analyzing...' : 'Menganalisis...';
  resultBox.style.display = 'none';
  errorMsg.style.display = 'none';

  try {
    const response = await fetch(GENERATE_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_PUBLISHABLE_KEY,
        'Authorization': 'Bearer ' + session.access_token
      },
      body: JSON.stringify({
        imageBase64,
        mimeType: imageMime,
        prompt: buildPrompt()
      })
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Generate gagal.');

    rawResult = data.result || '';

    // Kurangi kredit — free dulu, kalau sudah habis pakai paid
    await decreaseCredits(canUseFree);

    displayResult(rawResult);

  } catch (err) {
    showError('Error: ' + err.message);
  } finally {
    generateBtn.disabled = false;
    generateBtn.classList.remove('loading');
    generateBtn.querySelector('.btn-text').textContent = '✦ Generate Prompt';
  }
}

// ── Display & highlight ───────────────────────────────────────────────
function displayResult(text) {
  resultContent.innerHTML = syntaxHighlight(text);
  resultBox.style.display = 'block';
  resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function syntaxHighlight(text) {
  try {
    const parsed = JSON.parse(text.trim());
    const json = JSON.stringify(parsed, null, 2);
    return json
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"([^"]+)":/g, '<span class="key">"$1"</span>:')
      .replace(/: "([^"]*)"(,?)/g, ': <span class="string">"$1"</span>$2')
      .replace(/: (\d+)(,?)/g, ': <span class="number">$1</span>$2');
  } catch {
    return text
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/---/g, '<hr style="border-color:#2a2a30;margin:16px 0">');
  }
}

// ── Copy ──────────────────────────────────────────────────────────────
function copyResult() {
  navigator.clipboard.writeText(rawResult).then(() => {
    copyBtn.textContent = document.documentElement.lang === 'en' ? '✓ Copied!' : '✓ Tersalin!';
    copyBtn.classList.add('copied');
    setTimeout(() => {
      copyBtn.textContent = 'Copy';
      copyBtn.classList.remove('copied');
    }, 2000);
  });
}

// ── Error ─────────────────────────────────────────────────────────────
function showError(msg) {
  errorMsg.textContent = msg;
  errorMsg.style.display = 'block';
}

// ── Popup Top Up ──────────────────────────────────────────────────────
function showTopUpPopup() {
  document.getElementById("popupOverlay").classList.add("show");
}

function closePopup() {
  document.getElementById("popupOverlay").classList.remove("show");
}
