document.querySelector('.theme-switcher').addEventListener('click', toggleTheme)
setThemeFromLocal();

function select(selector, all = false){
  let method = ! all ? 'querySelector' : 'querySelectorAll';
  return document[method](selector);
}

/*====================================================
function to switch in betweeen themes
======================================================*/
const toggleTheme = () => {
  const themes = {
    light: {
      code: 'dark',
      name: 'light',
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

const updateTheme = () => {
  const body = document.querySelector('body')
  const themeSwitcherTxt = document.querySelector('.theme-switcher span')
  const themeSwitcherImg = document.querySelector('.theme-switcher img')
  body.dataset.theme = theme.code.toLowerCase()
  themeSwitcherTxt.innerHTML = theme.name
  themeSwitcherImg.src = theme.icon
}
