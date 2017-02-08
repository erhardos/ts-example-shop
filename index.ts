import Shop from './shop'

const apple = {
    name: 'apple',
    price: 0.6
}
const orange = {
    name: 'orange',
    price: 0.25
}

function applePromotion (price) {
    if (this.name === 'apple'){
        price /= 2;

        if (this.count % 2 !== 0) {
            price += this.price;
        }
    }

    return price;
}

const shop = new Shop([apple, orange], [], [applePromotion])

shop.createCart(['apple', 'apple'])

shop.calculateTotalPrice();