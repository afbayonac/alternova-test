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
  switch (type) {
    default:
      return state
  }
}

export const [subscribe, dispatch, getstate] = createStore(reducer, {
  products: [],
  cart: []
})
