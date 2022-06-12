import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentReference,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
  writeBatch,
} from "firebase/firestore";
import { CartItem } from "./models/cartItem";
import { User, userConverter } from "./models/user";
import { Product, productConverter } from "./models/product";
import { cartItemConverter } from "./models/cartItem";
import { db } from "./firebase";

const userCollectionRef = collection(db, "users").withConverter(userConverter);
const productCollectionRef = collection(db, "products").withConverter(
  productConverter
);
const cartCollectionRef = collection(db, "cart").withConverter(
  cartItemConverter
);

export async function getUser(uid: string): Promise<User | null> {
  const docRef = doc(db, "users", uid).withConverter(userConverter);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const user: User = docSnap.data();
    user.id = docSnap.id;
    console.log("Document data:", user);
    return user;
  }
  return null;
}

// get all products
export async function getProducts() {
  const productsQuerySnapshot = await getDocs(productCollectionRef);
  let products: any = {
    breakfast: [],
    lunch: [],
    dinner: [],
  };

  productsQuerySnapshot.forEach((doc: any) => {
    // get the product
    const prod: Product = doc.data();
    prod.id = doc.id;
    // console.log(prod);

    // add the product to the correct category
    if (prod.category.includes("breakfast")) {
      products.breakfast.push(prod);
    }
    if (prod.category.includes("lunch")) {
      products.lunch.push(prod);
    }
    if (prod.category.includes("dinner")) {
      products.dinner.push(prod);
    }
  });
  // console.log(products);
  return products;
}

export async function getCartItems(uid: string): Promise<CartItem[]> {
  let cartItems: CartItem[] = [];

  const q = query(cartCollectionRef, where("uid", "==", uid));
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    // get the cart item
    const cartItem: CartItem = doc.data();
    cartItems.push(cartItem);
  });
  return cartItems;
}

export async function addToCart(cartItem: CartItem): Promise<CartItem> {
  const cartDocumentRef: DocumentReference<CartItem> = await addDoc(
    cartCollectionRef,
    cartItem
  );
  cartItem.id = cartDocumentRef.id;
  return cartItem;
}

export async function updateCartItem(cartItem: CartItem) {
  const cartDocumentRef: DocumentReference = doc(db, "cart", cartItem.id);
  if (cartItem.quantity > 0) {
    await setDoc(cartDocumentRef, cartItem.toMap());
  } else {
    await deleteDoc(cartDocumentRef);
  }
}

export async function clearCart(cartItems: CartItem[]) {
  const batch = writeBatch(db);
  cartItems.forEach((cartItem) => {
    batch.delete(doc(db, "cart", cartItem.id));
  });
  await batch.commit();
}
