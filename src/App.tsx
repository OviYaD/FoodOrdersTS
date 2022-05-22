import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import Home from "./pages/home";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRecoilState } from "recoil";
import {
  cartItemsState,
  loginState,
  productState,
  userInfoState,
} from "./recoil/atoms";
import Menu from "./pages/Menu";
import { getCartItems, getProducts, getUser } from "./firestore";
import AddProducts from "./pages/components/AddProducts";

function App() {
  const [isLoggedIn, setIsLoggedin] = useRecoilState(loginState);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [products, setProducts] = useRecoilState(productState);
  const [cartItems, setCartItems] = useRecoilState(cartItemsState);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        // get user details.
        const userInfo = await getUser(user.uid);
        console.log("User", userInfo);
        if (userInfo) setUserInfo(userInfo);

        // get products
        const products = await getProducts();
        setProducts(products);

        // get cart items
        const cartItems = await getCartItems(user.uid);
        setCartItems(cartItems);
        console.log(cartItems);
        setIsLoggedin(true);
      } else {
        console.log("logged out");
        setIsLoggedin(false);
      }
    });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/menu" element={<Menu />}></Route>
        <Route path="/addproducts" element={<AddProducts />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
