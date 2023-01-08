import { log } from '../utils/log'
import { pipe } from '../utils/pipe'
import { dispatch, getstate, subscribe } from '../utils/state'
import './product.css'

const product = (parent, document, windows, id) => {
  const base = document.createElement('div')
  const { products } = getstate()
  const {stock, name, unit_price, units } = products[id]

  base.classList.add('product')

  const input = document.createElement('input')
  input.setAttribute('type', 'number')
  input.setAttribute('max', `${units}`)
  input.setAttribute('min', '0')
  input.setAttribute('value', `${units > 0 ? '1' : '0'}`)
  // TODO: Validar input
  input.addEventListener('input', (e) => { 
    const sanity = e.target.value.replace(/^([^0-9]{0,})/, '')  
    input.value =  Number(sanity) > Number(input.max) ? input.max : sanity
  })

  const btn = document.createElement('button')
  btn.innerHTML = 'Add to Cart'
  btn.addEventListener('click', () => dispatch({ type: 'ADD', payload: { units: Number(input.value), id } }))
  if (units < 1) {
    input.setAttribute('disabled', true)
    btn.setAttribute('disabled', true)
  } else {
    input.removeAttribute('disabled')
    btn.removeAttribute('disabled')
  }

  base.innerHTML = `
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

  const actions = base.querySelector('.product__actions')
  actions.replaceChildren(input, btn)

  pipe(
    () => products[id],
    item => {
      let value = item
      return ({ products }) => {
        if (item === products[id]) return
        item = products[id]
        const { units } = item

        log('init product subscription', units, `input-unit-${id}`)
        input.max = `${units}`
        input.value = `${units > 0 ? '1' : '0'}`

        if (units < 1) {
          input.setAttribute('disabled', true)
          btn.setAttribute('disabled', true)
        } else {
          input.removeAttribute('disabled')
          btn.removeAttribute('disabled')
        }

      }
    }, 
    subscribe
  )

  parent.appendChild(base)
}

export default product
