/// <reference path="typings/globals/mocha/index.d.ts" />

import {} from 'mocha';
import * as chai from 'chai';
import Shop from './shop'


const expect = chai.expect;

describe('tests of shop', () => {

    it('creates an shop object without inventory', () => {
        const shop = new Shop()
        expect(shop).to.be.instanceof(Shop)
    });

    it('creates an shop with valid inventory', ()=>{
        const apple = {name: 'apple', price: 0.1};
        const orange = {name: 'orange', price: 0.2};

        const shop = new Shop([apple, orange])
        expect(shop.getInventoryItem.call(shop, 'apple')).to.be.equal(apple);
        expect(shop.getInventoryItem.call(shop, 'orange')).to.be.equal(orange);
    });

    it('add items to cart', () => {
        const apple = {name: 'apple', price: 0.1};
        const orange = {name: 'orange', price: 0.2};
        
        const shop = new Shop([apple, orange])
        shop.createCart(['apple', 'orange', 'apple'])

        expect(shop.getCartItem.call(shop, 'apple')).to.be.equal(Object.assign(apple, {count: 2}))
    });

    it('add to cart item that not exists in inventory', () => {
        const apple = {name: 'apple', price: 0.1};
        
        const shop = new Shop([apple])
        expect(shop.createCart.bind(shop, ['apple', 'orange'])).to.throw(ReferenceError, 'orange does not exists')
    });

    it('calculate price of items in cart', () => {
        const apple = {name: 'apple', price: 0.1};
        const orange = {name: 'orange', price: 0.2};

        const bucket = ['apple', 'orange', 'orange'];
        
        const shop = new Shop([apple, orange])
        shop.createCart(bucket);
        expect(shop.calculateTotalPrice()).to.be.equal('$0.50')
    });

    it('apply item promotion', () => {
        function applePromotion(price) {
            if (this.name === 'apple') {
                price = price/2;
                
                if (this.count % 2 !== 0) {
                    price = price + this.price;
                } 
            }

           return price;
        }


        function orangePromotion(price) {
            if (this.name === 'orange') {
                price -= this.price * (~~(this.count / 3)) 
            }

           return price;
        }


        const apple = {name: 'apple', price: 0.1};
        const orange = {name: 'orange', price: 0.2};

        const bucket = ['apple', 'apple', 'orange', 'orange', 'orange'];
        
        const shop = new Shop([apple, orange], [applePromotion, orangePromotion])
        shop.createCart(bucket);
        expect(shop.calculateTotalPrice()).to.be.equal('$0.50')
    })


})
