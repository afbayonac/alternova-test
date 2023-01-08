import { download } from '../utils/download'
import { log } from '../utils/log'
import { pipe } from '../utils/pipe'
import { dispatch, getstate, subscribe } from '../utils/state'
import './cart.css'

const cart = (parent, document, windows) => {
  const base = document.createElement('div')
  const empy = document.createElement('div')
  base.classList.add('cart')
  base.setAttribute('id', 'cart')
  empy.innerHTML = `
    add products to cart
    `

  base.innerHTML = `
    <div><img src="./favicon.ico" alt="shopping cart" width="24px" height="24px"></div>
    <ul id="list" class="cart__list"></ul>
    <div>
    <div class="cart__footer"> 
      <div class="cart__total">Total : <span id="total"></span></div>
      <button id="btn">Create Order</button>
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
  const total = base.querySelector('#total')
  const btn = base.querySelector('#btn')


  btn.addEventListener('click', () =>  {
    log('dowload file')
    const { products } = getstate()
    
    const order = {
      products: products
      .filter(product => product.cart > 0)
      .map(p => ({
        name: p.name,
        quantity: p.cart,
        unit_price: p.unit_price,
        total_price: p.unit_price * p.units
      })),
      total: products.reduce((aco, p) => aco + p.cart * p.unit_price , 0)
    }

    download('order.json', JSON.stringify(order, null, 2))
  })


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
              <div>$${unit_price}</div>
              <div>X</div>
              <div>${cart}</div>
              <div>$${unit_price * cart}</div>
              </li>
            `
            log(name)
            return productElement
          })

        total.innerHTML = '$' + productsInCart.reduce((aco, {unit_price, cart}) => aco + unit_price * cart, 0)
        list.replaceChildren(...productsElement)
      }
    }, 
    subscribe
  )

  parent.appendChild(base)
  parent.appendChild(empy)
}

export default cart
