import "./Footer.css"
export function Footer(){
    return(
    <>
        <div className="Footer">
            <img className="img12" src="itam2024.svg" />
            <div className='authors'>
                <span className='tg'>tg:</span>
                <div className='frontend'>
                    <span className='wFrontend'>Frontend</span>
                    <span className='nFrontend'>@nomatter714</span>
                </div>
                <div className='backend'>
                    <span className='wBackend'>Backend</span>
                    <span className='nBackend'>@nomatter714</span>
                </div>
                <div className='design'>
                    <span className='wDesign'>Design</span>
                    <span className='nDesign'>@takstp</span>
                </div>
            </div>
        </div>
    </>
    )
}