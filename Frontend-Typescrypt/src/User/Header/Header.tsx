import { Input } from "antd";
import {Link} from 'react-router-dom'
import "./Header.css";
interface HeaderProps {
  setSearch: (value: string) => void; // Указываем, что setSearch – это функция, принимающая строку
}
import { useNavigate } from "react-router-dom";
export function Header({setSearch}: HeaderProps){
  function searchChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value);
  }
  const navigate=useNavigate()
  
    return(
    <>
        <div className="header">
        <div className="undHeader">
          <img className="imgItam" src="/itam.svg" />
          <Input className="input"
                    size="large"
                    placeholder="Найти"
                    prefix={
                      <img
                        src="/lupa.svg"
                        alt="Search Icon"
                        className='icon'
                      />
                      
                    }
                    onChange={searchChange}
                  />
                  
            <img className="inventar" src="/inventar.svg" onClick={()=>navigate("/inventar")} />
            <img className="profile" src="/profile.svg" onClick={()=>navigate("/profile")} />
            <img className="basket" src="/basket.svg" onClick={()=>navigate("/basket")} />
        </div>
      </div>
    </>
    )
}