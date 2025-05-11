import { useContext, useEffect, useState } from "react";
import { Product } from "../../../types";
import "./Body.css"
import { useNavigate } from "react-router-dom";
import BasketService from "../../../BasketService";
import { Context } from "../../../main";
import { MessageAdded } from "./MessageAdded/MessageAdded";
interface BodyProps{
    filteredProducts: Product[] | undefined;
}

 
export function Body({filteredProducts}:BodyProps){
    const[productId, setProductId]=useState<string | undefined>("");
    const navigate=useNavigate();
    const {store}=useContext(Context);
    const [messageAdded, setMessageAdded]=useState(false)
    useEffect(()=>{
        if(productId){
            const addProduct=async()=>{
                try {
                    setMessageAdded(true)
                    const result=await BasketService.addToBasket(store.user.id, productId, 1)
                    console.log('корзина: ', result)
                    setProductId("")
                    setMessageAdded(true)
                    setTimeout(() => {
                        setMessageAdded(false);
                    }, 3000);
                } catch (error) {
                    console.log('ошибка при добавлении продукта: ', error)
                    
                }
            }
            addProduct()
        }
    }, [productId])
    return(
        <>
         <div className="Body">
            {filteredProducts?.map(product => (
                <div key={product.id} className="productBU">
                    <img src={product.picture} className="img" alt={product.name} onClick={()=>navigate(`/card/${product.id}`)} />
                    <div className="description">
                        <span className="cost">{product.price} коинов</span>
                        <span className="name">{product.name}</span>
                    </div>
                    <button className="inBasket" onClick={()=>setProductId(product.id)}>
                       <span className="wInB"> В корзину</span>
                        </button>
                </div>
            ))}
         </div>
         {messageAdded ? <MessageAdded /> : null}
        </>
    )
}