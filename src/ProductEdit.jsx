import './App.css'
import React, {useState} from 'react'
import ProductService from './services/Product'

const ProductEdit = ({setMuokkaustila, setIsPositive, setMessage, setShowMessage, muokattavaProduct}) => {

// Komponentin tilan määritys

//const [newProductId, setNewProductId] = useState('')
const [newProductName, setNewProductName] = useState(muokattavaProduct.productName)
const [newSupplierId, setNewSupplierId] = useState(muokattavaProduct.supplierId)
const [newCategoryId, setNewCategoryId] = useState(muokattavaProduct.categoryId)

const [newQuantityPerUnit, setNewQuantityPerUnit] = useState(muokattavaProduct.quantityPerUnit)
const [newUnitPrice, setNewUnitPrice] = useState(muokattavaProduct.unitPrice)
const [newUnitsInStock, setNewUnitsInStock] = useState(muokattavaProduct.unitsInStock)

const [newUnitsOnOrder, setNewUnitsOnOrder] = useState(muokattavaProduct.unitsOnOrder)
const [newReorderLevel, setNewReorderLevel] = useState(muokattavaProduct.reorderLevel)
const [newDiscontinued, setNewDiscontinued] = useState(muokattavaProduct.discontinued)

const [newImageLink, setNewImageLink] = useState(muokattavaProduct.imageLink)
//const [newCategory, setNewCategory] = useState('')
//const [newSupplier, setNewSupplier] = useState('')

// onSubmit tapahtumankäsittelijä funktio
const handleSubmit = (event) => {
      event.preventDefault()
      var newProduct = {
       productName: newProductName,
       supplierId: parseInt(newSupplierId),
       categoryId: parseInt(newCategoryId),
       quantityPerUnit: newQuantityPerUnit,
       unitPrice: parseFloat(newUnitPrice),
       unitsInStock: parseInt(newUnitsInStock),
       unitsOnOrder: parseInt(newUnitsOnOrder),
       reorderLevel: parseInt(newReorderLevel),
       discontinued: newDiscontinued,
       imageLink: newImageLink
    }
    
    ProductService.update(muokattavaProduct.productId, newProduct)
    .then(response => {
      if (response.status === 200) {
       setMessage("Edited Product: " + newProduct.productName)
       setIsPositive(true)
       setShowMessage(true)
      
       setTimeout(() => {
        setShowMessage(false)
       }, 5000)

       setMuokkaustila(false)
    }

      })
      .catch(error => {
        setMessage(error)
        setIsPositive(false)
        setShowMessage(true)

        setTimeout(() => {
          setShowMessage(false)
         }, 6000)
      })
    }

    const radioChange = (value) => {
        let valinta = value
        if (valinta === "false") {
          setNewDiscontinued(true)
        }
        else {
          setNewDiscontinued(false)
        }
    }

  return (
    <div id="edit">
       <h2>Product Edit</h2>

       <form onSubmit={handleSubmit}>
            <div>
                <label>Product name</label>
        </div>
            <div>
                <input type="text" value={newProductName} placeholder="Product Name"
                    onChange={({ target }) => setNewProductName(target.value)} required />
            </div>
            <div>
                <label>Supplier ID</label>
        </div>
            <div>
                <input type="text" value={newSupplierId} placeholder="Supplier ID"
                    onChange={({ target }) => setNewSupplierId(target.value)} />
            </div>
            <div>
                <label>Category ID</label>
        </div>
            <div>
                <input type="text" value={newCategoryId} placeholder="Category ID"
                    onChange={({ target }) => setNewCategoryId(target.value)} />
            </div>
            <div>
                <label>Quantity Per Unit</label>
        </div>
            <div>
                <input type="text" value={newQuantityPerUnit} placeholder="Quantity per unit"
                    onChange={({ target }) => setNewQuantityPerUnit(target.value)} />
            </div>
            <div>
                <label>Unit Price</label>
        </div>
            <div>
                <input type="text" value={newUnitPrice} placeholder="Unit price"
                    onChange={({ target }) => setNewUnitPrice(target.value)} />
            </div>
            <div>
                <label>Units In Stock</label>
        </div>
            <div>
                <input type="text" value={newUnitsInStock} placeholder="Units in stock"
                    onChange={({ target }) => setNewUnitsInStock(target.value)} />
            </div>
            <div>
                <label>Units On Order</label>
        </div>
            <div>
                <input type="text" value={newUnitsOnOrder} placeholder="Units on order"
                    onChange={({ target }) => setNewUnitsOnOrder(target.value)} />
            </div>
            <div>
                <label>Reorder Level</label>
        </div>
            <div>
                <input type="text" value={newReorderLevel} placeholder="Reorder Level"
                    onChange={({ target }) => setNewReorderLevel(target.value)} />
            </div>
            <div>
            <label>Discontinued</label>
            <div onChange={({target}) => radioChange(target.value)}>
                <input type='radio' name="discontinued" value="true"
                /> False
                <input type='radio' name="discontinued" value="false"
                /> True
                </div>
            </div>
            <div>
                <label>Image Link</label>
        </div>
            <div>
                <input type="text" value={newImageLink} placeholder="Image link"
                    onChange={({ target }) => setNewImageLink(target.value)} />
            </div>
         
         <input type='submit' value='save' />
         <input type='button' value='back' onClick={() => setMuokkaustila(false)} />
       </form>

    </div>
  )
}

export default ProductEdit