import { log } from '../utils/log'
import { pipe } from '../utils/pipe'
import { getstate, subscribe } from '../utils/state'
import './cart.css'

const cart = (parent, document, windows) => {
  const base = document.createElement('div')
  const empy = document.createElement('div')
  base.classList.add('cart')
  base.setAttribute('id', 'cart')
  empy.innerHTML = `
    Selecciona algun producto para comenzar
    `


  base.innerHTML = `
    <div><img src="./favicon.ico" alt="shopping cart" width="24px" height="24px"></div>
    <ul id="list"></ul>
    <div>
    <div> Total : <span id="total"></span></div>
      <button>Create Order</button>
    </div>
    `
  
  const { products } = getstate()
  const productsInCart = products
    .filter(product => product.cart > 0)

  if (productsInCart.length > 0) {
    base.classList.remove('hidden')
  } else {
    base.classList.add('hidden')
  }
  
  const list = base.querySelector('#list')

  pipe(
    () => products,
    item => {
      let value = item
      return ({ products }) => {
        if (item === products) return
        item = products
        log('add cart')
        
        const productsInCart = products
        .filter(product => product.cart > 0)

        if (productsInCart.length > 0) {
          base.classList.remove('hidden')
        } else {
          base.classList.add('hidden')
        }


        let productsElement = productsInCart
          .filter(product => product.cart > 0)
          .map(({stock, name, cart, unit_price}, i) => {
            const productElement = document.createElement('div')



            productElement.innerHTML = `
              <li class="cart__item">
              <div>${name}</div>
              <div>${unit_price}</div>
              <div>X</div>
              <div>${cart}</div>
              <div>${unit_price * cart}</div>
              </li>
            `
            log(name)
            return productElement
          })

      
        list.replaceChildren(...productsElement)
      }
    }, 
    subscribe
  )

  parent.appendChild(base)
  parent.appendChild(empy)
}

export default cart
