const input = document.querySelector('.theme-switcher input');

input.addEventListener('change', (e) => {
  {e.target.checked ? document.body.setAttribute('data-theme', 'dark') : document.body.setAttribute('data-theme', 'light') }
  // if (e.target.checked) {
  //   document.body.setAttribute('data-theme', 'dark');
  // } else {
  //   document.body.setAttribute('data-theme', 'light');
  // }
})