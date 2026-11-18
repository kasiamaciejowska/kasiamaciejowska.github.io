// Testimonial slider: one testimonial at a time, arrows (and swipe / arrow keys) to switch.
(function(){
  var slider = document.querySelector('.testimonial-slider');
  if (!slider) return;
  var slides = slider.querySelectorAll('.testimonial-card');
  if (slides.length < 2) return;
  var count = slider.querySelector('.ts-count');
  var prev = slider.querySelector('.ts-prev');
  var next = slider.querySelector('.ts-next');
  var i = 0;
  function show(n){
    i = (n + slides.length) % slides.length;
    slides.forEach(function(s, k){
      var on = k === i;
      s.classList.toggle('is-active', on);
      s.setAttribute('aria-hidden', on ? 'false' : 'true');
    });
    if (count) count.textContent = (i + 1) + ' / ' + slides.length;
  }
  slider.classList.add('is-enhanced');
  prev.addEventListener('click', function(){ show(i - 1); });
  next.addEventListener('click', function(){ show(i + 1); });
  slider.addEventListener('keydown', function(e){
    if (e.key === 'ArrowLeft') show(i - 1);
    if (e.key === 'ArrowRight') show(i + 1);
  });
  var x0 = null;
  slider.addEventListener('touchstart', function(e){ x0 = e.touches[0].clientX; }, {passive:true});
  slider.addEventListener('touchend', function(e){
    if (x0 === null) return;
    var dx = e.changedTouches[0].clientX - x0; x0 = null;
    if (Math.abs(dx) > 50) show(dx < 0 ? i + 1 : i - 1);
  });
  show(0);
})();
