// RanzAI global UI: language + theme
(function () {
  const STORAGE_LANG = 'ranzai_lang';
  const STORAGE_THEME = 'ranzai_theme';

  const translations = {
    id: {
      nav_how: 'Cara Kerja', nav_features: 'Fitur', nav_pricing: 'Harga', nav_login: 'Login', nav_try: 'Coba Gratis →',
      hero_badge: 'Powered by GPT-4.1 Mini', hero_title_prefix: 'Image →', hero_title_accent: 'Prompt.',
      hero_sub: 'Upload gambar apapun. Dapatkan prompt AI yang detail, siap pakai untuk ChatGPT, Gemini, Midjourney, DALL·E, Flux, SDXL, dan lainnya.',
      hero_cta: '✦ Coba Gratis', hero_ghost: 'Cara Kerja ↓', hero_note: 'Tanpa signup · Gratis dicoba', scroll: 'Scroll',
      mock_url: 'ranzai.app', mock_sub: 'upload gambar · generate · copy · done', upload_text: 'Drop gambar di sini atau klik untuk pilih', upload_hint: 'JPG, PNG, WEBP — maks 10MB', mock_btn: '✦ Generate Prompt',
      how_label: '// Cara kerja', how_title: 'Tiga langkah.\nSatu menit.', step1_title: 'Upload Gambar', step1_text: 'Drag & drop atau klik untuk pilih gambar. Mendukung JPG, PNG, dan WEBP hingga 10MB.', step2_title: 'Generate Prompt', step2_text: 'GPT-4.1 Mini menganalisis gambar secara mendalam — subjek, style, lighting, mood, dan elemen visual lainnya.', step3_title: 'Copy & Pakai', step3_text: 'Salin prompt dalam format JSON structured atau plain text. Langsung pakai di AI generator favoritmu.',
      features_label: '// Fitur', features_title: 'Semua yang kamu\nbutuhkan.', f1_title: 'JSON Structured', f1_text: 'Output terstruktur dengan field: style, lighting, mood, color palette, camera angle, dan lainnya.', f2_title: 'Plain Text Prompt', f2_text: 'Prompt siap pakai, clean, powerful, langsung copy-paste.', f3_title: 'Cepat & Akurat', f3_text: 'Powered by GPT-4.1 Mini untuk analisis gambar yang cepat, detail, dan hemat.', f4_title: 'Private & Aman', f4_text: 'API key aman lewat backend Supabase. Gambar diproses untuk kebutuhan generate prompt.',
      pricing_label: '// Harga', pricing_title: 'Credit system.\nTanpa bulanan.', free_name: 'Free', free_desc: 'Untuk coba-coba dan penggunaan ringan.', free_f1: 'Generate terbatas', free_f2: 'JSON & Plain Text output', free_f3: 'Format gambar standar', start_free: 'Mulai Gratis', credit_tag: 'Recommended', credit_name: 'Credits', credit_desc: 'Bayar sesuai pakai. Cocok untuk kreator yang ingin explore.', credit_f1: '1 credit = 1 generate', credit_f2: 'Tidak wajib langganan bulanan', credit_f3: 'Cocok untuk style exploration', credit_f4: 'Fleksibel untuk user casual', start_now: 'Mulai Sekarang', teams_name: 'Teams', teams_desc: 'Untuk tim kreatif dan agensi.', teams_f1: 'Paket credit tim', teams_f2: 'Shared usage', teams_f3: 'Priority support', contact: 'Hubungi Kami',
      cta_title: 'Mulai generate\nsekarang.', cta_text: 'Upload gambar pertamamu. Gratis dicoba, langsung jalan.', cta_btn: '✦ Buka App →', footer_copy: '© 2026 RanzAI · by Iky',
      app_title: 'Image →', app_title_accent: 'Prompt', app_subtitle: 'upload gambar · generate · copy · done', output_format: 'Output Format', target_ai: 'Target AI', visual_style: 'Visual Style', generate: '✦ Generate Prompt', analyzing: 'Analyzing...', output_prompt: 'OUTPUT PROMPT', copy: 'Copy', copied: '✓ Copied!', replace: '✕ Ganti', app_footer: 'RanzAI · powered by OpenAI Vision · by Iky'
    },
    en: {
      nav_how: 'How it works', nav_features: 'Features', nav_pricing: 'Pricing', nav_login: 'Login', nav_try: 'Try Free →',
      hero_badge: 'Powered by GPT-4.1 Mini', hero_title_prefix: 'Image →', hero_title_accent: 'Prompt.',
      hero_sub: 'Upload any image. Get detailed AI prompts ready for ChatGPT, Gemini, Midjourney, DALL·E, Flux, SDXL, and more.',
      hero_cta: '✦ Try Free', hero_ghost: 'How it works ↓', hero_note: 'No signup required · Free to try', scroll: 'Scroll',
      mock_url: 'ranzai.app', mock_sub: 'upload image · generate · copy · done', upload_text: 'Drop image here or click to choose', upload_hint: 'JPG, PNG, WEBP — max 10MB', mock_btn: '✦ Generate Prompt',
      how_label: '// How it works', how_title: 'Three steps.\nOne minute.', step1_title: 'Upload Image', step1_text: 'Drag & drop or click to choose an image. Supports JPG, PNG, and WEBP up to 10MB.', step2_title: 'Generate Prompt', step2_text: 'GPT-4.1 Mini analyzes the image deeply — subject, style, lighting, mood, and other visual elements.', step3_title: 'Copy & Use', step3_text: 'Copy the prompt in JSON structured or plain text format. Use it directly in your favorite AI generator.',
      features_label: '// Features', features_title: 'Everything you\nneed.', f1_title: 'JSON Structured', f1_text: 'Structured output with fields like style, lighting, mood, color palette, camera angle, and more.', f2_title: 'Plain Text Prompt', f2_text: 'Ready-to-use prompts, clean, powerful, and copy-paste friendly.', f3_title: 'Fast & Accurate', f3_text: 'Powered by GPT-4.1 Mini for fast, detailed, and efficient image analysis.', f4_title: 'Private & Safe', f4_text: 'API key stays safe through Supabase backend. Images are processed for prompt generation.',
      pricing_label: '// Pricing', pricing_title: 'Credit system.\nNo monthly lock.', free_name: 'Free', free_desc: 'For testing and light usage.', free_f1: 'Limited generation', free_f2: 'JSON & Plain Text output', free_f3: 'Standard image format', start_free: 'Start Free', credit_tag: 'Recommended', credit_name: 'Credits', credit_desc: 'Pay as you use. Built for creators who want to explore.', credit_f1: '1 credit = 1 generation', credit_f2: 'No monthly subscription required', credit_f3: 'Great for style exploration', credit_f4: 'Flexible for casual users', start_now: 'Start Now', teams_name: 'Teams', teams_desc: 'For creative teams and agencies.', teams_f1: 'Team credit package', teams_f2: 'Shared usage', teams_f3: 'Priority support', contact: 'Contact Us',
      cta_title: 'Start generating\nnow.', cta_text: 'Upload your first image. Free to try, ready instantly.', cta_btn: '✦ Open App →', footer_copy: '© 2026 RanzAI · by Iky',
      app_title: 'Image →', app_title_accent: 'Prompt', app_subtitle: 'upload image · generate · copy · done', output_format: 'Output Format', target_ai: 'Target AI', visual_style: 'Visual Style', generate: '✦ Generate Prompt', analyzing: 'Analyzing...', output_prompt: 'OUTPUT PROMPT', copy: 'Copy', copied: '✓ Copied!', replace: '✕ Replace', app_footer: 'RanzAI · powered by OpenAI Vision · by Iky'
    }
  };

  function applyLang(lang) {
    const safeLang = translations[lang] ? lang : 'id';
    document.documentElement.lang = safeLang;
    localStorage.setItem(STORAGE_LANG, safeLang);
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      const value = translations[safeLang][key];
      if (!value) return;
      el.innerHTML = value.replace(/\n/g, '<br>');
    });
    document.querySelectorAll('[data-lang-btn]').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.langBtn === safeLang);
    });
  }

  function applyTheme(theme) {
    const safeTheme = theme === 'light' ? 'light' : 'dark';
    document.documentElement.dataset.theme = safeTheme;
    localStorage.setItem(STORAGE_THEME, safeTheme);
    const themeBtn = document.querySelector('[data-theme-toggle]');
    if (themeBtn) themeBtn.textContent = safeTheme === 'dark' ? '☾ Dark' : '☀ Light';
  }

  function init() {
    applyLang(localStorage.getItem(STORAGE_LANG) || 'id');
    applyTheme(localStorage.getItem(STORAGE_THEME) || 'dark');

    document.querySelectorAll('[data-lang-btn]').forEach(btn => {
      btn.addEventListener('click', () => applyLang(btn.dataset.langBtn));
    });

    const themeBtn = document.querySelector('[data-theme-toggle]');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        const current = document.documentElement.dataset.theme || 'dark';
        applyTheme(current === 'dark' ? 'light' : 'dark');
      });
    }
  }

  window.RanzAIUI = { applyLang, applyTheme };
  document.addEventListener('DOMContentLoaded', init);
})();
