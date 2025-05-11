import { Input } from "antd";
import { useNavigate } from "react-router-dom";
import "./Header.css";
interface HeaderProps {
  setSearch: (value: string) => void; // Указываем, что setSearch – это функция, принимающая строку
}

export function Header({setSearch}: HeaderProps){
  function searchChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value);
  }
  const navigate=useNavigate();
  
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
                  
            
            <img className="profile" src="/profile.svg" onClick={()=>navigate("/profile")} />
            
        </div>
      </div>
    </>
    )
}