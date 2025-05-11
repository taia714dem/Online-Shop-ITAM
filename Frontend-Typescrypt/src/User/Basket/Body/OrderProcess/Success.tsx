import "./OrderProcess.css"
import {Link} from 'react-router-dom'
interface SuccessProps{
    setSuccess: (s:boolean)=>void;
}

export function Success({setSuccess}:SuccessProps){
    return(
    <>
    <div className="overlay" />
    <div className="success">
        <div className="successBox">
            <span className="messageConf">Заказ подтверждён!</span>
            <span className="mesg22">Информация придет вам на почту</span>
            <Link to="/"><button className="inCatalog">В каталог</button></Link>
        </div>
    </div>
    </>)
}