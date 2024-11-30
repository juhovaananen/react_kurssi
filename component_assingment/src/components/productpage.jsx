import { useState, useEffect } from 'react'
import '../App.css'
import logo from '../assets/MBMIlogo.png'

function Header() {

  const headertext = 'Welcome to product page!'

  return (
    <div className='header'>
      <img src={logo} />
      <h1>{headertext}</h1>
    </div>
  )
}

function ProductForm() {

  const [product, setProduct] = useState(' ')
  const [price, setPrice] = useState(null)
  const [st, setSt] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)

  const products = [
    { name: "Wooden Hook 3mm", price: 7.90 },
    { name: "Wooden Needles 4mm", price: 10.80 },
    { name: "Cotton-merino 50g", price: 4.90 },
    { name: "Kid-Silk 50g", price: 6.90 },
    { name: "Merino Extra Fine 50g", price: 4.90 }
  ]

  const handleChange = (event) => {
    const selectedProduct = products.find(p => p.name === event.target.value)
    setProduct(selectedProduct.name)
    setPrice(selectedProduct.price)
    setSt(1)
  }

  useEffect(() => {
    setTotalPrice(price * st)
  }, [price, st]);

  return (
    <div>
      <h3>Select product</h3>
      <div className='product'>
        <p>Product: </p>
        <select value={product} onChange={handleChange}>
          <option value=" " disabled>Choose a product</option>
            {
              products.map(p => <option key={p.name} value={p.name}>{p.name} ({p.price})€</option>)
            }
        </select>
      </div>
      <div className='quantity'>
        <p>Quantity: </p>
        <button onClick={() => setSt(prev => prev > 0 ? prev - 1 : 0)}>-</button>
        <p>{st}</p>
        <button onClick={() => setSt(prev => prev + 1)}>+</button>
      </div>
      {product !== " " && (
        <OrderInfo product={product} st={st} totalPrice={totalPrice} />
      )}
    </div>
  )
}

function OrderInfo({ product, st, totalPrice }) {
  return (
    <div>
      <h3>Order Info</h3>
        <div className='array'>
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{product}</td>
                <td>{st}</td>
                <td>{totalPrice.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
    </div>
  )
}

export {Header, ProductForm, OrderInfo}
