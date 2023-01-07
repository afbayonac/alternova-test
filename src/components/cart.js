import { getstate } from '../utils/state'
import './cart.css'

const cart = (parent, document, windows) => {
  const base = document.createElement('div')
  const { cart } = getstate()

  let productsElement = cart
    .map(({stock, name, units}, i) => {
      return productElement
    })


  base.classList.add('cart')
  base.setAttribute('id', 'cart')
  base.replaceChildren(...productsElement)



  parent.appendChild(base)
}

export default cart
