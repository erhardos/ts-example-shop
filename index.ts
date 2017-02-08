import Shop from './shop'

const apple = {
    name: 'apple',
    price: 0.6
}
const orange = {
    name: 'orange',
    price: 0.25
}

function orangePromotion(price) {
    if (this.name === 'orange') {
        price -= this.price * (~~(this.count / 3)) 
    }

    return price;
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

const shop = new Shop([apple, orange], [applePromotion, orangePromotion])

shop.createCart(['apple', 'apple', 'orange'])

shop.calculateTotalPrice();