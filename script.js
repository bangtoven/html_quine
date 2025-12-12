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

  const taggable = [
    'html','head','title','meta','link','script','body','nav',
    'h1','h2','p','pre','code','a','em','strong',
    'div','ul','li'
  ];
  document.querySelectorAll(taggable.join(',')).forEach(el => {
    el.setAttribute('data-tag', el.tagName.toLowerCase());
    const attrs = Array.from(el.attributes)
      .filter(({ name }) => name !== 'data-tag' && name !== 'data-attrs')
      .map(({ name, value }) => value ? `${name}='${value}'` : name)
      .join(' ');
    if (attrs) el.setAttribute('data-attrs', ` ${attrs}`);
  });

  requestAnimationFrame(() => {
    document.body.scrollIntoView({ behavior: 'auto', block: 'start' })
  });
});
