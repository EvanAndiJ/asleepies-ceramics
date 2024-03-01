import {useState, useEffect} from 'react';

type GalleryProps = {
    sku: string,
    images: string[]
}
const imagePath = `../img/`

const ItemGallery = ({sku, images}: GalleryProps) => {
    const [main, setMain] = useState(images[0])
    
    const handleSelect = (img: string) => {
        setMain(img)
    }


    return (
        <div id='itemGallery' className=''>
            
            <img id='itemImg' src={`${imagePath}${main}.png`} 
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
    const handleSelect = () => { onSelect(img) }

    useEffect(()=>{
        img == main ? setIsActive(true) : setIsActive(false)
    },[main])

    return (
        <>
        <img key={img} src={`${imagePath}${img}.png`} 
            alt={`Imagine a beatiful pot`} 
            style={isActive ? { opacity: '.5'} : {}} 
            onClick={handleSelect} /> 
        </>
    )
}

export default ItemGallery;