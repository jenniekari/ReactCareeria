import './App.css'
import React, {useState} from 'react'
import ProductService from './services/Product'

const ProductAdd = ({setLisäystila, setIsPositive, setMessage, setShowMessage}) => {

// Komponentin tilan määritys

//const [newProductId, setNewProductId] = useState('')
const [newProductName, setNewProductName] = useState('')
const [newSupplierId, setNewSupplierId] = useState('')
const [newCategoryId, setNewCategoryId] = useState('')

const [newQuantityPerUnit, setNewQuantityPerUnit] = useState('')
const [newUnitPrice, setNewUnitPrice] = useState('')
const [newUnitsInStock, setNewUnitsInStock] = useState('')

const [newUnitsOnOrder, setNewUnitsOnOrder] = useState('')
const [newReorderLevel, setNewReorderLevel] = useState('')
const [newDiscontinued, setNewDiscontinued] = useState(false)

const [newImageLink, setNewImageLink] = useState('')
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
    
    ProductService.create(newProduct)
    .then(response => {
      if (response.status === 200) {
       setMessage("Added new Product: " + newProduct.productName)
       setIsPositive(true)
       setShowMessage(true)
      
       setTimeout(() => {
        setShowMessage(false)
       }, 5000) //5 sekuntia

       setLisäystila(false)
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
    <div id="addNew">
       <h2>Product add</h2>

       <form onSubmit={handleSubmit}>
            <div>
                <input type="text" value={newProductName} placeholder="Product name"
                    onChange={({ target }) => setNewProductName(target.value)} required />
            </div>
            <div>
                <input type="number" value={newSupplierId} placeholder="Supplier ID"
                    onChange={({ target }) => setNewSupplierId(target.value)} />
            </div>
            <div>
                <input type="number" value={newCategoryId} placeholder="Category ID"
                    onChange={({ target }) => setNewCategoryId(target.value)} />
            </div>
            <div>
                <input type="number" value={newQuantityPerUnit} placeholder="Quantity per unit"
                    onChange={({ target }) => setNewQuantityPerUnit(target.value)} />
            </div>
            <div>
                <input type="number" step="any" value={newUnitPrice} placeholder="Unit price"
                    onChange={({ target }) => setNewUnitPrice(target.value)} />
            </div>
            <div>
                <input type="number" value={newUnitsInStock} placeholder="Units in stock"
                    onChange={({ target }) => setNewUnitsInStock(target.value)} />
            </div>
            <div>
                <input type="number" value={newReorderLevel} placeholder="Reorder Level"
                    onChange={({ target }) => setNewReorderLevel(target.value)} />
            </div>
            <div>
                <input type="number" value={newUnitsOnOrder} placeholder="Units on order"
                    onChange={({ target }) => setNewUnitsOnOrder(target.value)} />
            </div>
            <div>
                <label for="checkId" className="labelD">Discontinued</label>
                <div onChange={({target}) => radioChange(target.value)}>
                <input type='radio' name="discontinued" value="true"
                /> False
                <input type='radio' name="discontinued" value="false"
                /> True
                </div>
                
                {/*<input type="checkbox" id="checkId" value={newDiscontinued} //placeholder="Discontinued"
                    onChange={({ target }) => setNewDiscontinued(target.value)}/>            </div>
  <div>*/}
                <input type="text" value={newImageLink} placeholder="Image link"
                    onChange={({ target }) => setNewImageLink(target.value)} />
            </div>
         
         <input type='submit' value='save' />
         <input type='button' value='back' onClick={() => setLisäystila(false)} />
       </form>

    </div>
  )
}

export default ProductAdd