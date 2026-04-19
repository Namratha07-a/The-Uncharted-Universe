/* ============================================
   UNCHARTED UNIVERSE — main.js
   ============================================ */

/* ── Character Data ── */
const charData = {
  nate: {
    name: 'Nathan "Nate" Drake',
    role: 'Protagonist · Fortune Hunter',
    actor: 'Nolan North',
    emoji: '🧗',
    fullBio: 'Nathan Drake is a charming, wisecracking treasure hunter who claims descent from Sir Francis Drake. Born Nathan Morgan, he adopted the Drake name to honor his idol. Despite his roguish exterior, Nate has a deep moral code and genuine care for those around him. He is an expert in parkour, combat, and has an uncanny ability to survive almost anything through skill and sheer luck.',
    skills: 'Expert climber and parkour athlete, skilled marksman, exceptional researcher, fluent in multiple languages, and surprisingly good at improvising under pressure.',
    quote: 'Fortune favors the bold... usually.',
    traits: ['Charismatic', 'Resourceful', 'Brave', 'Loyal', 'Reckless', 'Witty'],
    games: ["Drake's Fortune", 'Among Thieves', "Drake's Deception", "A Thief's End", 'Lost Legacy']
  },
  sully: {
    name: 'Victor "Sully" Sullivan',
    role: 'Mentor · Father Figure',
    actor: 'Richard McGonagle',
    emoji: '🕵️',
    fullBio: 'Victor Sullivan is a seasoned treasure hunter, smuggler, and pilot who became a father figure to Nathan Drake. A man of the world with a perpetual cigar, Sully has connections in both high and low places. Behind his gruff exterior is a man who would do anything for those he loves.',
    skills: 'Experienced pilot, expert marksman, international smuggler with vast connections, skilled negotiator.',
    quote: "Kid, I've been around long enough to know when something is a bad idea. This is a very bad idea.",
    traits: ['Wise', 'Protective', 'Pragmatic', 'Loyal', 'Sarcastic', 'Experienced'],
    games: ["Drake's Fortune", 'Among Thieves', "Drake's Deception", "A Thief's End"]
  },
  elena: {
    name: 'Elena Fisher',
    role: 'Journalist · Partner',
    actor: 'Emily Rose',
    emoji: '📷',
    fullBio: "Elena Fisher is an award-winning journalist who first met Nate while filming him on an expedition. Her sharp intellect, fearlessness, and strong moral compass make her indispensable. She grounds Nate when his obsessions threaten to take over.",
    skills: 'Investigative journalism, combat training, strategic thinking, excellent marksmanship, foreign language skills.',
    quote: "I'm not some damsel in distress, Nate.",
    traits: ['Intelligent', 'Independent', 'Moral', 'Fearless', 'Honest', 'Compassionate'],
    games: ["Drake's Fortune", 'Among Thieves', "Drake's Deception", "A Thief's End"]
  },
  sam: {
    name: 'Samuel Drake',
    role: "Nathan's Older Brother",
    actor: 'Troy Baker',
    emoji: '🏴‍☠️',
    fullBio: "Samuel Drake is Nathan's older brother — the one who first got him into treasure hunting. Presumed dead for fifteen years, Sam resurfaces with an urgent debt to a dangerous crime lord, pulling Nate back into the life he tried to leave behind.",
    skills: 'Expert lockpick and safecracker, master storyteller, skilled climber, encyclopedic knowledge of Henry Avery and Libertalia.',
    quote: "The thing about lightning, little brother — it never strikes twice.",
    traits: ['Charming', 'Reckless', 'Adventurous', 'Nostalgic', 'Charismatic'],
    games: ["A Thief's End"]
  }
};

