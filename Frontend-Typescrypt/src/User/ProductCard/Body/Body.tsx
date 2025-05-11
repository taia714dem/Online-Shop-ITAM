import { useNavigate, useParams } from "react-router-dom"
import "./Body.css"
import { useEffect, useState } from "react";
import { Product } from "../../../types";
import ProductService from "../../../ProductService";
import { Loading } from "../../../Loading";
export function Body(){
    const { id } = useParams<Record<string, string | undefined>>();
    const navigate=useNavigate()
    const [product, setProduct] = useState<Product | undefined>(undefined);
    const[isLoading, setIsLoading]=useState(true)
    useEffect(() => {
        const loadProduct = async () => {
          if (id && id !== "new") {
            const result = await ProductService.getProduct(id);
            setIsLoading(false);
            if (result) {
              setProduct(result);
            } else {
              console.error("Продукт не найден");
            }
          }
        };
    
        loadProduct();
      }, [id]);
      if(isLoading){
        return <Loading />
      }
    return(
        <>
         <img className="back" src="/back.svg" onClick={()=>navigate(-1)}/>
         <img className="cardImage" src={product?.picture} />
         <div className="rightPart">
            <div className="upPart">
                <span className="nameCard">{product?.name}</span>
                <div className="coins">
                    <span className="cost1">{product?.price}</span>
                    <img className="icon2U" src="/coins.svg" />
                </div>
            </div>
            <div className="middlePart">
                <div className="description">
                    <span className="wordDesc">Описание:</span>
                    <span className="desc">{product?.description}</span>
                </div>
                <div className="amount">
                    <span className="wordAmt">Количество в наличии.................................</span>
                    <span className="amt">{product?.quantity}</span>
                </div>
                <div className="isUnique">
                    <span className="wordUnq">Уникальность...........................</span>
                    <span className="unq">{product?.uniqueness}</span>
                </div>
            </div>
            <button className="btn">В корзину</button>
         </div>
        </>
    )
}