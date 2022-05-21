import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import Home from "./pages/home";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRecoilState } from "recoil";
import { loginState, productState, userInfoState } from "./recoil/atoms";
import { productCollectionRef, db } from "./firebase";
import { doc, getDoc, getDocs } from "firebase/firestore";
import { User, userConverter } from "./models/user";
import { kill } from "process";
import { Product } from "./models/product";
import Menu from "./pages/Menu";

function App() {
  const [isLoggedIn, setIsLoggedin] = useRecoilState(loginState);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [products, setProducts] = useRecoilState(productState);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("user logged in");
        const docRef = doc(db, "users", user.uid).withConverter(userConverter);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const user = docSnap.data();
          console.log("Document data:", user);
          setUserInfo(user);
          console.log(userInfo.address);
        }

        getDocs(productCollectionRef).then((querySnapshot: any) => {
          let tempProducts: any = {
            breakfast: [],
            lunch: [],
            dinner: [],
          };
          querySnapshot.forEach((doc: any) => {
            const prod: Product = doc.data();

            if (prod.category.includes("breakfast")) {
              tempProducts.breakfast.push(prod);
            }
            if (prod.category.includes("lunch")) {
              tempProducts.lunch.push(prod);
            }
            if (prod.category.includes("dinner")) {
              tempProducts.dinner.push(prod);
            }
          });
          console.log(tempProducts);
          setProducts(tempProducts);
          console.log(products);
        });

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