/* ── Modal ── */
function openCharModal(charId) {
  const overlay = document.getElementById('char-modal');
  if (!overlay) return;
  const data = charData[charId];
  if (!data) return;
  overlay.querySelector('.modal-avatar').textContent      = data.emoji;
  overlay.querySelector('.modal-name').textContent        = data.name;
  overlay.querySelector('.modal-role').textContent        = data.role;
  overlay.querySelector('.modal-actor').textContent       = 'Voice Actor: ' + data.actor;
  overlay.querySelector('.modal-full-bio').textContent    = data.fullBio;
  overlay.querySelector('.modal-skills-text').textContent = data.skills;
  overlay.querySelector('.modal-quotes').textContent      = '\u201c' + data.quote + '\u201d';
  overlay.querySelector('.modal-traits').innerHTML        = data.traits.map(t => `<span class="trait-tag">${t}</span>`).join('');
  overlay.querySelector('.modal-appearances').innerHTML   = data.games.map(g => `<span class="appear-badge">${g}</span>`).join('');
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const overlay = document.getElementById('char-modal');
  if (overlay) overlay.classList.remove('open');
  document.body.style.overflow = '';
}

/* ── Trailer ── */
function loadTrailer() {
  const p = document.querySelector('.trailer-placeholder');
  const f = document.querySelector('.trailer-iframe');
  if (p) p.style.display = 'none';
  if (f) { f.style.display = 'block'; f.src = f.dataset.src; }
}

/* ── Auth ── */
function getSession() {
  try { return JSON.parse(sessionStorage.getItem('uc_session') || localStorage.getItem('uc_session') || 'null'); }
  catch(e) { return null; }
}
function signOut() {
  sessionStorage.removeItem('uc_session');
  localStorage.removeItem('uc_session');
  window.location.href = 'login.html';
}

/* ── Nav user widget ── */
function initNavUser() {
  const sess = getSession();
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  const widget = document.createElement('div');
  widget.className = 'nav-user-widget';
  if (sess && sess.username) {
    widget.innerHTML =
      `<div class="nav-user-avatar" id="navUserAvatar">${sess.avatar || '🗺️'}</div>` +
      `<span class="nav-user-name" id="navUserName">${sess.username}</span>` +
      `<div class="nav-user-dropdown" id="navUserDropdown">
        <div class="nav-drop-header">
          <div class="nav-drop-avatar">${sess.avatar || '🗺️'}</div>
          <div><div class="nav-drop-name">${sess.username}</div>
          <div class="nav-drop-role">${sess.guest ? 'Guest' : 'Fortune Hunter'}</div></div>
        </div>
        ${sess.guest ? '<a class="nav-drop-item" href="login.html">🔑 &nbsp;Sign In</a>' : ''}
        <div class="nav-drop-sep"></div>
        <button class="nav-drop-item danger" onclick="signOut()">⏻ &nbsp;Sign Out</button>
      </div>`;
    setTimeout(() => {
      const avatar = document.getElementById('navUserAvatar');
      const name   = document.getElementById('navUserName');
      const drop   = document.getElementById('navUserDropdown');
      if (!drop) return;
      const toggle = e => { e.stopPropagation(); drop.classList.toggle('open'); };
      if (avatar) avatar.addEventListener('click', toggle);
      if (name)   name.addEventListener('click', toggle);
      document.addEventListener('click', () => drop.classList.remove('open'));
      drop.addEventListener('click', e => e.stopPropagation());
    }, 0);
  } else {
    widget.innerHTML = '<a href="login.html" class="nav-signin-btn">🔑 Sign In</a>';
  }
  const hamburger = navbar.querySelector('.hamburger');
  hamburger ? navbar.insertBefore(widget, hamburger) : navbar.appendChild(widget);
}

