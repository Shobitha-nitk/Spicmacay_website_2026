
// Smooth scrolling for nav links
document.addEventListener('DOMContentLoaded', function(){
  // set year in footer
  document.getElementById('year').textContent = new Date().getFullYear();

  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if(target){
        window.scrollTo({top: target.offsetTop - document.querySelector('.site-header').offsetHeight, behavior:'smooth'});
      }
    });
  });

  // Highlight active nav link on scroll
  const sections = document.querySelectorAll('main section');
  const headerHeight = document.querySelector('.site-header').offsetHeight;
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - headerHeight - 10;
      if(window.scrollY >= top) current = sec.getAttribute('id');
    });
    navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + current));
  });

  // IntersectionObserver for revealing events in timeline and lazy animation
  const observerOpts = {root:null, rootMargin:'0px', threshold:0.12};
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('in-view');
      } else {
        // optionally remove to allow repeated animations
        // entry.target.classList.remove('in-view');
      }
    });
  }, observerOpts);

  document.querySelectorAll('.event').forEach(e => revealObserver.observe(e));
  document.querySelectorAll('.past-event-card').forEach(e => revealObserver.observe(e));

});

/* Small helper: if you want to attach background images dynamically here, you can
   select .img-slot elements and set style.backgroundImage = 'url(./assets/your.jpg)'
*/

// End of script.js
