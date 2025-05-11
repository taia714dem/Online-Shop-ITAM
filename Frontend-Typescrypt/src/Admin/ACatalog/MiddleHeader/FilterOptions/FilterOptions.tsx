import './FilterOptions.css'
import {useState, useEffect} from 'react'
interface FilterOptionsProps{
    options: string[];
    selectedOption: string; // Получаем выбранную опцию
    setSelectedOption: (option: string) => void;
}
export function FilterOptions({options, selectedOption, setSelectedOption }:FilterOptionsProps){
    
    const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768);
    const updateMedia = (e: MediaQueryListEvent) => {
        setIsMobile(e.matches);
    };
    useEffect(() => {
        // Устанавливаем слушатель на изменение ширины окна
        const mediaQuery = window.matchMedia('(max-width: 768px)');
        mediaQuery.addEventListener('change', updateMedia);

        // Инициализация состояния из текущего размера окна
        setIsMobile(mediaQuery.matches);

        // Убираем слушатель при размонтировании
        return () => {
            mediaQuery.removeEventListener('change', updateMedia);
        };
    }, []);


    
    const handleOptionClick=(option:string)=>{
        setSelectedOption(option);
    }

    const optionsCount=options.length;
    const containerStyles={
        width: `${optionsCount==2 ? 220 : 160}px`,
        height: `${optionsCount==2 ? 75 :157}px`,
        marginLeft: `${optionsCount==2 ? 310 : 545}px`
    }
    
        const containerStyles2 = {
            width:`${optionsCount==2 ? 140 : 115}px`, // Изменяем ширину в зависимости от screen size
            height: 'auto', // Высота адаптируется
            marginLeft:'2px',
            position: 'absolute',
            left: `${optionsCount==2 ? 160 : 348}px`,
            top: 65,
            
            
       
    
    }
    
    return(
        <>
           <div className="FilterOptions" style={isMobile ? containerStyles2: containerStyles}>
                {options.map((option)=>(
                <div key={option} className='option' onClick={()=>handleOptionClick(option)}>
                    <img className="imageOption" src={selectedOption==option ? "filled.svg" : "unfilled.svg"} />
                    <span className="wordOption">{option}</span>
                </div>
            ))}
                
           </div>
        </>
    )
}