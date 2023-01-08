import { log } from '../utils/log'
import { pipe } from '../utils/pipe'
import { dispatch, getstate, subscribe } from '../utils/state'
import './list.css'
import product from './product'

const list = (parent, document, windows) => {
  const base = document.createElement('div')
  const { products } = getstate()

  let productsElement = products
    .map((_, i) => {
      product(base, document, windows, i)
    })


  base.classList.add('list')
  // base.replaceChildren(...productsElement)

  parent.appendChild(base)
}

export default list
