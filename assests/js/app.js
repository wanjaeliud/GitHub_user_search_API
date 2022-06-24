document.querySelector('.theme-switcher').addEventListener('click', toggleTheme)
setThemeFromLocal();

function select(selector, all = false){
  let method = ! all ? 'querySelector' : 'querySelectorAll';
  return document[method](selector);
}

/*====================================================
function to switch in betweeen themes
======================================================*/
const setThemeFromLocal = () => {
  let theme = JSON.parse(localStorage.getItem('theme'));

  if(! theme){
      return;
  }

  updateTheme(theme);
}

const toggleTheme = () => {
  const themes = {
    light: {
      code: 'dark',
      name: 'Light',
      icon: './assests/images/sun.png',
    },
    dark: {
      code: 'light',
      name: 'Dark',
      icon: './assests/images/moon.png',
    }
  }
  const body = document.querySelector('body')
  let theme = themes[body.dataset.theme]
  localStorage.setItem('theme', JSON.stringify(theme))
  updateTheme(theme)
}

const updateTheme = (theme) => {
  const body = document.querySelector('body')
  const themeSwitcherTxt = document.querySelector('.theme-switcher span')
  const themeSwitcherImg = document.querySelector('.theme-switcher img')
  body.dataset.theme = theme.code.toLowerCase()
  themeSwitcherTxt.innerHTML = theme.name
  themeSwitcherImg.src = theme.icon
}



/*==========================================
search for user using their userName
=========================================*/

const searchBtn = select('.search-button');
const usernameField = select('#username');
const errorMessage = select('.error-message');
searchBtn.addEventListener('click', async (e) => {
  e.preventDefault();

  errorMessage.classList.add('hidden');


  const username = usernameField.value;

  if(username.trim().length === 0){
      return;
  }

  searchUsername(username);

});

async function searchUsername(username){
  const endpoint = 'https://api.github.com/users/' + username;

  const response = await fetch(endpoint);

  if(response.status === 404){
      toggleErrorMessage();
      return;
  }

  const data = await response.json();

  updateUi(data);

}