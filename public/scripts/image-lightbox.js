(function () {
  const STYLE_ID = 'img-lightbox-style';

  if (!document.getElementById(STYLE_ID)) {
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      .lightbox-overlay {
        position: fixed;
        inset: 0;
        z-index: 9999;
        background: rgba(0, 0, 0, 0);
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.25s ease, background 0.25s ease;
        cursor: zoom-out;
      }
      .lightbox-overlay.open {
        background: rgba(0, 0, 0, 0.88);
        opacity: 1;
        pointer-events: auto;
      }
      .lightbox-overlay img {
        max-width: 92vw;
        max-height: 92vh;
        object-fit: contain;
        border-radius: 8px;
        box-shadow: 0 25px 60px rgba(0, 0, 0, 0.5);
        transform: scale(0.9);
        transition: transform 0.25s ease;
        cursor: default;
      }
      .lightbox-overlay.open img {
        transform: scale(1);
      }
      .lightbox-close {
        position: absolute;
        top: 20px;
        right: 24px;
        width: 40px;
        height: 40px;
        border: none;
        background: rgba(255, 255, 255, 0.12);
        color: white;
        font-size: 28px;
        line-height: 1;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background 0.15s;
      }
      .lightbox-close:hover {
        background: rgba(255, 255, 255, 0.25);
      }
    `;
    document.head.appendChild(style);
  }

  const overlay = document.createElement('div');
  overlay.className = 'lightbox-overlay';
  overlay.innerHTML = '<button class="lightbox-close" aria-label="Close">&times;</button><img src="" alt="">';

  const img = overlay.querySelector('img');
  const closeBtn = overlay.querySelector('.lightbox-close');

  function open(src, alt) {
    img.src = src;
    img.alt = alt;
    document.body.appendChild(overlay);
    requestAnimationFrame(() => overlay.classList.add('open'));
  }

  function close() {
    overlay.classList.remove('open');
    overlay.addEventListener('transitionend', function handler() {
      overlay.removeEventListener('transitionend', handler);
      if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
    });
  }

  closeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    close();
  });

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) close();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) close();
  });

  document.addEventListener('click', (e) => {
    const target = e.target.closest('img');
    if (!target) return;
    if (!target.closest('.prose') && !target.hasAttribute('data-lightbox')) return;
    e.preventDefault();
    open(target.src, target.alt);
  });
})();
