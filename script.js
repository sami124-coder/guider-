const tabs = [...document.querySelectorAll('.tab')];
const panels = [...document.querySelectorAll('.panel')];
const checks = [...document.querySelectorAll('.journey-check')];

function showTab(id, scroll = true) {
  tabs.forEach(tab => {
    const active = tab.dataset.tab === id;
    tab.classList.toggle('active', active);
    tab.setAttribute('aria-selected', String(active));
  });
  panels.forEach(panel => {
    const active = panel.id === id;
    panel.classList.toggle('active', active);
    panel.hidden = !active;
  });
  if (scroll) document.querySelector('.app-shell').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

tabs.forEach(tab => tab.addEventListener('click', () => showTab(tab.dataset.tab, false)));
document.querySelectorAll('[data-go]').forEach(button => {
  button.addEventListener('click', () => showTab(button.dataset.go));
});

const saved = JSON.parse(localStorage.getItem('hitszJourney') || '[]');
checks.forEach((check, index) => {
  check.checked = Boolean(saved[index]);
  check.addEventListener('change', updateProgress);
});

function updateProgress() {
  const state = checks.map(check => check.checked);
  const percent = Math.round(state.filter(Boolean).length / checks.length * 100);
  document.querySelector('#overallProgress').textContent = `${percent}%`;
  document.querySelector('#overallBar').style.width = `${percent}%`;
  localStorage.setItem('hitszJourney', JSON.stringify(state));
}

updateProgress();
