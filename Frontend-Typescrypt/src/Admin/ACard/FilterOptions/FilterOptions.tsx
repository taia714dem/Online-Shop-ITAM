import './FilterOptions.css'
interface FilterOptionsProps{
    options: string[];
    selectedOption: string; // Получаем выбранную опцию
    setSelectedOption: (option: string) => void;
}
export function FilterOptions({options, selectedOption, setSelectedOption }:FilterOptionsProps){


    
    const handleOptionClick=(option:string)=>{
        setSelectedOption(option);
    }

    const optionsCount=options.length;
    const containerStyles={
        height: `${optionsCount==2 ? 90 :127}px`,
        top: `${optionsCount==2 ? 575 : 657}px`
    }
    
    
    return(
        <>
           <div className="FilterOptionsA" style={containerStyles}>
                {options.map((option)=>(
                <div key={option} className='option' onClick={()=>handleOptionClick(option)}>
                    <img className="imageOption" src={selectedOption==option ? "/filled.svg" : "/unfilled.svg"} />
                    <span className="wordOption">{option}</span>
                </div>
            ))}
                
           </div>
        </>
    )
}