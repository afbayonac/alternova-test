import './list.css'

const list = (parent, document, windows) => {
  const base = document.createElement('div')
  base.classList.add('list')

  parent.appendChild(base)
}

export default list
