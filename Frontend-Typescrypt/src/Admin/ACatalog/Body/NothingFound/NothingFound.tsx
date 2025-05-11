import { useNavigate } from "react-router-dom"
import "./NothingFound.css"
export function NothingFound(){
    const navigate=useNavigate();

    return(
    <>
        <div className="NothingFound">
            <div className="box">
                <span className="message">Ни один товар еше не был добавлен</span>
                <button className="addGoodBtn" onClick={()=>navigate('/admin/AddProduct/new')}>
                    <img src="addG2.svg" />
                </button>
            </div>

        </div>
    </>
    )
}