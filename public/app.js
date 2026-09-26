const grid = document.querySelector('#projectGrid');

fetch('/api/projects')
  .then(res => res.json())
  .then(projects => {
    grid.innerHTML = projects.map(p => `
      <article class="project">
        <div><div class="project-icon">${p.icon}</div><div class="project-tag">${p.tag.toUpperCase()} / 2026</div></div>
        <div><h3>${p.title}</h3><p>${p.text}</p></div>
      </article>`).join('');
  })
  .catch(() => grid.innerHTML = '<p class="loading">Could not load projects. Is the server running?</p>');

document.querySelector('#contactForm').addEventListener('submit', async e => {
  e.preventDefault();
  const form = e.currentTarget;
  const status = document.querySelector('#formStatus');
  status.textContent = 'Sending...';
  try {
    const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(Object.fromEntries(new FormData(form))) });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    status.textContent = data.message; form.reset();
  } catch (err) { status.textContent = err.message || 'Something went wrong.'; }
});

document.querySelector('#themeButton').addEventListener('click', () => {
  const root = document.documentElement;
  const isPink = root.dataset.vibe === 'pink';
  root.style.setProperty('--hot', isPink ? '#a6ff00' : '#ff73d2');
  root.style.setProperty('--deep', isPink ? '#07111f' : '#180719');
  root.dataset.vibe = isPink ? '' : 'pink';
});

const observer = new IntersectionObserver(items => items.forEach(item => item.isIntersecting && item.target.classList.add('visible')), { threshold: .14 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