/* ── DOM Ready ── */
document.addEventListener('DOMContentLoaded', () => {

  /* Scroll progress */
  const progressBar = document.getElementById('scroll-progress');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) * 100;
      progressBar.style.width = (isFinite(pct) ? pct : 0) + '%';
    }, { passive: true });
  }

  /* Navbar */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  /* Hamburger */
  const hamburger  = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    });
    mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
    }));
  }

  /* Active nav */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a => {
    if (a.getAttribute('href') === currentPage || (currentPage === '' && a.getAttribute('href') === 'index.html'))
      a.classList.add('active');
  });

  /* Scroll reveal — uses .reveal class, low threshold so it fires fast */
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    if ('IntersectionObserver' in window) {
      const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (!e.isIntersecting) return;
          setTimeout(() => e.target.classList.add('visible'), parseInt(e.target.dataset.delay || 0));
          obs.unobserve(e.target);
        });
      }, { threshold: 0.05, rootMargin: '0px 0px -20px 0px' });
      revealEls.forEach(el => obs.observe(el));
    } else {
      revealEls.forEach(el => el.classList.add('visible'));
    }
  }

  /* Modal close bindings */
  const modalOverlay = document.getElementById('char-modal');
  if (modalOverlay) {
    modalOverlay.addEventListener('click', e => { if (e.target === modalOverlay) closeModal(); });
    const closeBtn = modalOverlay.querySelector('.modal-close');
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
  }
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

  /* Read-more toggles */
  document.querySelectorAll('.read-more-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const extra = document.getElementById(btn.dataset.target);
      if (!extra) return;
      const open = extra.classList.toggle('show');
      btn.classList.toggle('open', open);
      const label = btn.querySelector('.rm-label');
      if (label) label.textContent = open ? 'Read Less' : 'Read More';
    });
  });

  /* Hero particles */
  const particleContainer = document.querySelector('.hero-particles');
  if (particleContainer) {
    for (let i = 0; i < 28; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      p.style.cssText = `left:${Math.random()*100}%;animation-duration:${7+Math.random()*12}s;animation-delay:${Math.random()*9}s;width:${1+Math.random()*2}px;height:${1+Math.random()*2}px;`;
      particleContainer.appendChild(p);
    }
  }

  /* Multi-layer parallax */
  const heroBg      = document.querySelector('.hero-bg');
  const heroOverlay = document.querySelector('.hero-map-overlay');
  const heroContent = document.querySelector('.hero-content');
  const heroGodray  = document.querySelector('.hero-godray');
  const heroHint    = document.querySelector('.hero-scroll-hint');
  if (heroBg) {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        heroBg.style.transform = `translateY(${y * 0.45}px)`;
        if (heroOverlay) heroOverlay.style.transform = `translateY(${y * 0.22}px)`;
        if (heroGodray)  heroGodray.style.transform  = `rotate(-15deg) translateY(${y * 0.3}px)`;
        if (heroContent) {
          heroContent.style.opacity   = Math.max(0, 1 - y / 420).toString();
          heroContent.style.transform = `translateY(${y * 0.12}px)`;
        }
        if (heroHint) heroHint.style.opacity = Math.max(0, 1 - y / 120).toString();
        ticking = false;
      });
    }, { passive: true });
  }

  /* Stat counter */
  document.querySelectorAll('.stat-number').forEach(el => {
    const text = el.textContent, num = parseFloat(text.replace(/[^0-9.]/g,'')), suffix = text.replace(/[0-9.]/g,'');
    if (isNaN(num) || num <= 0 || num >= 10000) return;
    const obs = new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting) return;
      obs.disconnect();
      let start = null;
      const step = ts => {
        if (!start) start = ts;
        const ease = 1 - Math.pow(1 - Math.min((ts - start) / 1200, 1), 3);
        el.textContent = Math.floor(ease * num) + suffix;
        if (ease < 1) requestAnimationFrame(step); else el.textContent = text;
      };
      requestAnimationFrame(step);
    }, { threshold: 0.5 });
    obs.observe(el);
  });

  /* Section title reveal */
  document.querySelectorAll('.section-title').forEach(t => {
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) { t.classList.add('title-revealed'); obs.disconnect(); }
    }, { threshold: 0.3 });
    obs.observe(t);
  });

  /* Quotes carousel */
  initQuotesCarousel();

  /* Rating bars */
  initRatingBars();

  /* Back to top */
  const btt = document.createElement('a');
  btt.id = 'back-to-top'; btt.href = '#'; btt.title = 'Back to top'; btt.innerHTML = '▲';
  btt.addEventListener('click', e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); });
  document.body.appendChild(btt);
  window.addEventListener('scroll', () => btt.classList.toggle('visible', window.scrollY > 400), { passive: true });

  /* Music button */
  const musicBtn = document.querySelector('.nav-music-btn');
  if (musicBtn) musicBtn.addEventListener('click', () => {
    const p = document.getElementById('music-panel');
    if (p) p.classList.toggle('open');
  });

  initNavUser();
  MusicPlayer.init();
});

