class List {
    constructor (container, render= data => '') {
        this.container = container;
        this.items = new Map();
        this.render_item = render;
    }

    addItem(item) {
        let id = item.id;
        if (this.items.has(id))
            this.items.get(id).quantity++;
        else
            this.items.set(id, new ListItem(item));
    }

    delItem(item) {
        let id = item.id;
        if (this.items.has(id)) {
            let product = this.items.get(id);
            if (product.quantity > 0)
                product.quantity--;
        }
    }

    renderSingle(item) {
        document.querySelector(this.container).insertAdjacentHTML('beforeend',  this.render_item(item));
    }

    render() {
        const block = document.querySelector(this.container);
        this.items.forEach((value) => {
            if (value.quantity > 0)
                block.insertAdjacentHTML('beforeend',  this.render_item(value))
        });
    }
}


class ListItem {
    constructor (data, initial_quantity=1) {
        this.id = data.id;
        this.title = data.title;
        this.price = data.price;
        this.quantity = initial_quantity;
    }
}


class ProductsList extends List {
    constructor(container='.products'){
        super(container, data =>`<div class="item">
                                    <p class="item__name">${data.title}</p>
                                    <p class="item__price">${data.price}$</p>
                                    <button class="item__buy-btn" item-id="${data.id}">Buy</button>
                                </div>`);
        this.cart = undefined;

        document.querySelector(this.container).addEventListener('click', event => {
            if (event.target.classList.contains('item__buy-btn') && this.cart) {
                let id = Number(event.target.getAttribute('item-id'));
                this.cart.addItem(this.items.get(id));
            }
        });
    }

    _fetchProducts(url) {
        return fetch(url)
            .then(json_data => json_data.json());
    }

    load(url) {
        this._fetchProducts(url)
            .then(data => {
                data.forEach(item_data => {
                    item_data = {
                        id: item_data.id_product,
                        title: item_data.product_name,
                        price: item_data.price
                    };
                    this.addItem(new ListItem(item_data));
                });
                this.render();
            })
            .catch(() => document.querySelector(this.container).insertAdjacentHTML('beforebegin', '<p class="error-msg">An error has occurred<p/>'))
    }

    bindCart(cart) {
        this.cart = cart;
    }

    calcProductsPrice() {
        return this.goods.reduce((a, b) => a + b.price, 0);
    }
}


class Cart extends List {
    constructor (container='.cart__container') {
        super(container, data => `<div class="cart-item" data-id="${data.id}">
                                    <div class="product-bio">
                                    <div class="product-desc">
                                    <p class="product-title">${data.title}</p>
                                    <p class="product-quantity">Quantity: ${data.quantity}</p>
                                <p class="product-single-price">$${data.price} each</p>
                                </div>
                                </div>
                                <div class="right-block">
                                    <p class="product-price">$${data.quantity * data.price}</p>
                                    <button class="del-btn" data-id="${data.id}">&times;</button>
                                </div>
                                </div>`)

        document.querySelector('.cart-btn').addEventListener('click', () => {
            document.querySelector(this.container).classList.toggle('invisible');
        });
        document.querySelector(this.container).addEventListener('click', event => {
            if (event.target.classList.contains('del-btn')) {
                let id = Number(event.target.getAttribute('data-id'));
                this.delItem(this.items.get(id));
            }
        });
    }

    addItem(item) {
        super.addItem(item);
        item = this.items.get(item.id);
        if (item.quantity == 1)
            this.renderSingle(item);
        else
            this._updateItem(item);
    }

    delItem(item) {
        super.delItem(item);
        item = this.items.get(item.id);
        if (item.quantity == 0)
            this._deleteItem(item);
        else
            this._updateItem(item);
    }

    _findItem(id) {
        return document.querySelector(`.cart-item[data-id="${id}"]`);
    }

    _updateItem(item) {
        let block = this._findItem(item.id);
        block.querySelector('.product-quantity').textContent = `Quantity: ${item.quantity}`;
        block.querySelector('.product-price').textContent = `$${item.quantity * item.price}`;
    }

    _deleteItem(item) {
        this._findItem(item.id).remove()
    }

    selectItem() {}
    filter() {}
    makeOrder() {}
}


const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json';
let list = new ProductsList();
let cart = new Cart();

list.load(API);
list.bindCart(cart);
