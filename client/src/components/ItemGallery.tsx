import {useState, useEffect} from 'react';

type GalleryProps = {
    sku: string,
    images: string[]
}
const imagePath = `https://i.ibb.co/`

const ItemGallery = ({sku, images}: GalleryProps) => {
    const [main, setMain] = useState(images[0])
    
    const handleSelect = (img: string) => {
        setMain(img)
    }


    return (
        <div id='itemGallery'>
            
            <img id='itemImg' src={`${imagePath}${main}`} 
                alt={`Imagine a beatiful pot`} />
            <div id='thumbGallery'>
                { images.map( img => 
                <ImgThumb key={img} sku={sku} img={img} 
                    onSelect={handleSelect} main={main}/> ) }
            </div>
        </div>
    )
}

type ThumbProps = {
    sku: string,
    img: string, 
    onSelect: (img: string) => void,
    main: string
}
const ImgThumb = ( {sku, img, onSelect, main}: ThumbProps ) => {

    const [isActive, setIsActive] = useState(false)
    const [isHover, setIsHover] = useState(false)
    const onHover = () => { setIsHover(!isHover)}
    const handleSelect = () => { onSelect(img) }

    useEffect(()=>{
        img == main ? setIsActive(true) : setIsActive(false)
    },[isHover,main])

    const style = {
        opacity: (isHover || isActive) ? '.5' : '1'
    }
    
    return (
        <>
        <img key={img} src={`${imagePath}${img}`} 
            alt={`Imagine a beatiful pot`} 
            style={style} onClick={handleSelect} 
            onMouseOver={onHover} onMouseOut={onHover} /> 
        </>
    )
}

export default ItemGallery;