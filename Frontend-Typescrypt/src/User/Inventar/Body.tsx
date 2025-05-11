import { Inventar2} from "../../types"
import "./Body.css"
interface BodyProps{
    filteredProducts: Inventar2[] | undefined
}
export function Body({filteredProducts}:BodyProps){
    
    
    
    return(
        <>
         <div className="Body">
            {filteredProducts?.map(product => (
                <div key={product.productId} className="productIN">
                    <div className="imgIN">
                        <img src={product.picture ? product.picture : "image.svg"} className="img" alt={product.name} />
                        <img src="InvImg.svg" className="InvImg" />
                    </div>
                    <div className="description">
                        <span className="cost">{product.price} коинов</span>
                        <span className="name">{product.name}</span>
                    </div>
                    
                </div>
            ))}
         </div>
        </>
    )
}