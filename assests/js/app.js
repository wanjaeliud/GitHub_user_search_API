document.querySelector('.theme-switcher').addEventListener('click', toggleTheme)
setThemeFromLocal();

searchUsername('wanjaeliud')
function select(selector, all = false){
  let method = ! all ? 'querySelector' : 'querySelectorAll';
  return document[method](selector);
}

/*====================================================
function to switch in betweeen themes
======================================================*/
function setThemeFromLocal(){
  let theme = JSON.parse(localStorage.getItem('theme'));

  if(! theme){
      return;
  }

  updateTheme(theme);
}

function toggleTheme() {

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
  const body = document.querySelector('body');

  let theme = themes[body.dataset.theme];

  localStorage.setItem('theme', JSON.stringify(theme));
  updateTheme(theme);
}

function updateTheme(theme){
  const body = document.querySelector('body');
  const themeSwitcherTxt = document.querySelector('.theme-switcher span');
  const themeSwitcherImg = document.querySelector('.theme-switcher img');
  body.dataset.theme = theme.code.toLowerCase();
  themeSwitcherTxt.innerHTML = theme.name;
  themeSwitcherImg.src = theme.icon;
}



function toggleErrorMessage(){
  const errorMessage = select('.error-message');
  errorMessage.classList.toggle('hidden');
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

    await searchUsername(username);

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

/*====================================
get the date a user joined
=====================================*/
function formateDate(date) {

  const created_at = new Date(date);

  const year = created_at.getFullYear();

  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const month = months[created_at.getMonth()];

  const day = created_at.getDate();

  return `${day} ${month} ${year}`;
}

/*============================================
update user stats
=============================================*/

function updateStats(data) {
  // Update stats
  // Repo number
  const repoEl = select('.repo-number');
  repoEl.innerText = data.public_repos ?? 0;
  // Followers
  const followersEl = select('.followers-number');
  followersEl.innerText = data.followers ?? 0;
  // Following
  const followingEl = select('.following-number');
  followingEl.innerText = data.following ?? 0;
}

function updateSocials(data) {

  const locationEl = select('.location');
  locationEl.innerText = data.location ?? 'Not available';

  const websiteEl = select('.website');
  websiteEl.href = !data.blog?.trim() ? 'Not available' : data.blog;
  websiteEl.innerText = 'Website';

  const twitterEl = select('.twitter');
  let twitterhandler = data.twitter_username ?? 'Not available'
  twitterEl.href = twitterhandler !== 'Not available' ? "https://twitter.com/" + twitterhandler : '#'
  twitterEl.innerText = twitterhandler;

  const companyEl = select('.company');
  companyEl.innerText = data.company ?? 'Not available';

}


/*====================================
get user bio 
====================================*/


function updateUi(data){
  //Update the image
  const imgEl = [...select('.card .profile-image', true)];
  imgEl.forEach((image) => image.src = data.avatar_url);

  // Update the name.
  const userNameEl = select('.user-name h1');
  userNameEl.innerHTML = data.name ?? 'Not available';

  // Update handler.
  const handlerEl = select('.handler');
  handlerEl.href = data.html_url;
  handlerEl.innerText = `@${data.login}`;

  // Update joined section
  const joinedEl = select('.joined');
  joinedEl.innerText = `Joined ${formateDate(data.created_at)}`;

  // Update the bio
  const bioEl = select('.bio');
  bioEl.innerText = data.bio ?? 'It seem like there is no bio...';

  updateStats(data);

  updateSocials(data);
}