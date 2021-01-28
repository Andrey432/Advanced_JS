let add = (cart, req) => {
    cart.contents.push(req.body);
    cart.amount += req.body.price * req.body.quantity;
    cart.countGoods++;
    return JSON.stringify(cart, null, 4);
};

let change = (cart, req) => {
    let find = cart.contents.find(el => el.id_product === +req.params.id);
    find.quantity += req.body.quantity;

    cart.amount += find.price * req.body.quantity;
    cart.contents = cart.contents.filter(item => item.quantity > 0);
    cart.countGoods = cart.contents.length;

    return JSON.stringify(cart, null, 4);
};

module.exports = {
    add,
    change
};
