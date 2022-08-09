import { Product } from "./product";

export class CartItem {
    constructor(id, product, quantity, uid) {
        this.id = id;
        this.uid = uid;
        this.product = product;
        this.quantity = parseInt(quantity);
    }

    toString() {
        return this.product.name + ", " + this.quantity;
    }
    toMap() {
        return {
            uid: this.uid,
            ...this.product.toMap(),
            quantity: this.quantity,
        };
    }
}

export const cartItemConverter = {
    toFirestore: (cartItem) => {
        return {
            uid: cartItem.uid,
            ...cartItem.product.toMap(),
            quantity: cartItem.quantity,
        };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new CartItem(
            snapshot.id,
            new Product(
                data.prod_id,
                data.name,
                data.price,
                data.category,
                data.type
            ),
            data.quantity,
            data.uid
        );
    },
};