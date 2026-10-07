/* Pokémon TCG: demo educativa de autenticación con almacenamiento local. */
const USERS_KEY = 'auraOneUsers';
const SESSION_KEY = 'auraOneSession';
const pages = [...document.querySelectorAll('.page')];
const navLinks = [...document.querySelectorAll('.nav-link')];
const menu = document.querySelector('.main-nav');
const menuToggle = document.querySelector('.menu-toggle');
const toast = document.querySelector('#toast');
let toastTimer;

function getUsers() {
  try { return JSON.parse(localStorage.getItem(USERS_KEY) || '[]'); }
  catch { return []; }
}
function getSession() {
  try { return JSON.parse(sessionStorage.getItem(SESSION_KEY) || 'null'); }
  catch { return null; }
}
function notify(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3000);
}
function route() {
  const id = location.hash.slice(1) || 'inicio';
  const valid = ['inicio', 'perfil', 'registro', 'login'].includes(id) ? id : 'inicio';
  pages.forEach(page => page.classList.toggle('active-page', page.id === valid));
  navLinks.forEach(link => link.classList.toggle('active', link.dataset.route === valid));
  menu.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  if (valid === 'perfil') renderProfile();
  window.scrollTo(0, 0);
}
function renderProfile() {
  const container = document.querySelector('#profile-content');
  const session = getSession();
  if (!session) {
    container.innerHTML = '<div class="profile-guest"><h2>Inicia sesión para ver tu perfil.</h2><p>Cuando entres, aquí encontrarás tu nombre de usuario y los datos de tu cuenta.</p><a class="button button-dark" href="#login">Iniciar sesión <span>↗</span></a><a class="button button-outline" href="#registro">Crear cuenta</a></div>';
    return;
  }
  const user = getUsers().find(item => item.username.toLowerCase() === session.username.toLowerCase());
  if (!user) {
    sessionStorage.removeItem(SESSION_KEY);
    renderProfile();
    return;
  }
  const initials = [...user.username][0].toUpperCase();
  container.innerHTML = `<div class="profile-top"><div class="profile-avatar" aria-hidden="true">${escapeHTML(initials)}</div><div><h2>${escapeHTML(user.username)}</h2><p>Cuenta personal Pokémon TCG</p></div></div><div class="profile-fields"><div><span>Nombre de usuario</span><strong>${escapeHTML(user.username)}</strong></div><div><span>Cuenta creada</span><strong>${escapeHTML(user.createdAt)}</strong></div><div><span>Sesión</span><strong>Activa</strong></div></div><div class="profile-actions"><a class="button button-outline" href="#inicio">Volver al inicio</a><button class="button button-dark" id="logout-button" type="button">Cerrar sesión <span>↗</span></button></div>`;
  document.querySelector('#logout-button').addEventListener('click', () => {
    sessionStorage.removeItem(SESSION_KEY);
    renderProfile();
    notify('Cerraste sesión. ¡Hasta pronto!');
  });
}
function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
}
function showMessage(form, message, success = false) {
  const output = form.querySelector('.form-message');
  output.textContent = message;
  output.classList.toggle('success', success);
}

document.querySelector('#register-form').addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  const username = form.username.value.trim();
  const password = form.password.value;
  if (username.length < 3 || password.length < 6) {
    showMessage(form, 'Usa un usuario de al menos 3 caracteres y una contraseña de al menos 6.');
    return;
  }
  const users = getUsers();
  if (users.some(user => user.username.toLowerCase() === username.toLowerCase())) {
    showMessage(form, 'Ese nombre de usuario ya existe. Prueba con otro.');
    return;
  }
  users.push({ username, password, createdAt: new Intl.DateTimeFormat('es-MX', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date()) });
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  sessionStorage.setItem(SESSION_KEY, JSON.stringify({ username }));
  form.reset();
  location.hash = 'perfil';
  notify(`¡Bienvenido, ${username}! Tu cuenta está lista.`);
});

document.querySelector('#login-form').addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  const username = form.username.value.trim();
  const password = form.password.value;
  const user = getUsers().find(item => item.username.toLowerCase() === username.toLowerCase() && item.password === password);
  if (!user) {
    showMessage(form, 'No encontramos esa combinación. Revisa tus datos o crea una cuenta.');
    return;
  }
  sessionStorage.setItem(SESSION_KEY, JSON.stringify({ username: user.username }));
  form.reset();
  location.hash = 'perfil';
  notify(`¡Qué bueno tenerte de vuelta, ${user.username}!`);
});

document.querySelectorAll('.password-toggle').forEach(button => button.addEventListener('click', () => {
  const input = button.parentElement.querySelector('input');
  input.type = input.type === 'password' ? 'text' : 'password';
  button.setAttribute('aria-label', input.type === 'password' ? 'Mostrar contraseña' : 'Ocultar contraseña');
}));

document.querySelectorAll('.buy-button').forEach(button => button.addEventListener('click', () => {
  const user = getSession();
  notify(user ? `¡Gracias, ${user.username}! La compra de Pokémon TCG estará disponible pronto.` : 'Pokémon TCG: 30TH Celebration Elite Trainer Box cuesta $1,799.00 MXN. Crea una cuenta para seguir.');
  if (!user) setTimeout(() => { if (!getSession()) location.hash = 'registro'; }, 1400);
}));

menuToggle.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
});
window.addEventListener('hashchange', route);
route();
