import { useContext, useEffect, useState } from "react";
import { Header } from "../User/Header/Header";
import { Footer } from "../User/Footer/Footer";
import "./SignUpIn.css";
import { Context } from "../main";
import { Navigate, useNavigate } from "react-router-dom";
import { Loading } from "../Loading";
import { WrongEntrance } from "./WrongEntrance/WrongEntrance";
export function EnterAsAdmin() {
  const [search, setSearch] = useState("");
  const { store } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notAdmin, setNotAdmin]=useState(false);
  const navigate = useNavigate();
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  useEffect(() => {
    const checkAuth = async () => {
      await store.checkAuth();
      setIsAuthChecked(true);
    };
    checkAuth();
  }, [store]);
  if (!isAuthChecked) {
    return <Loading />;
  }
  if (store.isAuth && store.user.role=='admin') {
    return <Navigate to="/admin" />;
  } 
  return (
    <>
      <Header setSearch={setSearch} />
      <div className="body">
        <div className="box">
          <div className="box2">
            <span className="mesg1">Войдите в админ-панель</span>
            <div className="inputs">
              <input
                className="input1"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Корпоративная почта"
              />
              <input
                className="input2"
                value={password}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Пароль"
              />
            </div>
            <div className="buttons">
              <button
                className="whiteButt"
                onClick={async () => {
                  await store.login(email, password);
                  if (store.isAuth && store.user.role=='admin') {
                    navigate("/admin");
                  } else if(store.user.role!='admin'){
                        setNotAdmin(true)
                  }
                }}
              >
                Войти
              </button>
              <button className="small" onClick={()=>navigate('/login')}>Войти как пользователь</button>
              
            </div>
          </div>
        </div>
      </div>
      {notAdmin ? <WrongEntrance /> : null}
      <Footer />
    </>
  );
}
