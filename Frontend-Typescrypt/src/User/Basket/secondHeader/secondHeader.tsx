import { useContext } from 'react';
import './secondHeader.css'
import { Context } from '../../../main';
export function SecondHeader(){
  const {store}=useContext(Context);
    return(
    <>
        <div className="secondHeader">
        <span className="wordBasket">Корзина</span>
        <div className="myBalance">
          <span className="wordBalance">Мой баланс:</span>
          <span className="colorBalance">{store.user.balance} коинов</span>
        </div>
      </div>
    </>)
}