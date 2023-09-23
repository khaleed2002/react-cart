import { useContext, useEffect, useReducer, useState } from 'react'
import CartItem from './CartItem'
import { AppContext } from './Context'
const url = 'https://www.course-api.com/react-useReducer-cart-project'

import {
  CLEAR_CART,
  REMOVE_ITEM,
  INCREASE_ITEM,
  DECREASE_ITEM,
  GET_DATA,
  TOGGLE_LOADING,
} from './actions'
import reducer from './reducer'

const defaultState = {
  cartArray: [],
  isLoading: true,
}

const CartContainer = () => {
  // fetch data

  const [state, dispatch] = useReducer(reducer, defaultState)
  const fetchData = async () => {
    const res = await fetch(url)
    const data = await res.json()
    dispatch({ type: GET_DATA, payload: { cartArray: data } })
    dispatch({ type: TOGGLE_LOADING })
    return data
  }
  useEffect(() => {
    fetchData()
  }, [])

  let totalPrice = 0
  state.cartArray?.forEach(({ price, amount }) => {
    totalPrice += price * amount
  })
  totalPrice = parseFloat(totalPrice.toFixed(2))
  const { setTotalAmount } = useContext(AppContext)
  useEffect(() => {
    let totalAmount = 0
    state.cartArray.forEach(({ amount }) => {
      totalAmount += amount
    })

    setTotalAmount(totalAmount)
  }, [state])

  const clearCart = () => {
    dispatch({ type: CLEAR_CART })
  }
  const removeItem = (id) => {
    dispatch({ type: REMOVE_ITEM, payload: { id } })
  }
  const increaseItem = (id) => {
    dispatch({ type: INCREASE_ITEM, payload: { id } })
  }
  const decreaseItem = (id) => {
    dispatch({ type: DECREASE_ITEM, payload: { id } })
  }

  if (state.isLoading) {
    return <div className="loading"></div>
  }
  if (state.cartArray.length === 0) {
    return (
      <section className="cart">
        {/* cart header */}
        <header>
          <h2>your bag</h2>
          <h4 className="empty-cart">is currently empty</h4>
        </header>
      </section>
    )
  }
  return (
    <section className="cart">
      {/* cart header */}
      <header>
        <h2>your bag</h2>
      </header>
      {/* cart items */}
      <div>
        {state.cartArray.map((cartItem) => {
          return (
            <CartItem
              key={cartItem.id}
              {...cartItem}
              removeItem={removeItem}
              increaseItem={increaseItem}
              decreaseItem={decreaseItem}
            />
          )
        })}
      </div>
      {/* cart footer */}
      <footer>
        <hr />
        <div>
          <h5 className="cart-total">
            total <span>${totalPrice}</span>
          </h5>
        </div>
        <button className="btn btn-hipster" onClick={clearCart}>
          clear cart
        </button>
      </footer>
    </section>
  )
}

export default CartContainer
