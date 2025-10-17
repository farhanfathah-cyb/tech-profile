
// dynamic panel switcher + animated skill bars
document.addEventListener('DOMContentLoaded', () => {
  const buttons = Array.from(document.querySelectorAll('.nav-btn'));
  const panels = Array.from(document.querySelectorAll('.panel'));
  const title = document.getElementById('panel-title');

  function activate(targetId){
    buttons.forEach(b => b.classList.toggle('active', b.dataset.target === targetId));
    panels.forEach(p => p.classList.toggle('active', p.id === targetId));
    title.textContent = targetId.charAt(0).toUpperCase() + targetId.slice(1);
    history.replaceState(null, '', `#${targetId}`);

    // animate skill bars when opening skills panel
    if(targetId === 'skills'){
      document.querySelectorAll('.bar span').forEach(span => {
        const width = span.style.width || span.getAttribute('data-width') || '60%';
        // trigger reflow for animation
        span.style.width = '0%';
        setTimeout(() => { span.style.width = width; }, 50);
      });
    }
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', () => activate(btn.dataset.target));
  });

  // Keyboard navigation (left/right)
  let idx = buttons.findIndex(b => b.classList.contains('active'));
  document.addEventListener('keydown', (e) => {
    if(e.key === 'ArrowRight') idx = (idx + 1) % buttons.length;
    if(e.key === 'ArrowLeft') idx = (idx - 1 + buttons.length) % buttons.length;
    activate(buttons[idx].dataset.target);
  });

  // open panel based on URL hash
  const hash = location.hash.replace('#','');
  if(hash && document.getElementById(hash)){
    activate(hash);
  } else {
    // animate bars on initial load if skills is active
    if(document.getElementById('skills').classList.contains('active')){
      activate('skills');
    }
  }

  // small neon pulse on avatar
  const avatar = document.querySelector('.avatar');
  setInterval(() => {
    avatar.animate([{ transform: 'rotate(-6deg) scale(1)' }, { transform: 'rotate(-6deg) scale(1.04)' }, { transform: 'rotate(-6deg) scale(1)' }], { duration: 2200, iterations: 1 });
  }, 3000);

  // Theme toggle (demo - toggles subtle brightness)
  const themeToggle = document.getElementById('theme-toggle');
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('bright');
    themeToggle.textContent = document.body.classList.contains('bright') ? '🌗 Dim' : '✨ Bright';
  });
});
