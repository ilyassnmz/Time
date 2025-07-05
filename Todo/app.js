const addForm = document.querySelector('.add');
const list = document.querySelector('.todos');
const search = document.querySelector('.search input');

const generateTemplate = todo => {
  const li = document.createElement('li');
  li.className = 'list-group-item d-flex justify-content-between align-items-center todo-enter';
  li.innerHTML = `
    <span>${todo}</span>
    <i class="fa-solid fa-trash delete"></i>
  `;
  list.appendChild(li);
};

addForm.addEventListener('submit', e => {
  e.preventDefault();
  const todo = addForm.add.value.trim();
  if (todo.length > 0) {
    generateTemplate(todo);
    addForm.reset();
  }
});

list.addEventListener('click', e => {
  if (e.target.classList.contains('delete')) {
    const li = e.target.parentElement;
    li.classList.add('fade-out');
    setTimeout(() => {
      li.remove();
    }, 500);
  }
});

const filterTodos = term => {
  Array.from(list.children)
    .filter(todo => !todo.textContent.toLowerCase().includes(term))
    .forEach(todo => todo.classList.add('filtered'));

  Array.from(list.children)
    .filter(todo => todo.textContent.toLowerCase().includes(term))
    .forEach(todo => todo.classList.remove('filtered'));
};

search.addEventListener('keyup', () => {
  const term = search.value.trim().toLowerCase();
  filterTodos(term);
});

const clock = document.querySelector('.clock');

const updateTime = () => {
  const now = new Date();

  const date = now.toLocaleDateString('tr-TR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const time = now.toLocaleTimeString('tr-TR');

  clock.innerHTML = `
    <div>${date}</div>
    <div>${time}</div>
  `;
};

setInterval(updateTime, 1000);
updateTime();
