class ProductsList{
    constructor(container = '.products'){
        this.container = container;
        this.goods = [];
    }

    fetchProducts(products_list) {
        this.goods = products_list.map(product => new ProductItem(product));
    }

    calcProductsPrice() {
        return this.goods.reduce((a, b) => a + b.price, 0);
    }
    
    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            block.insertAdjacentHTML('beforeend', product.render());
        }
    }
}


class ProductItem {
    constructor(product) {
        this.title = product.title;
        this.price = product.price;
        this.id = product.id;
    }

    render() {
        return  `<div class="item"> 
                    <p class="item__name">${this.title}</p> 
                    <p class="item__price">${this.price}$</p> 
                    <button class="item__buy-btn">Buy</button> 
                </div>`;
    }
}



/*********************************************************************/
// Методы, описанные в ProductsList сюда тоже подходят
class ShoppingCart extends ProductsList {
    addItem() {}
    delItem() {}
    selectItem() {}
    filter() {}
    makeOrder() {}
}


class ShoppingCartItem extends ProductItem {
    render() {}
}



/*********************************************************************/
class FoodInfo {
    constructor (price, kcal, name) {
        this.name = name;
        this.price = price;
        this.kcal = kcal;
    }

    getInfo() {
        return `${this.name} price: ${this.price} kcal: ${this.kcal}`;
    }
}


class Hamburger {
    static sizes = {
        'small' : new FoodInfo(50, 20, 'small'),
        'big' : new FoodInfo(100, 40, 'big')
    }

    static stuffings = {
        'cheese' : new FoodInfo(10, 20, 'cheese'),
        'salad' : new FoodInfo(20, 5, 'salad'),
        'potato' : new FoodInfo(15, 10, 'potato')
    }

    static toppings = {
        'condiment': new FoodInfo(15, 0, 'condiment'),
        'mayonnaise': new FoodInfo(20, 5, 'mayonnaise')
    }


    constructor(size, stuffing) {
        this.size = size;
        this.stuffing = stuffing;
        this.toppings_list = [];
    }

    addTopping(topping) {
        // Добавить добавку
        this.toppings_list.push(topping);
    }

    removeTopping(topping) {
        // Убрать добавку
        let index = this.toppings_list.indexOf(topping);
        if (index != -1)
            this.toppings_list.splice(index, 1);
    }

    getToppings() {
        // Узнать информацию о добавках
        return this.toppings_list.map(item => item.getInfo()).join('\n');
    }

    getSize() {
        // Узнать размер гамбургера
        return this.size.getInfo();
    }

    changeSize(size) {
        // Изменить размер гамбургера
        this.size = size;
    }

    getStuffing() {
        // Узнать начинку гамбургера
        return this.stuffing.getInfo();
    }

    changeStuffing(stuffing) {
        // Изменить начинку гамбургера
        this.stuffing = stuffing;
    }

    calculatePrice() {
        // Узнать цену
        return this.size.price + this.stuffing.price + this.toppings_list.reduce((a, b) => a + b.price, 0);
    }
    
    calculateCalories() {
        // Узнать калорийность
        return this.size.kcal + this.stuffing.kcal + this.toppings_list.reduce((a, b) => a + b.kcal, 0);
    }
  }



const products = [
    {id: 1, title: 'Notebook', price: 2000},
    {id: 2, title: 'Mouse', price: 20},
    {id: 3, title: 'Keyboard', price: 200},
    {id: 4, title: 'Gamepad', price: 50},
];
let list = new ProductsList();

list.fetchProducts(products);
list.render();
alert(`Суммарная цена всех товаров: ${list.calcProductsPrice()}`);




let hm = new Hamburger(Hamburger.sizes.big, Hamburger.stuffings.potato);
hm.addTopping(Hamburger.toppings.condiment);
hm.addTopping(Hamburger.toppings.condiment);
hm.removeTopping(Hamburger.toppings.condiment);
hm.addTopping(Hamburger.toppings.mayonnaise);
hm.changeSize(Hamburger.sizes.small);
hm.changeStuffing(Hamburger.stuffings.salad);
alert(`Размер: ${hm.getSize()}\nНачинка: ${hm.getStuffing()}\nДобавки: ${hm.getToppings()}\nЦена: ${hm.calculatePrice()}\nКалорийность: ${hm.calculateCalories()}`);
