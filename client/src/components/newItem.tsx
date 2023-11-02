import React, { useState } from 'react' 
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';

import useToken from '../hooks/useToken';
var categories: {[key: string]: string} = {
  Vase: 'vas', Pot: 'pot', Mug: 'mug', Cup: 'cup', 
  Bowl: 'bwl', Dish: 'dsh', Plate: 'plt', Jar: 'jar', Misc: 'msc' }

const NewItem = () => {
    const {token} = useToken()
    const [showAlert, setShowAlert] = useState(false)
    const [alert, setAlert] = useState('Item Added!')

    const [sku, setSku] = useState('')
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [price, setPrice] = useState(10)
    const [stock, setStock] = useState(1)
    const [weight, setWeight] = useState(10)
    const [cat, setCat] = useState('')
    const [newImages, setNewImages] = useState<string[]>([])


    const handleEdit = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        event.preventDefault()
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
          case 'weight' : setWeight(Number(edit))
            break;
          case 'cat' : setCat(categories[edit])
        }
    }
    const handleNewImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files
      const filenames:  string[] = []
      if (files) {
        Object.entries(files).forEach(([k,v]) => {  
        filenames.push(v.name)
      })
      setNewImages(filenames)
      }
    }
    const cancelImage = (event: React.MouseEvent<HTMLButtonElement>) => {
        const toDel = event.currentTarget.name
        const newList = newImages.filter(img => img != toDel)
        setNewImages(newList)
    }
    const saveItem = async () =>{
      const newInfo = {
        sku: sku,
        title: title.trim(),
        desc: desc.trim(),
        price: price,
        stock: stock,
        weight: weight,
        cat: cat,
        images: newImages
      }
      return fetch('/api/addItem', {
        method: 'POST',
        headers: {
          'content-type':'application/json',
          "x-access-token": token
        },
        body: JSON.stringify(newInfo)
      }).then(res => res.json())
      .then(jsonRes => {
        if (jsonRes.added) {
          
          setAlert('Item Added!')
          setShowAlert(true)
          window.setTimeout(()=>{
            setShowAlert(false)
          },750)

          setSku('')
          setTitle('')
          setDesc('')
          setPrice(10)
          setStock(1)
          setWeight(10)
          setCat('')
          setNewImages([])
        } else {

          setAlert('Sku already exists!')
          setShowAlert(true)
          window.setTimeout(()=>{
            setShowAlert(false)
          },850)
        }
      })
    }
  const imagePath = 'https://i.ibb.co/'

    return (<>
      <Card className='itemEdit'>

        <Alert variant="dark" className="dashboardAlert"
        show={showAlert}> {alert} </Alert>

        <div style={{display:'flex', flexDirection:'column'}}>

          <div id="addImgThumb">

            <input name='fileSelect' id='fileSelect'
              type='file' multiple={true} onChange={handleNewImage} />
            
            {newImages.length ? <div style={{display: 'flex'}}>
                { newImages.map( (img: string) => (
                    <div key={img} style={{display:'flex'}}>
                      <img className="editItemImg" src={`${imagePath}${img}`} />
                      <button name={`${img}`} onClick={cancelImage}>x</button>
                    </div>
                ))}
              </div>
            : null}

          </div>

          <div id="itemInfoInput">
            <label>Title:
              <input type="text" name="title" value={title}
              style={{width:'100%'}}
              onChange={handleEdit}/></label>
            <label>Description:
              <textarea name="desc" value={desc}
              style={{width:'100%'}}
              onChange={handleEdit}/></label>
          
            <div>
              <label>Sku:
                <input type="text" name="sku" value={sku}
                style={{width:'4em',margin:'0 .25em'}}
                onChange={handleEdit}/></label>
              <label>Category
                <select name='cat'
                style={{margin:'0 .25em'}}
                onChange={handleEdit}>
                <option>--Category--</option>
                {Object.keys(categories).map((cat) => (
                    <option value={cat} key={`${cat}`}>{cat}</option>
                ))}
              </select></label>
            </div>

            <div>
              <label>Price:
                  <input type="number" name="price" value={price}
                  style={{width:'2.5em',margin:'0 .25em'}}
                  onChange={handleEdit}/></label>
              <label>Stock:
                  <input type="number" name="stock" value={stock}
                  style={{width:'2.5em', margin:'0 .25em'}}
                  onChange={handleEdit}/></label>
              <label>Weight:
                  <input type="number" name="weight"  value={weight}
                  style={{width:'2.5em',margin:'0 .25em'}}
                  onChange={handleEdit}/></label>
            </div>
          </div>
        </div>
        <button onClick={saveItem} className="editButtons">Save</button>
      </Card>
      </>
    )
}

export default NewItem;

