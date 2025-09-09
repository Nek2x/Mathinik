let toggleBtn = document.getElementById('toggle-btn');
let body = document.body;
let darkMode = localStorage.getItem('dark-mode');

const enableDarkMode = () => {
   toggleBtn.classList.replace('fa-sun', 'fa-moon');
   body.classList.add('dark');
   document.querySelector('.income')?.classList.add('dark-card');
   document.querySelector('.recent_activity')?.classList.add('dark-card'); 
   localStorage.setItem('dark-mode', 'enabled');
};

const disableDarkMode = () => {
   toggleBtn.classList.replace('fa-moon', 'fa-sun');
   body.classList.remove('dark');
   document.querySelector('.income')?.classList.remove('dark-card');
   document.querySelector('.recent_activity')?.classList.remove('dark-card'); 
   localStorage.setItem('dark-mode', 'disabled');
};

if (darkMode === 'enabled') {
   enableDarkMode();
}

toggleBtn.onclick = () => {
   darkMode = localStorage.getItem('dark-mode');
   darkMode === 'disabled' ? enableDarkMode() : disableDarkMode();
};

let profile = document.querySelector('.header .flex .profile');

document.querySelector('#user-btn').onclick = () => {
   profile.classList.toggle('active');
};

let sideBar = document.querySelector('.side-bar');

document.querySelector('#menu-btn').onclick = () => {
   sideBar.classList.toggle('active');
   body.classList.toggle('active');
};

document.querySelector('#close-btn').onclick = () => {
   sideBar.classList.remove('active');
   body.classList.remove('active');
};

window.onscroll = () => {
   profile.classList.remove('active');
   if (window.innerWidth < 1200) {
      sideBar.classList.remove('active');
      body.classList.remove('active');
   }
};
