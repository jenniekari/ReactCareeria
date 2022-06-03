import './App.css'
import React, {useState, useEffect} from 'react'
import ProductService from './services/Product'
import Product from './Products'
import ProductAdd from './ProductAdd'
import ProductEdit from './ProductEdit'

const ProductList = ({setMessage, setIsPositive, setShowMessage}) => {

// Komponentin tilojen ja sitä muuttavien set metodien määritys, sekä alustaminen.
const [products, setProducts] = useState([])
const [showProducts, setShowProducts] = useState(false)
const [lisäystila, setLisäystila] = useState(false)
const [muokkaustila, setMuokkaustila] = useState(false)
const [reload, reloadNow] = useState(false)
const [muokattavaProduct, setMuokattavaProduct] = useState(false)
const [search, setSearch] = useState("")

// UseEffect ajetaan aina alussa kerran
useEffect(() => {
    //Luetaan token localstoragesta
    /*const token = localStorage.getItem('token')
    ProductService
    //Tehdään get pyyntö käyttäen CustomerServicen
    .setToken(token)*/

  ProductService.getAll()
  .then(data => {
    setProducts(data)
        })
    },[lisäystila, reload, muokkaustila] // Nämä statet jos muuttuu niin useEffect() ajetaan uudestaan
  )

  //Hakukentän onChange tapahtumankäsittelijä
const handleSearchInputChange = (event) => {
    setShowProducts(true)
    setSearch(event.target.value.toLowerCase())
}

const editProduct = (product) => {
  setMuokattavaProduct(product)
  setMuokkaustila(true)
}

  return (
        <>
            <h1><nobr style={{ cursor: 'pointer' }}
            onClick={() => setShowProducts(!showProducts)}>Products</nobr>

            {lisäystila && <ProductAdd setLisäystila={setLisäystila} 
            setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} />}
            
            {!lisäystila && <button className="nappi" onClick={() => setLisäystila(true)}>Add new</button>}</h1>

            {!lisäystila && !muokkaustila &&
            <input placeholder="Search by Product Name" value={search} onChange={handleSearchInputChange} />
            }

            {muokkaustila && <ProductEdit setMuokkaustila={setMuokkaustila} 
                setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
                muokattavaProduct={muokattavaProduct}
                />}

            {!lisäystila && !muokkaustila &&
            <table id="userTable">
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Supplier ID</th>
                        <th>Category ID</th>
                        <th>Quantity Per Unit</th>
                        <th>Price</th>
                        <th>In Stock</th>
                        <th>On Order</th>
                        <th>Reorder Level</th>
                        <th>Discontinued</th>
                        <th>Image Link</th>
                    </tr>
                </thead>
                <tbody>

        
                {/*!lisäystila && !muokkaustila && showProducts && */products && products.map(u =>
                {
                    const lowerCaseName = u.productName.toLowerCase()
                    if (lowerCaseName.indexOf(search) > -1) {
                        return(
                            <tr key={u.productId}>
                                <td>{u.productName}</td>
                                <td>{u.supplierId}</td>
                                <td>{u.categoryId}</td>
                                <td>{u.quantityPerUnit}</td>
                                <td>{u.unitPrice}</td>
                                <td>{u.unitsInStock}</td>
                                <td>{u.unitsOnOrder}</td>
                                <td>{u.reorderLevel}</td>
                                <td>{String(u.discontinued)}</td>
                                <td>{u.imageLink}</td>
                                <Product key={u.productId} product={u} reloadNow={reloadNow} reload={reload}
                            setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
                            editProduct={editProduct}
                            />
                            </tr>
                                )
                            }
                        }
                    )
                }

                </tbody>

            </table>
            }
         </>
        )
    }

export default ProductList