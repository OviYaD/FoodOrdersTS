export class Product {
  constructor(name = "", price = 0, category = [], type = "") {
    this.name = name;
    this.price = price;
    this.category = category;
    this.type = type;
  }
  toString() {
    return this.name + ", " + this.price + ", " + this.category;
  }
}

// Firestore data converter
export const productConverter = {
  toFirestore: (product) => {
    return {
      name: product.name,
      price: product.price,
      category: product.category,
      type: product.type,
    };
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return new Product(
      data.product_name,
      data.price,
      data.category,
      data.product_type
    );
  },
};
