import { useContext, useState } from "react";
import "./SignUpIn.css";
import { Footer } from "../User/Footer/Footer";
import { Header } from "../User/Header/Header";
import { Context } from "../main";
import { useNavigate } from "react-router-dom";
export function Profile() {
  const [search, setSearch] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { store } = useContext(Context);
  const navigate=useNavigate()
  return (
    <>
      <Header setSearch={setSearch} />
      <div className="body">
        <div className="box">
          <div className="box2">
            <span className="mesg1">Ваш аккаунт</span>
            <div className="inputs">
              <span className="emailW">Почта</span>
              <input
                className="input1"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Корпоративная почта"
              />
              <span className="passW">Пароль</span>
              <input
                className="input2"
                value={password}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Пароль"
              />
            </div>
            <div className="buttons">
              <button className="whiteButt" onClick={() => {store.logout();
                navigate('/login')
              }}>Выйти</button>
              <button className="small">Удалить аккаунт</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

