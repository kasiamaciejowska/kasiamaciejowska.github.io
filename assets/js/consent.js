/* Cookie consent + Google Tag Manager loader.
   GTM (GTM-MBCB6KVB) is only loaded after the visitor accepts.
   The choice is kept in localStorage ("analytics-consent": "granted" | "denied"). */
(function () {
  var GTM_ID = 'GTM-MBCB6KVB';
  var KEY = 'analytics-consent';

  var T = {
    en: {
      text: 'We use Google Analytics (via Google Tag Manager) to count visits. If you accept, cookies are set in your browser and anonymous usage data is sent to Google. The site works the same if you decline.',
      accept: 'Accept', decline: 'Decline', settings: 'Cookie settings', privacy: 'Privacy', more: 'More info', label: 'Cookie notice'
    },
    nl: {
      text: 'Wij gebruiken Google Analytics (via Google Tag Manager) om bezoeken te tellen. Als u accepteert, worden cookies in uw browser geplaatst en worden anonieme gebruiksgegevens naar Google gestuurd. De site werkt hetzelfde als u weigert.',
      accept: 'Accepteren', decline: 'Weigeren', settings: 'Cookie-instellingen', privacy: 'Privacy', more: 'Meer info', label: 'Cookiemelding'
    },
    pl: {
      text: 'Używamy Google Analytics (przez Google Tag Manager) do liczenia odwiedzin. Jeśli się zgodzisz, w Twojej przeglądarce zostaną zapisane pliki cookie, a anonimowe dane o korzystaniu ze strony trafią do Google. Strona działa tak samo, jeśli odmówisz.',
      accept: 'Akceptuję', decline: 'Odrzucam', settings: 'Ustawienia cookies', privacy: 'Prywatność', more: 'Więcej', label: 'Informacja o cookies'
    }
  };
  var lang = (document.documentElement.lang || 'en').slice(0, 2).toLowerCase();
  var t = T[lang] || T.en;

  var privacyUrl = (location.pathname.indexOf('/' + lang + '/') !== -1 ? '' : '/' + lang + '/') + 'privacy.html';

  function get() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function set(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }

  function loadGTM() {
    if (window.__gtmLoaded) return;
    window.__gtmLoaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtm.js?id=' + GTM_ID;
    document.head.appendChild(s);
  }

  function clearGoogleCookies() {
    var host = location.hostname.split('.');
    var domains = [location.hostname];
    for (var i = 1; i < host.length - 1; i++) domains.push('.' + host.slice(i).join('.'));
    document.cookie.split(';').forEach(function (c) {
      var name = c.split('=')[0].trim();
      if (name.indexOf('_ga') === 0 || name.indexOf('_gid') === 0 || name.indexOf('_gat') === 0) {
        document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
        domains.forEach(function (d) {
          document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=' + d;
        });
      }
    });
  }

  var css = '' +
    '#cc-banner{position:fixed;left:16px;bottom:16px;z-index:2000;max-width:340px;background:#FAFAFA;color:#33302B;' +
    'border:1px solid rgba(46,77,66,.25);border-radius:10px;box-shadow:0 6px 24px rgba(0,0,0,.15);padding:14px 16px;' +
    'font:400 12.5px/1.5 var(--font-body,Montserrat,sans-serif)}' +
    '#cc-banner p{margin:0 0 10px}' +
    '#cc-banner .cc-btns{display:flex;gap:8px}' +
    '#cc-banner button{flex:1;font:500 12.5px var(--font-body,Montserrat,sans-serif);padding:7px 10px;border-radius:6px;' +
    'border:1px solid #3B6255;background:#fff;color:#3B6255;cursor:pointer}' +
    '#cc-banner button:hover{background:#CBDED3}' +
    '.cc-settings{background:none;border:0;padding:0;margin-left:.75rem;font:inherit;color:inherit;text-decoration:underline;cursor:pointer}' +
    '@media(max-width:480px){#cc-banner{left:8px;right:8px;bottom:8px;max-width:none}}';

  function showBanner() {
    if (document.getElementById('cc-banner')) return;
    var b = document.createElement('div');
    b.id = 'cc-banner';
    b.setAttribute('role', 'dialog');
    b.setAttribute('aria-label', t.label);
    var p = document.createElement('p');
    p.textContent = t.text + ' ';
    var more = document.createElement('a');
    more.href = privacyUrl; more.textContent = t.more;
    more.style.color = 'inherit'; more.style.textDecoration = 'underline';
    p.appendChild(more);
    var row = document.createElement('div');
    row.className = 'cc-btns';
    var no = document.createElement('button');
    no.type = 'button'; no.textContent = t.decline;
    var yes = document.createElement('button');
    yes.type = 'button'; yes.textContent = t.accept;
    no.onclick = function () { choose('denied'); };
    yes.onclick = function () { choose('granted'); };
    row.appendChild(no); row.appendChild(yes);
    b.appendChild(p); b.appendChild(row);
    document.body.appendChild(b);
  }

  function choose(v) {
    var was = get();
    set(v);
    var b = document.getElementById('cc-banner');
    if (b) b.remove();
    if (v === 'granted') loadGTM();
    else if (was === 'granted') { clearGoogleCookies(); }
  }

  function addSettingsLink() {
    var host = document.querySelector('.footer-fine') || document.querySelector('footer');
    if (!host) return;
    var l = document.createElement('button');
    l.type = 'button'; l.className = 'cc-settings'; l.textContent = t.settings;
    l.onclick = showBanner;
    var pv = document.createElement('a');
    pv.href = privacyUrl; pv.textContent = t.privacy;
    pv.className = 'cc-settings'; pv.style.marginLeft = '.75rem';
    host.appendChild(pv);
    host.appendChild(l);
  }

  function init() {
    var st = document.createElement('style');
    st.textContent = css;
    document.head.appendChild(st);
    addSettingsLink();
    var c = get();
    if (c === 'granted') loadGTM();
    else if (c !== 'denied') showBanner();
  }

  if (get() === 'granted') loadGTM(); // load early, before DOM is ready
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