/* ── Quotes Carousel ── */
function initQuotesCarousel() {
  const slides = document.querySelectorAll('.quote-slide');
  const dotsWrap = document.getElementById('quoteDots');
  const prevBtn = document.getElementById('quotePrev');
  const nextBtn = document.getElementById('quoteNext');
  if (!slides.length || !dotsWrap) return;
  let current = 0, autoTimer;
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'quote-dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => { goTo(i); resetAuto(); });
    dotsWrap.appendChild(dot);
  });
  function goTo(idx) {
    slides[current].classList.remove('active');
    dotsWrap.children[current].classList.remove('active');
    current = (idx + slides.length) % slides.length;
    slides[current].classList.add('active');
    dotsWrap.children[current].classList.add('active');
  }
  function resetAuto() { clearInterval(autoTimer); autoTimer = setInterval(() => goTo(current + 1), 5500); }
  if (prevBtn) prevBtn.addEventListener('click', () => { goTo(current - 1); resetAuto(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { goTo(current + 1); resetAuto(); });
  let sx = 0;
  const car = document.querySelector('.quotes-carousel');
  if (car) {
    car.addEventListener('touchstart', e => { sx = e.touches[0].clientX; }, { passive: true });
    car.addEventListener('touchend', e => {
      const d = sx - e.changedTouches[0].clientX;
      if (Math.abs(d) > 40) { goTo(d > 0 ? current + 1 : current - 1); resetAuto(); }
    });
  }
  resetAuto();
}

/* ── Rating Bars ── */
function initRatingBars() {
  const wrap = document.querySelector('.ratings-wrap');
  if (!wrap) return;
  const obs = new IntersectionObserver(entries => {
    if (!entries[0].isIntersecting) return;
    obs.disconnect();
    wrap.querySelectorAll('.rating-fill').forEach(b => { b.style.width = (b.dataset.width || 0) + '%'; });
  }, { threshold: 0.2 });
  obs.observe(wrap);
}

/* ── Music Player ── */
const MusicPlayer = (function() {
  const tracks = [
    { id:0, name:"Nate's Theme (Ambient)",  note:"Web Audio", freq:[220,277,330,415], type:'adventure' },
    { id:1, name:"Elena's Theme",            note:"Web Audio", freq:[262,330,392,494], type:'gentle' },
    { id:2, name:"Libertalia Nightfall",     note:"Web Audio", freq:[185,233,311,370], type:'mysterious' },
    { id:3, name:"Among Thieves Suite",      note:"Web Audio", freq:[294,370,440,554], type:'adventure' },
    { id:4, name:"Sully's Waltz",            note:"Web Audio", freq:[196,247,294,370], type:'gentle' },
  ];
  let audioCtx=null, gainNode=null, currentNodes=[], isPlaying=false,
      currentTrack=0, volume=0.35, userTracks=[], currentAudio=null, progressTimer=null;

  function init() {
    const panel = document.createElement('div');
    panel.id = 'music-panel';
    panel.innerHTML =
      '<div class="music-panel-header" id="musicPanelHeader">' +
        '<div class="music-panel-title">🎵 Soundtrack</div><span class="music-panel-arrow">▼</span>' +
      '</div>' +
      '<div class="music-panel-body">' +
        '<div class="music-now-playing">' +
          '<div class="music-disc" id="musicDisc">♪</div>' +
          '<div class="music-track-info">' +
            '<div class="music-track-name" id="musicTrackName">' + tracks[0].name + '</div>' +
            '<div class="music-track-artist">Ambient Mode</div>' +
            '<div class="music-visualiser paused" id="musicVis">' + Array.from({length:8},()=>'<div class="music-bar"></div>').join('') + '</div>' +
          '</div>' +
        '</div>' +
        '<div class="music-progress-wrap">' +
          '<div class="music-time-row"><span id="musicTime">0:00</span><span>∞</span></div>' +
          '<div class="music-progress-track"><div class="music-progress-fill" id="musicProgressFill"></div></div>' +
        '</div>' +
        '<div class="music-controls">' +
          '<button class="music-ctrl-btn" id="musicPrev">⏮</button>' +
          '<button class="music-ctrl-btn play-pause" id="musicPlayPause">▶</button>' +
          '<button class="music-ctrl-btn" id="musicNext">⏭</button>' +
        '</div>' +
        '<div class="music-volume-row">' +
          '<span class="music-vol-icon">🔈</span>' +
          '<input type="range" class="music-volume-slider" id="musicVolume" min="0" max="100" value="35">' +
          '<span class="music-vol-icon">🔊</span>' +
        '</div>' +
        '<div class="music-tracklist" id="musicTracklist"></div>' +
        '<div class="music-upload-zone"><input type="file" id="musicFileInput" accept="audio/*" multiple>' +
          '<div class="music-upload-label">📂 Upload Music</div>' +
          '<div class="music-upload-sub">MP3 / WAV / OGG — stays on your device</div>' +
        '</div>' +
      '</div>';
    document.body.appendChild(panel);

    panel.querySelector('#musicPanelHeader').addEventListener('click', () => panel.classList.toggle('open'));
    panel.querySelector('#musicPlayPause').addEventListener('click', e => { e.stopPropagation(); togglePlay(); });
    panel.querySelector('#musicPrev').addEventListener('click', e => { e.stopPropagation(); prevTrack(); });
    panel.querySelector('#musicNext').addEventListener('click', e => { e.stopPropagation(); nextTrack(); });
    panel.querySelector('#musicVolume').addEventListener('input', function() {
      volume = this.value / 100;
      if (gainNode && audioCtx) gainNode.gain.setTargetAtTime(volume, audioCtx.currentTime, 0.1);
      if (currentAudio) currentAudio.volume = volume;
    });
    panel.querySelector('#musicFileInput').addEventListener('change', function() {
      Array.from(this.files).forEach(file => {
        userTracks.push({ name: file.name.replace(/\.[^.]+$/,''), note: 'Your file', url: URL.createObjectURL(file), isUser: true });
      });
      renderList();
    });
    renderList();
  }

  function renderList() {
    const list = document.getElementById('musicTracklist');
    if (!list) return;
    list.innerHTML = '';
    [...tracks, ...userTracks].forEach((t, i) => {
      const item = document.createElement('div');
      item.className = 'music-track-item' + (i === currentTrack ? ' active' : '');
      item.innerHTML = `<div class="music-track-num">${i+1}</div><div class="music-track-info-small"><div class="t-name">${t.name}</div><div class="t-note">${t.note||''}</div></div>`;
      item.addEventListener('click', () => { loadIdx(i); play(); });
      list.appendChild(item);
    });
  }

  function initAudio() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      gainNode = audioCtx.createGain(); gainNode.gain.value = 0; gainNode.connect(audioCtx.destination);
    }
  }
  function stopSynth() { currentNodes.forEach(n => { try { n.stop(); } catch(e){} }); currentNodes = []; }
  function playSynth(t) {
    stopSynth();
    if (audioCtx.state === 'suspended') audioCtx.resume();
    t.freq.forEach((freq, i) => {
      const osc = audioCtx.createOscillator(), og = audioCtx.createGain();
      const lfo = audioCtx.createOscillator(), lg = audioCtx.createGain();
      osc.type = t.type === 'gentle' ? 'sine' : 'triangle'; osc.frequency.value = freq;
      lfo.frequency.value = 0.3 + i * 0.1; lg.gain.value = 1.5;
      lfo.connect(lg); lg.connect(osc.frequency); lfo.start();
      og.gain.value = 0; og.gain.setTargetAtTime(0.05 / t.freq.length, audioCtx.currentTime, 2);
      osc.connect(og); og.connect(gainNode); osc.start();
      currentNodes.push(osc, lfo);
    });
    gainNode.gain.setTargetAtTime(volume, audioCtx.currentTime, 0.8);
  }
  function loadIdx(idx) {
    currentTrack = idx;
    if (currentAudio) { currentAudio.pause(); currentAudio = null; }
    stopSynth(); clearInterval(progressTimer);
    const fill = document.getElementById('musicProgressFill');
    const time = document.getElementById('musicTime');
    const name = document.getElementById('musicTrackName');
    if (fill) fill.style.width = '0%';
    if (time) time.textContent = '0:00';
    const all = [...tracks, ...userTracks];
    if (name && all[idx]) name.textContent = all[idx].name;
    renderList();
  }
  function play() {
    initAudio();
    const all = [...tracks, ...userTracks];
    const t = all[currentTrack]; if (!t) return;
    isPlaying = true;
    const btn = document.getElementById('musicPlayPause');
    const disc = document.getElementById('musicDisc');
    const vis = document.getElementById('musicVis');
    if (btn) btn.textContent = '⏸';
    if (disc) disc.classList.add('spinning');
    if (vis) vis.classList.remove('paused');
    if (t.isUser && t.url) {
      stopSynth();
      currentAudio = new Audio(t.url); currentAudio.volume = volume;
      currentAudio.play().catch(()=>{});
      currentAudio.addEventListener('ended', nextTrack);
      clearInterval(progressTimer);
      progressTimer = setInterval(() => {
        if (!currentAudio) return;
        const fill = document.getElementById('musicProgressFill');
        const time = document.getElementById('musicTime');
        const e = currentAudio.currentTime, d = currentAudio.duration || 1;
        if (fill) fill.style.width = (e/d*100) + '%';
        if (time) time.textContent = Math.floor(e/60) + ':' + String(Math.floor(e%60)).padStart(2,'0');
      }, 400);
    } else {
      playSynth(t);
      clearInterval(progressTimer);
      const start = Date.now();
      progressTimer = setInterval(() => {
        const e = (Date.now()-start)/1000;
        const fill = document.getElementById('musicProgressFill');
        const time = document.getElementById('musicTime');
        if (fill) fill.style.width = ((e%120)/120*100) + '%';
        if (time) time.textContent = Math.floor(e/60) + ':' + String(Math.floor(e%60)).padStart(2,'0');
      }, 500);
    }
  }
  function pause() {
    isPlaying = false;
    const btn = document.getElementById('musicPlayPause');
    const disc = document.getElementById('musicDisc');
    const vis = document.getElementById('musicVis');
    if (btn) btn.textContent = '▶';
    if (disc) disc.classList.remove('spinning');
    if (vis) vis.classList.add('paused');
    if (gainNode && audioCtx) gainNode.gain.setTargetAtTime(0, audioCtx.currentTime, 0.5);
    if (currentAudio) currentAudio.pause();
    clearInterval(progressTimer);
    setTimeout(stopSynth, 600);
  }
  function togglePlay() { isPlaying ? pause() : play(); }
  function nextTrack() { loadIdx((currentTrack+1) % (tracks.length+userTracks.length)); if (isPlaying) play(); }
  function prevTrack() { loadIdx((currentTrack-1+tracks.length+userTracks.length) % (tracks.length+userTracks.length)); if (isPlaying) play(); }

  return { init };
})();
