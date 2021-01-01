/* Основной класс - List. Он реализует хранение и отображение данных. ProductsList и Cart реализуют обработку данных.
*  ListItem - общий класс для представления данных, чтобы не приходилось из класса в класс делать распаковку/запаковку.
*  Производные от ListItem классы переопределяют render.
*/


class List {
    constructor (container, item_class) {
        this.container = container;
        this.items = new Map();
        this.item_class = item_class;
    }

    addItem(item) {
        let id = item.id;
        if (this.items.has(id))
            this.items.get(id).quantity++;
        else
            this.items.set(id, new this.item_class(item));
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
        document.querySelector(this.container).insertAdjacentHTML('beforeend',  item.render());
    }

    render() {
        const block = document.querySelector(this.container);
        this.items.forEach((value) => {
            if (value.quantity > 0)
                block.insertAdjacentHTML('beforeend',  value.render());
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

    render() {
        return ''
    }
}


class ProductsList extends List {
    constructor(container='.products'){
        super(container, ProductItem);
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
                    this.addItem(new ProductItem(item_data));
                });
                this.render();
            })
            .catch(() => document.querySelector(this.container).insertAdjacentHTML('beforebegin', '<p class="error-msg">An error has occurred<p/>'))
    }

    bindCart(cart) {
        this.cart = cart;
    }
}


class ProductItem extends ListItem {
    render() {
        return `<div class="item">
                    <p class="item__name">${this.title}</p>
                    <p class="item__price">${this.price}$</p>
                    <button class="item__buy-btn" item-id="${this.id}">Buy</button>
                </div>`;
    }
}


class Cart extends List {
    constructor (container='.cart__container') {
        super(container, CartItem);
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


class CartItem extends ListItem {
    render() {
        return `<div class="cart-item" data-id="${this.id}">
                    <div class="product-bio">
                        <div class="product-desc">
                            <p class="product-title">${this.title}</p>
                            <p class="product-quantity">Quantity: ${this.quantity}</p>
                            <p class="product-single-price">$${this.price} each</p>
                        </div>
                    </div>
                    <div class="right-block">
                        <p class="product-price">$${this.quantity * this.price}</p>
                        <button class="del-btn" data-id="${this.id}">&times;</button>
                    </div>
                </div>`
    }
}


const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json';
let list = new ProductsList();
let cart = new Cart();

list.load(API);
list.bindCart(cart);
