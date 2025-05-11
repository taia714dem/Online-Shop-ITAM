import "./OrderProcess.css"
interface ErrorProps{
    setError: (e:boolean)=>void;
}
export function Error({setError}:ErrorProps){
    function Close(){
        setError(false)
    }
    return(
    <>
    <div className="overlay" />
        <div className="Error">
            <div className="ErrorBox">
                <span className="mesgH">Ошибка</span>
                <span className="mesg3">Недостаточно коинов для покупки</span>
                <button className="ok" onClick={Close}>Ок</button>
            </div>
        </div>
    </>
    )
}