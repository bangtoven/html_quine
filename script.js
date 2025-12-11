document.addEventListener('DOMContentLoaded', async () => {
  const nav = document.querySelector('.nav');
  if (nav) nav.outerHTML = await (await fetch('nav.html')).text();
  
  document.querySelectorAll('img').forEach(img => {
    if (img.closest('figure[src]')) return;
    const figure = document.createElement('figure');
    figure.setAttribute('src', img.getAttribute('src'));
    img.parentNode.insertBefore(figure, img);
    figure.appendChild(img);
  });

  requestAnimationFrame(() => {
    document.body.scrollIntoView({ behavior: 'auto', block: 'start' })
  });
});
