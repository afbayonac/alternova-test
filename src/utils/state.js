import cart from '../components/cart'
import { log } from './log'
import stock from './stock.json'

const createStore = (reducer, initialState) => {
  let state = initialState
  const subscribers = []
  const getstate = () => state

  const subscribe = listener => subscribers.push(listener)

  const dispatch = action => {
    state = reducer(state, action)
    subscribers.forEach(subscriber => subscriber(state))
  }

  return [subscribe, dispatch, getstate]
}

const reducer = (state, { type, payload }) => {
  log('executing reducer')
  switch (type) {
    case 'ADD': {
      const { units , id } = payload
      log({ units, id })


      return {
        ...state,
        products: [
          ...state.products.slice(0, id),
          {
            ...state.products[id],
            cart: state.products[id].cart + units, 
            units: state.products[id].units - units
          },
          ...state.products.slice(id + 1, state.products.length)
        ]
      };
    }
    default:
      return state
  }
}

export const [subscribe, dispatch, getstate] = createStore(reducer, {
  products: stock.products.map(p => ({ ...p, cart: 0, units: p.stock }))
})
