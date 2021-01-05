const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        catalogUrl: '/catalogData.json',
        products: [],
        filteredProducts: [],
        cartList: [],
        imgCatalog: 'https://placehold.it/200x150',
        userSearch: '',
        showCartBlock: false,
        stubMessage: 'Товаров нет',
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                })
        },

        addProductToCart(product) {
            let id = product.id_product;
            let added = false;

            this.cartList.forEach(element => {
                if (element.id_product === id) {
                    added = true;
                    element.quantity++;
                }
            });

            if (!added) {
                this.cartList.push({
                    id_product: product.id_product,
                    product_name: product.product_name,
                    price: product.price,
                    quantity: 1
                });
            }
        },

        changeCartVisibility() {
            this.showCartBlock = !this.showCartBlock;
        },

        deleteProductFromCart(product) {
            product.quantity--;
            if (product.quantity == 0) {
                this.cartList.splice(this.cartList.indexOf(product), 1);
            }
        },
        filterProducts() {
            let regexp = new RegExp(this.userSearch, 'iu');
            this.filteredProducts = this.products.filter(product => {
                if (product.product_name.search(regexp) != -1)
                    return true;
            });
        },
    },

    mounted(){
       this.getJson(`${API + this.catalogUrl}`)
           .then(data => {
               for(let el of data){
                   this.products.push(el);
               }
               this.filterProducts();
           });
        this.getJson(`getProducts.json`)
            .then(data => {
                for(let el of data){
                    this.products.push(el);
                }
                this.filterProducts();
            });
    }
})
