import helper from './helper'

interface InventoryItem {
    name: string;
    price: number;
    computedPrice?: number; 
}

interface CartItem extends InventoryItem {
    count: number;
}


export default class Shop {

    constructor (
        private inventory: InventoryItem[] = [], 
        public cart: CartItem[] = [],
        private promotions: Function[] = []
        ) {}

    public createCart(newItems: string[]): void {
        newItems.forEach(item => {
            const inventoryItem = this.getInventoryItem(item);
            if (typeof inventoryItem === 'undefined'){
                throw new ReferenceError(`${item} does not exists`);
            }

            let cartItem = this.getCartItem(item);
            if (typeof cartItem === 'undefined') {
                this.cart.push((<any>Object).assign(inventoryItem, {count: 1}));
            } else {
                cartItem.count += 1; 
            }
        })
    }

    public getInventoryItem(item: string): InventoryItem {
        return this.inventory.find(inventoryItem => inventoryItem.name === item)
    }

    public getCartItem(item: string): CartItem {
        return this.cart.find(inventoryItem => inventoryItem.name === item)
    }

    public calculateTotalPrice(): string {
        let totalPrice = 0;

        this.cart.forEach(cartItem => {
            const promotionChain = helper.compose(this.promotions.map(fn => (fn).bind(cartItem)));
            let price = 0;
            price = cartItem.price * cartItem.count;

            price = promotionChain.call(cartItem, price);

            totalPrice += price;
        })

        return `$${totalPrice.toFixed(2)}`
    }
}

