// root app
import './reset.css'
import './globals.css'

// header styles
import './styles/header.css'

// footer styles
import './styles/footer.css'

// container styles
import './styles/main.css'
import { log } from './utils/log'
import list from './components/list'
import cart from './components/cart'

log('Init app')

const root = document.getElementById('root')
list(root, document, parent)
cart(root, document, parent)
