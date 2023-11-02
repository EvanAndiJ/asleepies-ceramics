import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import useToken from '../hooks/useToken';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { SkuInfo, ImageEditProps, ImageThumbProps } from '../types';


var categories: {[key: string]: string} = { Vase: 'vas', Pot: 'pot', Mug: 'mug', Cup: 'cup', 
      Bowl: 'bwl', Dish: 'dsh', Plate: 'plt', Jar: 'jar', Misc: 'msc'
}

function EditItem({item}: {item: SkuInfo}) {
  const {token} = useToken()
  const navigate = useNavigate()
  const [showAlert, setShowAlert] = useState(false)
  const [alert, setAlert] = useState()
  
  const [sku, setSku] = useState(item.sku)
  const [price, setPrice] = useState(item.price)
  const [title, setTitle] = useState(item?.title)
  const [desc, setDesc] = useState(item?.desc)
  const [stock, setStock] = useState(item.stock)
  const [weight, setWeight] = useState(10)
  const [cat, setCat] = useState('')

  const [images, setImages] = useState<string[]>([])
  const [imgLinks, setImgLinks] = useState<string>('')
  const [newImages, setNewImages] = useState<string[]>([])
  const [delImages, setDelImages] = useState<string[]>([])

  const getImages = () => {
    fetch(`/api/images/${sku}`, {
      method: 'POST',
      headers: {
        'content-type':'application/json',
      }
    }).then(res => res.json())
    .then(res => setImages(res.images))
  }
  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const f = event.target.name
    const edit = event.target.value
    switch(f) {
      case 'sku': setSku(edit)
        break;
      case 'price': setPrice(Number(edit))
        break;
      case 'title': setTitle(edit)
        break;
      case 'desc': setDesc(edit)
        break;
      case 'stock': setStock(Number(edit))
        break;
      case 'weight': setWeight(Number(edit))
        break;
      case 'cat': setCat(categories[edit])
        break;
      case 'imgLinks': setImgLinks(edit)
        break;
    }
  }
  const saveItem = async () => {
    let links: string[] = [];
    if (imgLinks) {
      links = imgLinks.trim().split(',')
      if (!links[links.length-1]) {links.pop()}
      links.forEach((link, n) => {
        let i = link[0];
        while (i === `\n` || i === ` `) {
          link = link.substring(1)
          i = link[0]
        }
        links.splice(n, 1, link)
      })
      setNewImages(links)

    }
    const newInfo = {
      id: item.id,
      sku: sku,
      price: price,
      title: title.trim(),
      desc: desc.trim(),
      stock: stock,
      weight: weight,
      cat: cat
    }
    const body = {newInfo, newImages: links, delImages}
    await fetch('/api/editItem', {
      method: 'POST',
      headers: {
        'content-type':'application/json',
        "x-access-token": token
      },
      body: JSON.stringify(body)
    })
    .then(res => res.json())
    .then(res => { 
      if (res.edited) {
        if (newImages.length || delImages.length || imgLinks) {
          setNewImages([])
          setDelImages([])
          setImgLinks('')
          getImages()
        }
      } 
      setAlert(res.message)
      setShowAlert(true)
        window.setTimeout(()=>{
          setShowAlert(false)
        },900)
    })
  }
  useEffect(()=>{ 
    getImages()
   }, [])
  const [confirmDelete, setConfirmDelete] = useState(false);
  const toglConfirmDelete = () => { setConfirmDelete(!confirmDelete)};

  const onDelete =  async () => {
    await fetch('/api/deleteItem', {
      method: 'POST',
      headers: {
        'content-type':'application/json',
        "x-access-token": token
      },
      body: JSON.stringify({sku:sku})
    }).then(res => res.json())
    .then(res=> {
      if (res.removed) {
        toglConfirmDelete()
        navigate(0)
      }
    })
  }

  return (
    <Card className='itemEdit'>
      
      <Alert variant="dark" className="dashboardAlert"
        show={showAlert}> {alert} </Alert>

        <ImageEdit images={images} staging={{newImages, setNewImages, imgLinks, handleChange}}
          onDelete={{delImages, setDelImages}}/>

        <div id='itemInfoInput' >
          <label style={{margin:'0 1em'}}>Title:
            <input type="text" value={title} name="title"
              style={{width:'100%'}}
              onChange={handleChange} />
          </label>
          <label style={{margin:'0 1em'}}>Description: 
            <textarea value={desc} name="desc"
              style={{width:'100%'}}
              onChange={handleChange} />
          </label>
              
          <div style={{margin:'auto'}}>
            <label >Sku:
              <input type="text" value={sku} name="sku"
                style={{width:'4em',margin:'0 .25em'}}
                onChange={handleChange}/></label>
            <label>Category:
              <select name='cat' 
                style={{margin:'0 .25em'}}
                onChange={handleChange}>
                <option>---------</option>
                {Object.keys(categories).map((cat) => (
                  <option value={cat} key={`${cat}`}>{cat}</option>
                  ))}
              </select></label>
          </div>
          <div style={{margin:'auto'}}>
            <label>Price:
              <input type="number" value={price} name="price"
                style={{width:'2.5em',margin:'0 .25em'}}
                onChange={handleChange}/></label>
            <label>Stock:
              <input type="number" value={stock} name="stock"
                style={{width:'2.5em', margin:'0 .25em'}}
                onChange={handleChange}/></label>
            <label>Weight:
              <input type="number" name="weight"
              style={{width:'2.5em',margin:'0 .25em'}}
                value={weight} onChange={handleChange}
              /></label>
          </div>
        </div>
      {/* </div> */}
      
      <div>
        <button onClick={saveItem} className="editButtons">Save</button>
        <button onClick={toglConfirmDelete} className="editButtons">Delete</button>
      </div>
      <Modal show={confirmDelete} onHide={toglConfirmDelete}>
        <Modal.Header>
          Delete {`${sku}`}?
        </Modal.Header>
        <Modal.Footer>
          <button onClick={onDelete}>
            Delete </button>
          <button onClick={toglConfirmDelete}>
            Cancel </button>
        </Modal.Footer>
      </Modal>
    </Card>
  );
}

