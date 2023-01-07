import { getstate } from '../utils/state'
import './list.css'

const list = (parent, document, windows) => {
  const base = document.createElement('div')
  const { products } = getstate()

  let productsElement = products
    .map(({stock, name, unit_price }, i) => {
      const productElement = document.createElement('div')
      productElement.classList.add('product')

      const input = document.createElement('input')
      input.setAttribute('type', 'number')
      input.setAttribute('max', `${stock}`)
      input.setAttribute('min', '0')
      input.setAttribute('value', `${stock > 0 ? '1' : '0'}`)

      const btn = document.createElement('button')
      btn.innerHTML = 'Add to Cart'


      productElement.innerHTML = `
        <div class="product__image">
          <img src="/mock.webp" alt="product image ${name}" />
        </div>
        <div class="product__content">
          <div class="product__name">${name}</div>
          <div class="product__price">$ ${unit_price}</div>
          <div class="product__actions">
          </div>
        </div>
      `

      const actions = productElement.querySelector('.product__actions')
      actions.replaceChildren(input, btn)

      return productElement
    })


  base.classList.add('list')
  base.replaceChildren(...productsElement)



  parent.appendChild(base)
}

export default list
