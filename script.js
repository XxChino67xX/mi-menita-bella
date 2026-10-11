(() => {
  const starfield = document.getElementById('starfield');
  // Estrellas creadas con CSS: no se necesita ninguna librería externa.
  for (let i = 0; i < 105; i++) {
    const star = document.createElement('span');
    star.className = 'star';
    const size = Math.random() * 2.3 + 0.7;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.setProperty('--duration', `${2 + Math.random() * 4}s`);
    star.style.setProperty('--opacity', `${0.25 + Math.random() * 0.7}`);
    star.style.animationDelay = `${Math.random() * -5}s`;
    starfield.appendChild(star);
  }

  const openButton = document.getElementById('openLetter');
  const closeButton = document.getElementById('closeLetter');
  const letterContent = document.getElementById('letterContent');
  const letterClosed = document.getElementById('letterClosed');
  openButton.addEventListener('click', () => {
    letterContent.hidden = false;
    letterClosed.hidden = true;
    closeButton.hidden = false;
  });
  closeButton.addEventListener('click', () => {
    letterContent.hidden = true;
    letterClosed.hidden = false;
    closeButton.hidden = true;
    openButton.focus();
  });

  const audio = document.getElementById('audioPlayer');
  const musicStatus = document.getElementById('musicStatus');
  audio.addEventListener('error', () => {
    musicStatus.textContent = 'Todavía falta añadir tu archivo MP3 a la carpeta musica.';
  });
  audio.addEventListener('canplay', () => {
    musicStatus.textContent = 'Tu canción está lista. Pulsa reproducir cuando quieras.';
  });

  // Lluvia decorativa que se puede activar o detener desde el botón.
  const rainToggle = document.getElementById('rainToggle');
  let rainInterval = null;
  let rainLayer = null;
  function makeRaindrop() {
    if (!rainLayer) return;
    const drop = document.createElement('span');
    drop.className = 'raindrop';
    drop.style.left = `${Math.random() * 100}%`;
    drop.style.setProperty('--fall-duration', `${1.1 + Math.random() * 1.5}s`);
    drop.style.opacity = `${0.25 + Math.random() * 0.55}`;
    rainLayer.appendChild(drop);
    drop.addEventListener('animationend', () => drop.remove(), { once: true });
  }
  rainToggle.addEventListener('click', () => {
    const isActive = rainToggle.getAttribute('aria-pressed') === 'true';
    if (isActive) {
      window.clearInterval(rainInterval);
      rainInterval = null;
      if (rainLayer) rainLayer.remove();
      rainLayer = null;
      rainToggle.setAttribute('aria-pressed', 'false');
      rainToggle.textContent = '🌧️ Activar lluvia bonita';
    } else {
      rainLayer = document.createElement('div');
      rainLayer.className = 'rain-layer';
      rainLayer.setAttribute('aria-hidden', 'true');
      document.body.appendChild(rainLayer);
      for (let i = 0; i < 24; i++) makeRaindrop();
      rainInterval = window.setInterval(makeRaindrop, 95);
      rainToggle.setAttribute('aria-pressed', 'true');
      rainToggle.textContent = '☂️ Detener lluvia';
    }
  });

  // Evita que las dos canciones se reproduzcan a la vez.
  const songPlayers = document.querySelectorAll('.song-player');
  songPlayers.forEach((player) => {
    player.addEventListener('play', () => {
      songPlayers.forEach((otherPlayer) => {
        if (otherPlayer !== player) otherPlayer.pause();
      });
    });
    player.addEventListener('error', () => {
      const card = player.closest('.song-details');
      const note = card && card.querySelector('small');
      if (note) note.dataset.originalText ||= note.textContent;
      if (note) note.textContent = 'Falta agregar el archivo MP3 indicado en esta tarjeta. Revisa que el nombre y la carpeta coincidan.';
    });
  });

  const topButton = document.getElementById('topButton');
  const updateTopButton = () => topButton.classList.toggle('visible', window.scrollY > 500);
  window.addEventListener('scroll', updateTopButton, { passive: true });
  updateTopButton();
  topButton.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();
