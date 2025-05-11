import "./Inventar.css";
import { useContext, useEffect, useState } from "react";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";
import { Empty } from "./Empty";
import { Body } from "./Body";
import { Inventar2 } from "../../types";
import BasketService from "../../BasketService";
import { Context } from "../../main";
export function Inventar() {
  const [search, setSearch] = useState("");
  const {store}=useContext(Context)
  const [products, setProducts]=useState<Inventar2[] | undefined>([]);
  useEffect(()=>{
    console.log('id пользоватлея инвентарь: ',store.user.id)
    console.log('инвентарь в useEffect: ',store.user.inventar)
    console.log('юзер при отправке в useEffect: ',store.user)
    console.log('id пользоватлея инвентарь вторая попытка: ',store.user.id)
    const getProducts=async()=>{
      const productsGot=await BasketService.getAllProductsInInventar(store.user.id)
      console.log('продукты в инвентаре: ',productsGot)
      setProducts(productsGot)
    }
    getProducts()
  }, [])
  
  let filteredProducts: Inventar2[] | undefined = [];

  if (search) {
    filteredProducts = products?.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );
  } else {
    filteredProducts = products;
  }


  

  return (
    <>
      <Header setSearch={setSearch} />
      {filteredProducts?.length == 0 ? (
              <Empty />
            ):(
              <div>
                <span className="inventarIN">Инвентарь</span>
                <Body filteredProducts={filteredProducts} />
              </div>
            )}

      <Footer />
    </>
  );
}
