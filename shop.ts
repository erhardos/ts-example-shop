interface InventoryItem {
    name: string;
    price: number;
}

interface CartItem extends InventoryItem {
    count: number;
}


export default class Shop {

    constructor (private inventory: InventoryItem[] = [], public cart: CartItem[] = []){
    }

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
        let price = 0;
        this.cart.forEach(cartItem => {
            price += cartItem.count * cartItem.price
        })
        return `$${price}`
    }
}