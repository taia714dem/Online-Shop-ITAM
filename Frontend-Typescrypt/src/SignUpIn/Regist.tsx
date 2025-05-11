import { useContext, useEffect, useState } from "react";
import { Header } from "../User/Header/Header";
import { Footer } from "../User/Footer/Footer";
import "./SignUpIn.css";
import { observer } from "mobx-react-lite";
import { Context } from "../main";
import { Navigate, useNavigate } from "react-router-dom";
import { Loading } from "../Loading";
import { ToActivate } from "../authLogic/ToActivate/ToActivate";
function Regist() {
  const [search, setSearch] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const [activationMessage, setActivationMessage]=useState(false);
  const {store}=useContext(Context)
    const [isAuthChecked, setIsAuthChecked]=useState(false);
    useEffect(()=>{
        const checkAuth=async()=>{
            await store.checkAuth();
            setIsAuthChecked(true);
        }
        checkAuth()
    }, [store])
    if(!isAuthChecked){
        return <Loading />
    }
    if(store.isAuth){
      return <Navigate to='/' />
  }
  
  
  return (
    <>
      <Header setSearch={setSearch} />
      <div className="body">
        <div className="box">
          <div className="box2">
            <span className="mesg1">Создайте аккаунт</span>
            <div className="lowMesg">
              <span className="greyQuest">Уже есть аккаунт?</span>
              <span className="whiteAnsw" onClick={() => navigate("/login")}>
                Войти
              </span>
            </div>
            <div className="inputs">
              <input
                value={email}
                className="input1"
                placeholder="Почта"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                value={password}
                className="input2"
                type="password"
                placeholder="Пароль"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="buttons">
              <button
                className="whiteButt"
                onClick={async() => {
                  setActivationMessage(true)
                  await store.registration(email, password);
                }}
              >
                Готово
              </button>
              <button className="small" onClick={()=>navigate('/adminEntrance')}>Войти как админ</button>
            </div>
          </div>
        </div>
      </div>
      {activationMessage ? <ToActivate /> : null}
      <Footer />
    </>
  );
}

export default observer(Regist);
