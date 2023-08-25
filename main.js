// this will save in the browser the list created by a user
const STORAGE_KEY = 'xmas-list-bool';

const total = document.querySelector('span');
const list = document.querySelector('.list');
const form = document.querySelector('#add-gift');
const name = document.querySelector('#name');
const price = document.querySelector('#price');
const description = document.querySelector('#description');
 
let gifts = [];

// i use here the storage key to see if there is an old list
const oldList = localStorage.getItem(STORAGE_KEY);
if (oldList) {
    gifts = JSON.parse(oldList);  
    whatsTotal();
    recallList();
}

form.addEventListener('submit', function (event) {
    event.preventDefault();
    const name = name.value.trim();
    const price = price.value.trim();
    const description = description.value.trim();
    addGift(name, price, description);
  
// reset del form
    form.reset();
    name.focus();
});