import { useContext, useEffect, useState } from "react";
import { Header } from "../User/Header/Header";
import { Footer } from "../User/Footer/Footer";
import "./SignUpIn.css";
import {observer} from 'mobx-react-lite'
import { Context } from "../main";
import { Navigate, useNavigate } from "react-router-dom";
import { Loading } from "../Loading";
function Enter() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [search, setSearch] = useState("");
  const { store } = useContext(Context);
  const navigate=useNavigate()

  
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
            <span className="mesg1">Войдите в аккаунт</span>
            <div className="lowMesg">
              <span className="greyQuest">Нет аккаунта?</span>
              <span className="whiteAnsw" onClick={()=>navigate('/registration')}>Регистрация</span>
            </div>
            <div className="inputs">
              <input
                value={email}
                className="input1"
                placeholder="Корпоративная почта"
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
                onClick={async() => {await store.login(email, password)
                  if(store.isAuth){
                    navigate('/')
                  }
                }}
              >
                Войти
              </button>
              <button className="small" onClick={()=>navigate('/adminEntrance')}>Войти как админ</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default observer(Enter)
