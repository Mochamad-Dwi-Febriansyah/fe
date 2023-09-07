const menuSmall = document.getElementById('menu-button-small');
const menu = document.getElementById('menu-button');
const sidebar = document.getElementsByClassName('sidebar')[0]; 
const menuClose = document.getElementById('menu-button-close');


const min = document.getElementById('min');
const content = document.getElementsByClassName('box-content')[0]; 


menu.addEventListener('click', function() {
    sidebar.classList.toggle('hide'); 
});
menuSmall.addEventListener('click', function() {
    sidebar.classList.toggle('hidesmall')
});

menuClose.addEventListener('click', function() {
    sidebar.classList.remove('hidesmall');
})

min.addEventListener('click', function() {
    content.classList.toggle('min');
})
 


const dropdownProfil = document.getElementById('description-profil');
const dropdownItem = document.getElementsByClassName('description-dropdown')[0];

dropdownProfil.addEventListener('click', function() {
    dropdownItem.classList.toggle('tampil')
});