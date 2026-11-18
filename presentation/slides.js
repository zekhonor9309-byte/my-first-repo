(function () {
  var slides = Array.prototype.slice.call(document.querySelectorAll('section.slide'));
  var counter = document.getElementById('slideCounter');
  var bar = document.getElementById('progressBar');
  var prevBtn = document.getElementById('prevBtn');
  var nextBtn = document.getElementById('nextBtn');
  var total = slides.length;
  var index = 0;

  if (!total) return;

  function clamp(i) {
    return Math.max(0, Math.min(i, total - 1));
  }

  function show(i) {
    index = clamp(i);
    slides.forEach(function (s, idx) {
      s.classList.toggle('active', idx === index);
    });
    if (counter) counter.textContent = (index + 1) + ' / ' + total;
    if (bar) bar.style.width = ((index + 1) / total) * 100 + '%';
    if (prevBtn) prevBtn.disabled = index === 0;
    if (nextBtn) nextBtn.disabled = index === total - 1;
    if (history.replaceState) {
      history.replaceState(null, '', '#' + (index + 1));
    }
  }

  function next() { show(index + 1); }
  function prev() { show(index - 1); }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft' || e.key === ' ' || e.key === 'Spacebar' || e.key === 'PageDown') {
      e.preventDefault();
      next();
    } else if (e.key === 'ArrowRight' || e.key === 'PageUp') {
      e.preventDefault();
      prev();
    } else if (e.key === 'Home') {
      e.preventDefault();
      show(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      show(total - 1);
    }
  });

  if (prevBtn) prevBtn.addEventListener('click', prev);
  if (nextBtn) nextBtn.addEventListener('click', next);

  var startX = null;
  document.addEventListener('touchstart', function (e) {
    startX = e.changedTouches[0].clientX;
  }, { passive: true });
  document.addEventListener('touchend', function (e) {
    if (startX === null) return;
    var dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 50) {
      if (dx < 0) next(); else prev();
    }
    startX = null;
  }, { passive: true });

  var start = parseInt((location.hash || '').replace('#', ''), 10);
  show(isNaN(start) ? 0 : start - 1);
})();
