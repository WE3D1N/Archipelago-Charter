/* =============================================================
   Archipelago Charter Service — Cookie Consent (GTM Consent Mode v2)
   Include once per page: <script src="/cookie-consent.js"></script>
   Place it as the last element before </body>.
   ============================================================= */
(function () {
  'use strict';

  const STORAGE_KEY = 'acs_cookie_consent';
  const EXPIRY_DAYS = 365;

  // ── Helpers ───────────────────────────────────────────────────────
  function setCookie(val) {
    const exp = new Date(Date.now() + EXPIRY_DAYS * 864e5).toUTCString();
    document.cookie =
      STORAGE_KEY + '=' + JSON.stringify(val) +
      '; expires=' + exp + '; path=/; SameSite=Lax';
  }
  function getCookie() {
    const m = document.cookie.match('(?:^|;)\\s*' + STORAGE_KEY + '=([^;]+)');
    try { return m ? JSON.parse(decodeURIComponent(m[1])) : null; } catch (e) { return null; }
  }

  // ── GTM Consent Mode v2 ───────────────────────────────────────────
  function pushConsent(analytics, marketing, isUpdate) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(['consent', isUpdate ? 'update' : 'default', {
      analytics_storage:     analytics ? 'granted' : 'denied',
      ad_storage:            marketing ? 'granted' : 'denied',
      ad_user_data:          marketing ? 'granted' : 'denied',
      ad_personalization:    marketing ? 'granted' : 'denied',
      functionality_storage: 'granted',
      security_storage:      'granted',
    }]);
    if (isUpdate) {
      window.dataLayer.push({
        event:              'cookie_consent_update',
        consent_analytics:  analytics ? 'granted' : 'denied',
        consent_marketing:  marketing ? 'granted' : 'denied',
      });
    }
  }

  // Push denied defaults immediately — before GTM fires any tags
  pushConsent(false, false, false);

  // ── Inject HTML ───────────────────────────────────────────────────
  const HTML = `
<div id="cookie-banner" role="dialog" aria-modal="true" aria-labelledby="cookie-title" style="
  position:fixed;bottom:1.5rem;left:50%;
  transform:translateX(-50%) translateY(120%);
  width:min(680px,calc(100vw - 2rem));
  background:#000a1e;color:#e8edf4;
  border-radius:1.5rem;
  box-shadow:0 32px 80px rgba(0,10,30,.55),0 2px 0 rgba(255,255,255,.06) inset;
  padding:1.75rem 2rem;z-index:9999;
  font-family:'Manrope',sans-serif;
  border:1px solid rgba(255,255,255,.08);
  transition:transform .5s cubic-bezier(.34,1.56,.64,1),opacity .4s ease;
  opacity:0;will-change:transform,opacity;display:none;">

  <div style="display:flex;align-items:flex-start;gap:1rem;margin-bottom:1rem;">
    <span style="font-size:1.4rem;flex-shrink:0;margin-top:.1rem;">🍪</span>
    <div>
      <p id="cookie-title" style="font-family:'Noto Serif',serif;font-size:1.05rem;font-weight:600;color:#fff;margin-bottom:.35rem;letter-spacing:-.01em;"
        data-sv="Vi använder kakor" data-en="We use cookies">Vi använder kakor</p>
      <p id="cookie-desc" style="font-size:.82rem;line-height:1.65;color:#8fa4be;"
        data-sv="Vi och våra partners använder cookies för att förbättra upplevelsen, analysera trafik och visa relevant innehåll. Välj vad du godkänner – ditt val sparas i 365 dagar. Läs mer i vår <a href='/privacy-policy/' style='color:#fc8a40;text-decoration:underline;text-underline-offset:2px;'>integritetspolicy</a>."
        data-en="We and our partners use cookies to improve the experience, analyse traffic and show relevant content. Choose what you allow – your choice is saved for 365 days. Read more in our <a href='/privacy-policy/' style='color:#fc8a40;text-decoration:underline;text-underline-offset:2px;'>privacy policy</a>.">
        Vi och våra partners använder cookies för att förbättra upplevelsen, analysera trafik och visa relevant innehåll. Välj vad du godkänner – ditt val sparas i 365 dagar. Läs mer i vår <a href='/privacy-policy/' style='color:#fc8a40;text-decoration:underline;text-underline-offset:2px;'>integritetspolicy</a>.
      </p>
    </div>
  </div>

  <div id="cookie-custom-panel" style="display:none;margin-bottom:1.25rem;border-top:1px solid rgba(255,255,255,.08);padding-top:1.1rem;">
    <p style="font-size:.78rem;font-weight:600;color:#8fa4be;text-transform:uppercase;letter-spacing:.08em;margin-bottom:.85rem;"
      data-sv="Välj kategorier" data-en="Choose categories">Välj kategorier</p>

    <label style="display:flex;align-items:flex-start;gap:.75rem;margin-bottom:.8rem;cursor:default;">
      <span style="position:relative;width:38px;height:22px;flex-shrink:0;margin-top:.05rem;">
        <input type="checkbox" checked disabled style="opacity:0;position:absolute;width:0;height:0;">
        <span style="position:absolute;inset:0;background:rgba(155,69,0,.4);border-radius:99px;border:1px solid rgba(155,69,0,.6);"></span>
        <span style="position:absolute;top:3px;left:3px;width:16px;height:16px;background:#fc8a40;border-radius:50%;"></span>
      </span>
      <div>
        <span style="font-size:.84rem;font-weight:600;color:#c8d8ec;" data-sv="Nödvändiga" data-en="Necessary">Nödvändiga</span>
        <p style="font-size:.77rem;color:#607a94;margin-top:.15rem;" data-sv="Krävs för att sidan ska fungera. Kan inte stängas av." data-en="Required for the site to function. Cannot be disabled.">Krävs för att sidan ska fungera. Kan inte stängas av.</p>
      </div>
    </label>

    <label style="display:flex;align-items:flex-start;gap:.75rem;margin-bottom:.8rem;cursor:pointer;">
      <span style="position:relative;width:38px;height:22px;flex-shrink:0;margin-top:.05rem;">
        <input id="toggle-analytics" type="checkbox" style="opacity:0;position:absolute;width:0;height:0;">
        <span id="analytics-track" style="position:absolute;inset:0;background:rgba(255,255,255,.06);border-radius:99px;border:1px solid rgba(255,255,255,.12);transition:background .2s,border .2s;"></span>
        <span id="analytics-thumb" style="position:absolute;top:3px;left:3px;width:16px;height:16px;background:#8fa4be;border-radius:50%;transition:transform .2s,background .2s;"></span>
      </span>
      <div>
        <span style="font-size:.84rem;font-weight:600;color:#c8d8ec;" data-sv="Analys" data-en="Analytics">Analys</span>
        <p style="font-size:.77rem;color:#607a94;margin-top:.15rem;" data-sv="Hjälper oss förstå hur besökare använder sidan (Google Analytics)." data-en="Helps us understand how visitors use the site (Google Analytics).">Hjälper oss förstå hur besökare använder sidan (Google Analytics).</p>
      </div>
    </label>

    <label style="display:flex;align-items:flex-start;gap:.75rem;cursor:pointer;">
      <span style="position:relative;width:38px;height:22px;flex-shrink:0;margin-top:.05rem;">
        <input id="toggle-marketing" type="checkbox" style="opacity:0;position:absolute;width:0;height:0;">
        <span id="marketing-track" style="position:absolute;inset:0;background:rgba(255,255,255,.06);border-radius:99px;border:1px solid rgba(255,255,255,.12);transition:background .2s,border .2s;"></span>
        <span id="marketing-thumb" style="position:absolute;top:3px;left:3px;width:16px;height:16px;background:#8fa4be;border-radius:50%;transition:transform .2s,background .2s;"></span>
      </span>
      <div>
        <span style="font-size:.84rem;font-weight:600;color:#c8d8ec;" data-sv="Marknadsföring" data-en="Marketing">Marknadsföring</span>
        <p style="font-size:.77rem;color:#607a94;margin-top:.15rem;" data-sv="Används för remarketing och personaliserade annonser." data-en="Used for remarketing and personalised ads.">Används för remarketing och personaliserade annonser.</p>
      </div>
    </label>
  </div>

  <div style="display:flex;flex-wrap:wrap;gap:.6rem;margin-top:.25rem;">
    <button id="cookie-btn-all" style="flex:1;min-width:140px;background:linear-gradient(135deg,#9b4500,#c85800);color:#fff;border:none;border-radius:999px;padding:.65rem 1.25rem;font-family:'Manrope',sans-serif;font-size:.84rem;font-weight:600;cursor:pointer;letter-spacing:.01em;box-shadow:0 4px 16px rgba(155,69,0,.4);transition:transform .15s ease,box-shadow .15s ease;" data-sv="Godkänn alla" data-en="Accept all">Godkänn alla</button>
    <button id="cookie-btn-custom" style="flex:1;min-width:140px;background:transparent;color:#c8d8ec;border:1px solid rgba(255,255,255,.18);border-radius:999px;padding:.65rem 1.25rem;font-family:'Manrope',sans-serif;font-size:.84rem;font-weight:500;cursor:pointer;letter-spacing:.01em;transition:background .15s ease,border-color .15s ease,transform .15s ease;" data-sv="Anpassa" data-en="Customize">Anpassa</button>
    <button id="cookie-btn-save" style="display:none;flex:1;min-width:140px;background:rgba(255,255,255,.1);color:#fff;border:1px solid rgba(255,255,255,.25);border-radius:999px;padding:.65rem 1.25rem;font-family:'Manrope',sans-serif;font-size:.84rem;font-weight:600;cursor:pointer;letter-spacing:.01em;transition:background .15s ease,transform .15s ease;" data-sv="Spara val" data-en="Save choices">Spara val</button>
    <button id="cookie-btn-deny" style="flex:1;min-width:140px;background:transparent;color:#607a94;border:1px solid rgba(255,255,255,.07);border-radius:999px;padding:.65rem 1.25rem;font-family:'Manrope',sans-serif;font-size:.84rem;font-weight:500;cursor:pointer;letter-spacing:.01em;transition:color .15s ease,border-color .15s ease,transform .15s ease;" data-sv="Neka alla" data-en="Deny all">Neka alla</button>
  </div>
</div>

<button id="cookie-reopen" aria-label="Cookieinställningar" style="display:none;position:fixed;bottom:1.25rem;left:1.25rem;width:2.75rem;height:2.75rem;background:#000a1e;color:#8fa4be;border:1px solid rgba(255,255,255,.12);border-radius:50%;cursor:pointer;font-size:1.1rem;z-index:9998;box-shadow:0 4px 16px rgba(0,10,30,.4);transition:color .15s,background .15s,transform .15s;">🍪</button>
`;

  document.body.insertAdjacentHTML('beforeend', HTML);

  // ── DOM refs ──────────────────────────────────────────────────────
  const banner      = document.getElementById('cookie-banner');
  const reopen      = document.getElementById('cookie-reopen');
  const panel       = document.getElementById('cookie-custom-panel');
  const btnAll      = document.getElementById('cookie-btn-all');
  const btnCustom   = document.getElementById('cookie-btn-custom');
  const btnSave     = document.getElementById('cookie-btn-save');
  const btnDeny     = document.getElementById('cookie-btn-deny');
  const togAnalytics = document.getElementById('toggle-analytics');
  const togMarketing = document.getElementById('toggle-marketing');

  // ── Banner visibility ─────────────────────────────────────────────
  function showBanner() {
    banner.style.display = 'block';
    requestAnimationFrame(() => requestAnimationFrame(() => {
      banner.style.transform = 'translateX(-50%) translateY(0)';
      banner.style.opacity   = '1';
    }));
    reopen.style.display = 'none';
  }
  function hideBanner() {
    banner.style.transform = 'translateX(-50%) translateY(120%)';
    banner.style.opacity   = '0';
    setTimeout(() => { banner.style.display = 'none'; }, 500);
    reopen.style.display = 'block';
  }

  // ── Toggle switch visual ──────────────────────────────────────────
  function applyToggle(input, trackId, thumbId) {
    const track = document.getElementById(trackId);
    const thumb = document.getElementById(thumbId);
    if (input.checked) {
      track.style.background   = 'rgba(155,69,0,.5)';
      track.style.borderColor  = 'rgba(155,69,0,.7)';
      thumb.style.background   = '#fc8a40';
      thumb.style.transform    = 'translateX(16px)';
    } else {
      track.style.background   = 'rgba(255,255,255,.06)';
      track.style.borderColor  = 'rgba(255,255,255,.12)';
      thumb.style.background   = '#8fa4be';
      thumb.style.transform    = 'translateX(0)';
    }
  }

  togAnalytics.addEventListener('change', () => applyToggle(togAnalytics, 'analytics-track', 'analytics-thumb'));
  togMarketing.addEventListener('change', () => applyToggle(togMarketing, 'marketing-track', 'marketing-thumb'));

  // ── Button hover helpers ──────────────────────────────────────────
  function addHover(el, overFn, outFn) {
    el.addEventListener('mouseover',  overFn);
    el.addEventListener('mouseout',   outFn);
    el.addEventListener('mousedown',  () => { el.style.transform = 'translateY(0)'; });
  }
  addHover(btnAll,
    () => { btnAll.style.transform = 'translateY(-1px)'; btnAll.style.boxShadow = '0 6px 20px rgba(155,69,0,.55)'; },
    () => { btnAll.style.transform = '';                 btnAll.style.boxShadow = '0 4px 16px rgba(155,69,0,.4)'; });
  addHover(btnCustom,
    () => { btnCustom.style.background = 'rgba(255,255,255,.07)'; btnCustom.style.transform = 'translateY(-1px)'; },
    () => { btnCustom.style.background = 'transparent';           btnCustom.style.transform = ''; });
  addHover(btnSave,
    () => { btnSave.style.background = 'rgba(255,255,255,.16)'; btnSave.style.transform = 'translateY(-1px)'; },
    () => { btnSave.style.background = 'rgba(255,255,255,.1)';  btnSave.style.transform = ''; });
  addHover(btnDeny,
    () => { btnDeny.style.color = '#8fa4be'; btnDeny.style.borderColor = 'rgba(255,255,255,.14)'; btnDeny.style.transform = 'translateY(-1px)'; },
    () => { btnDeny.style.color = '#607a94'; btnDeny.style.borderColor = 'rgba(255,255,255,.07)'; btnDeny.style.transform = ''; });
  addHover(reopen,
    () => { reopen.style.background = '#0d1b2a'; reopen.style.color = '#e8edf4'; reopen.style.transform = 'scale(1.08)'; },
    () => { reopen.style.background = '#000a1e';  reopen.style.color = '#8fa4be'; reopen.style.transform = 'scale(1)'; });

  // ── Anpassa panel toggle ──────────────────────────────────────────
  btnCustom.addEventListener('click', () => {
    panel.style.display     = 'block';
    btnCustom.style.display = 'none';
    btnSave.style.display   = 'inline-flex';
  });

  // ── Consent decisions ─────────────────────────────────────────────
  function decide(analytics, marketing, choice) {
    setCookie({ choice, analytics, marketing, ts: Date.now() });
    pushConsent(analytics, marketing, true);
    hideBanner();
  }

  btnAll.addEventListener('click',  () => decide(true, true, 'all'));
  btnDeny.addEventListener('click', () => decide(false, false, 'none'));
  btnSave.addEventListener('click', () => decide(togAnalytics.checked, togMarketing.checked, 'custom'));

  // ── Re-open ───────────────────────────────────────────────────────
  reopen.addEventListener('click', () => {
    const saved = getCookie();
    if (saved) {
      togAnalytics.checked = !!saved.analytics;
      togMarketing.checked = !!saved.marketing;
      applyToggle(togAnalytics, 'analytics-track', 'analytics-thumb');
      applyToggle(togMarketing, 'marketing-track', 'marketing-thumb');
      panel.style.display     = 'block';
      btnCustom.style.display = 'none';
      btnSave.style.display   = 'inline-flex';
    }
    showBanner();
  });

  // ── Language sync ─────────────────────────────────────────────────
  function syncLang() {
    const key = (document.documentElement.lang || 'sv').startsWith('en') ? 'en' : 'sv';
    banner.querySelectorAll('[data-sv]').forEach(el => {
      const val = el.dataset[key];
      if (val !== undefined) el.innerHTML = val;
    });
  }
  syncLang();
  new MutationObserver(syncLang).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });

  // ── Init ──────────────────────────────────────────────────────────
  const saved = getCookie();
  if (saved) {
    pushConsent(saved.analytics, saved.marketing, true);
    reopen.style.display = 'block';
  } else {
    setTimeout(showBanner, 800);
  }
})();
