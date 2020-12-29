const renderItem = (item, button="Buy") => `<div class="item">
                                                <p class="item__name">${item.name}</p>
                                                <p class="item__price">${item.price}$</p>
                                                <button class="item__buy-btn">${button}</button>
                                            </div>`;

const renderPage = products_list =>
    document.querySelector(".products").innerHTML = products_list.map(item => renderItem(item)).join('');


const products = [
    {name: "Notebook", price: 2000},
    {name: "Mouse", price: 20},
    {name: "Keyboard", price: 200},
    {name: "Gamepad", price: 5}
]

renderPage(products);