function ImageEdit({images, staging, onDelete}: ImageEditProps) {
  
  const {newImages, setNewImages, imgLinks, handleChange} = staging
  const {delImages, setDelImages} = onDelete
  
  const [inType, setInType] = useState(true)
  const toglInType = () =>  setInType(!inType)

  const handleNewImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    const filenames: string[] = []
    if (files) {
      Object.values(files).forEach((v) => {  
      filenames.push(v.name)  
      })
      setNewImages(filenames)
    }
  }
  const handleDel = (event: React.MouseEvent<HTMLButtonElement>) => {
    const img = event.currentTarget.name
    const newDel = [...delImages, img]
    setDelImages(newDel)
  }
  const cancelDel = (event: React.MouseEvent<HTMLButtonElement>) => {
    const img = event.currentTarget.name
    const newDel = delImages.filter(
      i => i !== img)
    setDelImages(newDel)
  }
  
  
  return (
    <>
    <div style={{display:'flex', margin: '1em'}}>
      {images ?
            images.map(img => (
              <div key={img} >
                <ImageThumb filename={img} del={{handleDel, cancelDel}}/>
              </div>
            ))
      : null}
      {newImages.length ? newImages.map(
              img => (
              <div key={img} style={{display:'flex'}}>
                <ImageThumb filename={img} del={{handleDel, cancelDel}}/>
              </div>
            ))
      : null}
    </div>

    <ButtonGroup aria-label="Basic example">
        <Button variant="secondary" onClick={toglInType} disabled={inType}>Links</Button>
        <Button variant="secondary" onClick={toglInType} disabled={!inType}>Upload</Button>
    </ButtonGroup>
    <p style={{marginBottom: '0'}}>{inType ?  'Image links:' : 'Upload:' }</p>

    <div id='addImgThumb' style={{width:'100%'}}>
      { inType ? 
        <textarea name='imgLinks' id='imgLinks' style={{width:'80%', margin:'0 1em'}}
          value={imgLinks} onChange={handleChange}/>
      : <>
        <input name='fileSelect' id='fileSelect' type='file' multiple={true} onChange={handleNewImage} />
        </>
      }
    </div>
    </>
  );
}
function ImageThumb({del, filename}: ImageThumbProps) {
  const {handleDel, cancelDel} = del
  const [isRemove, setIsRemove] = useState(false)
  const style = {
    opacity: isRemove ? '.5' : '1'
  }

  const toDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (isRemove) {
      setIsRemove(false)
      cancelDel(event)
    } else {
      setIsRemove(true)
      handleDel(event)
    }
  }
  const imagePath = 'https://i.ibb.co/'
    
  return (
    <>
    <img src={`${imagePath}${filename}`} 
      style={style} className="editItemImg"/>
      
    <button name={`${filename}`} onClick={toDelete} className="imgThumbCancel">x</button>
    </>
  )
}


export default EditItem;



