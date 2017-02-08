import Shop from './shop'

const apple = {
    name: 'apple',
    price: 0.6
}
const orange = {
    name: 'orange',
    price: 0.25
}

const shop = new Shop([apple, orange])

shop.createCart(['apple', 'orange', 'orange', 'orange'])

shop.calculateTotalPrice();