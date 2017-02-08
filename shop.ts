import helper from './helper'

interface InventoryItem {
    name: string;
    price: number;
    computedPrice?: number; 
}

interface CartItem extends InventoryItem {
    count: number;
}

interface Promotion {
    (prise:number): number
}


export default class Shop {
    public cart: CartItem[];

    constructor (
        private inventory: InventoryItem[] = [],
        private promotions: Promotion[] = [],
        ) {
            // Add identity function in case of no promotions injected.
            promotions.push(helper.identity)
        }

    public createCart(newItems: string[]): void {
        this.cart = [];
        newItems.forEach(item => {
            const inventoryItem = this.getInventoryItem(item);
            if (typeof inventoryItem === 'undefined'){
                throw new ReferenceError(`${item} does not exists`);
            }

            let cartItem = this.getCartItem(item);
            if (typeof cartItem === 'undefined') {
                this.cart.push(Object.assign(inventoryItem, {count: 1}));
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
            // Create pipe through which prise will be transformed (needed to bind cartItem to ech function to use it's atters)
            const promotionChain = helper.compose(this.promotions.map(fn => (fn).bind(cartItem)));
            let price = cartItem.price * cartItem.count;

            price = promotionChain.call(cartItem, price);

            totalPrice += price;
        })

        return `$${totalPrice.toFixed(2)}`
    }
}

