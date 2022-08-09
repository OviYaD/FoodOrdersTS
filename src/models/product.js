export class Product {
  constructor(id = "", name = "", price = 0, category = [], type = "") {
    this.id = id;
    this.name = name;
    this.price = price;
    this.category = category;
    this.type = type;
  }
  toString() {
    return this.name + ", " + this.price + ", " + this.category;
  }
  toMap() {
    return {
      prod_id: this.id,
      name: this.name,
      price: this.price,
      category: this.category,
      type: this.type,
    };
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
      "",
      data.product_name,
      data.price,
      data.category,
      data.product_type
    );
  },
};
