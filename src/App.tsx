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
          const tempProducts: any[] = [];
          querySnapshot.forEach((doc: any) => {
            tempProducts.push(doc.data());
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
