import { Product } from "./product";

export class CartItem {
  constructor(product, quantity) {
    this.product = product;
    this.quantity = quantity;
  }

  toString() {
    return this.product.name + ", " + this.quantity;
  }
}

export const cartItemConverter = {
  toFirestore: (cartItem) => {
    return {
      ...cartItem.product.toMap(),
      quantity: cartItem.quantity,
    };
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return new CartItem(
      new Product(data.name, data.price, data.category, data.type),
      data.quantity
    );
  },
};
