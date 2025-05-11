import { useContext, useEffect, useState } from "react";
import "./Body.css";
import { Context } from "../../../main";
import { Basket } from "../../../types";
import BasketService from "../../../BasketService";
interface BodyProps {
  products: Basket[] | undefined;
  totalPrice: number | undefined;
  totalAmount: number | undefined;
  setConfirm: (confirm: boolean) => void;
  setError: (error: boolean) => void;
  setProductsTotalAmount: (amount: number | undefined) => void; // добавлено
  setProductsTotalPrice: (price: number | undefined) => void;
  setAllProducts: (products: Basket[] | undefined) => void;
}

export function Body({
  products,
  setConfirm,
  setError,
  totalPrice,
  totalAmount,
  setProductsTotalAmount, // добавлено
  setProductsTotalPrice,
  setAllProducts,
}: BodyProps) {
  const [idPlus, setidPlus] = useState<string | undefined>("");
  const [idMinus, setidMinus] = useState<string | undefined>("");
  const [idDelete, setidDelete] = useState<string | undefined>("");
  const [am, setAm] = useState<number>(0);
  const { store } = useContext(Context);
  useEffect(() => {
    if (idPlus) {
      const addProduct = async () => {
        try {
          const result = await BasketService.addToBasket(
            store.user.id,
            idPlus,
            am
          );
          const updatedProducts = await BasketService.getAllProductsInBasket(
            store.user.id
          ); // Получаем обновленную корзину
          setAllProducts(updatedProducts);
          const totalPrice = updatedProducts?.reduce(
            (sum, product) => sum + product.price * product.amount,
            0
          );
          const totalAmount = updatedProducts?.reduce(
            (sum, product) => sum + product.amount,
            0
          );
          setProductsTotalPrice(totalPrice);
          setProductsTotalAmount(totalAmount);
          console.log("корзина: ", result);

          setAm(0);
          setidPlus("");
        } catch (error) {
          console.log("ошибка при добавлении продукта: ", error);
        }
      };
      addProduct();
    }
  }, [idPlus]);

  useEffect(() => {
    if (idMinus) {
      const removeOneProduct = async () => {
        try {
          const result = await BasketService.removeOneFromBasket(
            store.user.id,
            idMinus
          );
          const updatedProducts = await BasketService.getAllProductsInBasket(
            store.user.id
          );
          setAllProducts(updatedProducts);
          const totalPrice = updatedProducts?.reduce(
            (sum, product) => sum + product.price * product.amount,
            0
          );
          const totalAmount = updatedProducts?.reduce(
            (sum, product) => sum + product.amount,
            0
          );
          setProductsTotalPrice(totalPrice);
          setProductsTotalAmount(totalAmount);
          console.log("корзина: ", result);
          setidMinus("");
        } catch (error) {
          console.log("ошибка при убавлении продукта: ", error);
        }
      };
      removeOneProduct();
    }
  }, [idMinus]);

  useEffect(() => {
    if (idDelete) {
      const removeOneProduct = async () => {
        try {
          const result = await BasketService.deleteProduct(
            store.user.id,
            idDelete
          );
          const updatedProducts = await BasketService.getAllProductsInBasket(
            store.user.id
          );
          setAllProducts(updatedProducts);
          const totalPrice = updatedProducts?.reduce(
            (sum, product) => sum + product.price * product.amount,
            0
          );
          const totalAmount = updatedProducts?.reduce(
            (sum, product) => sum + product.amount,
            0
          );
          setProductsTotalPrice(totalPrice);
          setProductsTotalAmount(totalAmount);
          console.log("корзина: ", result);
          setidDelete("");
        } catch (error) {
          console.log("ошибка при убавлении продукта: ", error);
        }
      };
      removeOneProduct();
    }
  }, [idDelete]);
  function orderClick() {
    if(totalPrice){
      if (store.balance >= totalPrice) {
        setConfirm(true);
      } else {
        setError(true);
      }
    }
  }
  if (!products) {
    console.log("нет продуктов");
  } else {
    console.log("есть продукты");
  }

  return (
    <>
      <div className="productsBA">
        {products?.map((product) => (
          <div className="productBA" key={product.productId}>
            <img
              className="imgBA"
              src={product.picture ? product.picture : "img3.svg"}
            />
            <div className="middleSection">
              <span className="nameBA">{product.name}</span>
              <span className="left">Осталось {product.quantity} шт.</span>
              <div className="AddOrDecrease">
                <img
                  className="minus"
                  src="minus.svg"
                  onClick={() => {
                    setidMinus(product.productId);
                    console.log("минус нажался", idPlus, product.productId);
                  }}
                />
                <span className="added">{product.amount}</span>
                <img
                  className="plus"
                  src="plus.svg"
                  onClick={() => {
                    setAm(product.amount);
                    setidPlus(product.productId);
                    console.log("плюсик нажался ");
                  }}
                />
              </div>
            </div>
            <div className="price">{product.price} коинов</div>
            <img
              className="deleteBA"
              src="delete.svg"
              onClick={() => {
                setidDelete(product.productId);
                console.log("delete нажался");
              }}
            />
          </div>
        ))}
      </div>
      <div className="info">
        <div className="mainInfo">
          <div className="howToGet">
            <span className="wordHTG">Как получить товар?</span>
            <span className="desc">
              После оформления тебе на почту будет выслан ID заказа. Его можно
              будет забрать через 2 дня в коворкингe ITAM.
            </span>
          </div>
          <div className="finalInfo">
            <div className="goodsInfo">
              <span className="goodsC">Товары, {totalAmount} шт</span>
              <span className="goodsP">{totalPrice} коинов</span>
            </div>
          </div>
          <div className="itogo">
            <div className="wordItogo">Итого</div>
            <div className="coinsBA">
              <span className="cost1">{totalPrice}</span>
              <img className="icon2" src="coins.svg" />
            </div>
          </div>
        </div>
        <button className="orderBtn" onClick={orderClick}>
          Заказать
        </button>
      </div>
    </>
  );
}
