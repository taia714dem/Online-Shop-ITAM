import { useNavigate } from "react-router-dom";
import "./ABody.css"
import { Product } from "../../../types";
interface BodyProps{
    filteredProducts: Product[] | undefined;
    setIsDeleteOn: (d:boolean)=>void;
    setId:(i:string)=>void;
}
 
export function Body({filteredProducts, setIsDeleteOn, setId}:BodyProps){
    const navigate=useNavigate();
    
    function DeleteOnClick(id:string | undefined){
        setIsDeleteOn(true)
        if(id){
            setId(id)
        }
    }
    return(
        <>
         <div className="Body">
            {filteredProducts?.map(product => (
                <div key={product.id} className="productAD" >
                    <img src={product.picture} className="img" alt={product.name} onClick={() => navigate(`addProduct/${product.id}`)} />
                    <div className="description">
                        <span className="cost">{product.price} коинов</span>
                        <span className="name">{product.name}</span>
                    </div>
                    <button className="Redact" onClick={() => navigate(`addProduct/${product.id}`)}>Редактировать</button>
                    <button className="deleteBtn" onClick={()=>DeleteOnClick(product.id)}>
                        <img src="delete2.svg" />
                    </button>
                </div>
            ))}
         </div>
        </>
    )
}