// this will save in the browser the list created by a user
const STORAGE_KEY = 'xmas-list-bool';

const total = document.querySelector('span');
const list = document.querySelector('.list');
const form = document.querySelector('#add-gift');
const nameF = document.querySelector('#name');
const priceF = document.querySelector('#price');
const descriptionF = document.querySelector('#description');

let gifts = [];

// i use here the storage key to see if there is an old list
const oldList = localStorage.getItem(STORAGE_KEY);
if (oldList) {
    gifts = JSON.parse(oldList);
    whatsTotal();
    renderList();
}

form.addEventListener('submit', function (event) {
    event.preventDefault();
    const name = nameF.value.trim();
    const price = Number(priceF.value.trim());
    const description = descriptionF.value.trim();
    addGift(name, price, description);

    // reset form
    form.reset();
});

function addGift(name, price, description) {
    const newGift = {
        name,
        price,
        description
    };
    gifts.push(newGift);

    // now i have to update the local storage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(gifts));

    whatsTotal();
    renderList();
}


function whatsTotal() {
    let total = 0;
    for (let i = 0; i < gifts.length; i++) {
        total += gifts[i].price;
    }
    total.innerText = amount(total);
}

function amount(amount) {
    return amount.toFixed(2) + '€';
}

function renderList() {
    list.innerHTML = '';
    for (let i = 0; i < gifts.length; i++) {
        const giftElement = createListElement(i);
        list.innerHTML += giftElement;
    }
    setDeleteButtons();
}

function createListElement(i) {
    const gift = gifts[i];

    return `
    <li class="gift">
      <div class="info">
        <h3>${gift.name}</h3>
        <p>${gift.description}</p>
      </div>
      <strong class="price">${amount(gift.price)}</strong>
      <button id="delete" data-index="${i}">❌</button>
    </li>
    `;
}

function setDeleteButtons() {
    const deleteButtons = document.querySelectorAll('#delete');
    for (let i = 0; i < deleteButtons.length; i++) {
        const button = deleteButtons[i];
        button.addEventListener('click', function () {
            const index = button.dataset.index;
            removeGift(index);
        });
    }
}

function removeGift(index) {
    gifts.splice(index, 1);

    // i need to re update the local storage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(gifts));

    whatsTotal();
    renderList();
}
