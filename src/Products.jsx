import './App.css'
import React, {useState} from 'react'
import ProductService from './services/Product'

const Product = ({product, editProduct, setIsPositive, setMessage, setShowMessage, reload, reloadNow}) => {

//Komponentin tilan määritys
const [showDetails, setShowDetails] = useState(false)

const deleteProduct = (product) => {
    let vastaus = window.confirm("Do you want to remove product: " + product.productName + " ?")
    if (vastaus === true){

    ProductService.remove(product.productId)
    .then(res =>{
        if (res.status === 200){
            setMessage(`Successfully removed product ${product.productName}`)
            setIsPositive(true)
            setShowMessage(true)        
            //Scrollataan ylös jotta nähdään alert
            window.scrollBy(0, -10000)

            //Ilmoituksen piilotus
            setTimeout(() => {
            setShowMessage(false)},
            5000 //millisekunteina aika, eli 0,5 sekuntia
            )
            reloadNow(!reload)
            }
            
                }
            )
            .catch(error => {
                setMessage(error)
                setIsPositive(false)
                setShowMessage(true)
                window.scrollBy(0, -10000)
        
                setTimeout(() => {
                  setShowMessage(false)
                 }, 6000)
              })
    
        } //Jos poisto halutaankin perua
        else {
        setMessage('Delete cancelled.')
            setIsPositive(true)
            setShowMessage(true)
            window.scrollBy(0, -10000)
    
            //Ilmoituksen piilotus
            setTimeout(() => {
            setShowMessage(false)},
            5000
            )
        }
    }

  return (
    <div className='productDiv'>
        
       <h4 onClick={() => setShowDetails(!showDetails)}>
           Buttons
        </h4>

       {showDetails && <div className="productDetails">
                <button className="button2" onClick={() => editProduct(product)}>Edit</button>
                <button className="button2" onClick={() => deleteProduct(product)}>Delete</button>
                {/*<table>
                    <thead>
                        <tr>
                            <th>Product name</th>
                            <th>Supplier Id</th>
                            <th>Category Id</th>
                            <th>Quantity per unit</th>
                            <th>Unit price</th>
                            <th>Units on order</th>
                            <th>Reorder level</th>
                            <th>Discontinued</th>
                            <th>Imagelink</th>
                            <th>Category</th>
                            <th>Supplier</th>
                            <th>Order details</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{product.productName}</td>
                            <td>{product.supplierId}</td>
                            <td>{product.categoryId}</td>
                            <td>{product.quantityPerUnit}</td>
                            <td>{product.unitPrice}</td>
                            <td>{product.unitsOnOrder}</td>
                            <td>{product.reorderLevel}</td>
                            <td>{product.discontinued}</td>
                            <td>{product.imageLink}</td>
                            <td>{product.category}</td>
                            <td>{product.supplier}</td>
                            <td>{product.orderDetails}</td>
                        </tr>
                    </tbody>
  </table>*/}
                </div>}
    </div>
  )
}

export default Product