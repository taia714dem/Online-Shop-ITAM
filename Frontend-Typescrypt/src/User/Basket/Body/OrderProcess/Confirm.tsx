import { useContext, useEffect, useState } from "react";
import "./OrderProcess.css";
import BasketService from "../../../../BasketService";
import { Context } from "../../../../main";
import LB from "./LB";
interface ConfirmProps {
  setConfirm: (c: boolean) => void;
  setSuccess: (c: boolean) => void;
  totalPrice: number | undefined;
}
export function Confirm({ setConfirm, setSuccess, totalPrice }: ConfirmProps) {
  const [clicked, setClicked] = useState(false);
  const { store } = useContext(Context);
  function Close() {
    setConfirm(false);
  }
  useEffect(() => {
    if (clicked) {
      const buyProducts = async () => {
        console.log('id пользоватлея при покупке: ',store.user.id)
        const response = await BasketService.purchaseBasket(store.user.id, store);
        console.log('пользователь после покупки: ', store.user)
        

        // Обновляем баланс
        if (totalPrice) {
          store.setBalance({
            ...store.user,
            balance: store.user.balance - totalPrice,
          });
        }

        console.log("инвентарь: ", response);
        setClicked(false);
        setConfirm(false);
        setSuccess(true);
      };
      buyProducts();
    }
  }, [clicked]);

  return (
    <>
      <div className="overlay" />
      <div className="confirmBox">
        <div className="boxBA">
          {clicked ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center", // Центрирование по горизонтали
                alignItems: "center", // Центрирование по вертикали
                height: "100%", // Убедитесь, что div занимает всю доступную высоту
                width: "100%",
              }}
            >
              <LB />
            </div>
          ) : (
            <>
              <div className="quest">Подтверждаете заказ?</div>
              <span className="mesg2">
                Коины сразу спишутся со счета после подтверждения заказа
              </span>
              <div className="btns">
                <button className="yes" onClick={() => setClicked(true)}>
                  Да
                </button>
                <button className="delay" onClick={Close}>
                  Отмена
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
