import { useContext, useEffect, useRef } from "react";
import Catalog from "./User/Catalog/Catalog";
import { ProductCard } from "./User/ProductCard/ProductCard";
import { Basket1 } from "./User/Basket/Basket";
import Enter from "./SignUpIn/Enter";
import "./App.css";
import { observer } from "mobx-react-lite";
import Regist from "./SignUpIn/Regist";
import { EnterAsAdmin } from "./SignUpIn/EnterAsAdmin";
import { ACatalog } from "./Admin/ACatalog/Catalog";
import { ACard } from "./Admin/ACard/Card";
import { Profile } from "./Profile/Enter";
import { Routes, Route } from "react-router-dom";
import { Inventar } from "./User/Inventar/Inventar";
import { Context } from "./main";
import ProtectedRoute from "./ProtectedRoute";
import ProtectedAdminRoute from "./ProtectedAdminRoute";

function App() {
  useEffect(() => {
    document.body.style.backgroundColor = "rgba(53, 52, 51, 1)";
  }, []);
  const { store } = useContext(Context);

  const hasCheckedAuth = useRef(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
  
    if (token && !store.isAuth && !hasCheckedAuth.current) {
      hasCheckedAuth.current = true; // Устанавливаем флаг
      store.checkAuth();
    }
    
  }, [store.isAuth]);
  console.log(store.isAuth)
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Catalog />
            </ProtectedRoute>
          }
        />
        <Route
          path="/basket"
          element={
            <ProtectedRoute>
              <Basket1 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/card/:id"
          element={
            <ProtectedRoute>
              <ProductCard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/inventar"
          element={
            <ProtectedRoute>
              <Inventar />
            </ProtectedRoute>
          }
        />
        <Route path="/profile" element={<Profile />} />
        <Route path="/registration" element={<Regist />} />
        <Route path="/login" element={<Enter />} />
        <Route path="/adminEntrance" element={<EnterAsAdmin />} />
        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute>
              <ACatalog />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/addProduct"
          element={
            <ProtectedAdminRoute>
              <ACard />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/addProduct/:id"
          element={
            <ProtectedAdminRoute>
              <ACard />
            </ProtectedAdminRoute>
          }
        />
      </Routes>
    </>
  );
}

export default observer(App);
