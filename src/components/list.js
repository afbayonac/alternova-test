import { getstate } from '../utils/state'
import './list.css'
import product from './product'

const list = (parent, document, windows) => {
  const base = document.createElement('div')
  const { products } = getstate()

  products
    .forEach((_, i) => {
      product(base, document, windows, i)
    })

  base.classList.add('list')
  parent.appendChild(base)
}

export default list
