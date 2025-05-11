import { Header } from "../Header/Header";
import { useContext, useEffect, useState } from "react";
import { Body } from "./Body/Body";
import { SecondHeader } from "./secondHeader/secondHeader";
import { Empty } from "./Empty";
import { OrderProcess } from "./Body/OrderProcess/OrderProcess";
import { Basket} from "../../types";
import BasketService from "../../BasketService";
import { Context } from "../../main";
import { Loading } from "../../Loading";

export function Basket1() {
  const [confirm, setConfirm] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");
  const { store } = useContext(Context);

  const [allProducts, setAllProducts] = useState<Basket[] | undefined>(
    undefined
  );
  const [loading, setLoading] = useState(true);
  const [productsTotalAmount, setProductsTotalAmount] = useState<
    number | undefined
  >(0);
  const [productsTotalPrice, setProductsTotalPrice] = useState<
    number | undefined
  >(0);
  useEffect(() => {
    const getAllProducts = async () => {
      const products = await BasketService.getAllProductsInBasket(
        store.user.id
      );
      if (products) {
        console.log("продукты в корзине: ", products);
        const totalPrice = products.reduce(
          (sum, product) => sum + product.price * product.amount,
          0
        );
        setProductsTotalPrice(totalPrice);

        const totalAmount = products.reduce(
          (sum, product) => sum + product.amount,
          0
        );
        setProductsTotalAmount(totalAmount);
      }
      setAllProducts(products);
      setLoading(false);
    };
    getAllProducts();
  }, [store.user.id]);
  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Header setSearch={setSearch} />
      {allProducts?.length != 0 ? (
        <>
          <SecondHeader />
          <Body
            products={allProducts}
            totalPrice={productsTotalPrice}
            totalAmount={productsTotalAmount}
            setConfirm={setConfirm}
            setError={setError}
            setProductsTotalAmount={setProductsTotalAmount} // добавлено
            setProductsTotalPrice={setProductsTotalPrice}
            setAllProducts={setAllProducts}
          />
        </>
      ) : (
        <>
          <SecondHeader />
          <Empty />
        </>
      )}
      <OrderProcess
        totalPrice={productsTotalPrice}
        setConfirm={setConfirm}
        setError={setError}
        setSuccess={setSuccess}
        confirm={confirm}
        success={success}
        error={error}
      />
    </>
  );
}
