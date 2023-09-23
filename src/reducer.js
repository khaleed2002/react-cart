import { CLEAR_CART, REMOVE_ITEM, INCREASE_ITEM, DECREASE_ITEM, GET_DATA, TOGGLE_LOADING } from './actions'

const reducer = (state, action) => {
    if (action.type === GET_DATA) {
        console.log(action.payload.cartArray);
        return { ...state, cartArray: action.payload.cartArray }
    }
    if (action.type === TOGGLE_LOADING) {
        return { ...state, isLoading: false }
    }
    if (action.type === CLEAR_CART) {
        return { ...state, cartArray: [] }
    }
    if (action.type === REMOVE_ITEM) {
        const newCart = state.cartArray.filter(({ id }) => {
            return action.payload.id !== id
        })
        return { ...state, cartArray: newCart }
    }
    if (action.type === INCREASE_ITEM) {
        const newCart = state.cartArray.map((item) => {
            if (action.payload.id === item.id) {
                return { ...item, amount: (item.amount + 1) }
            }
            return item
        })
        return { ...state, cartArray: newCart }
    }
    if (action.type === DECREASE_ITEM) {
        const newCart1 = state.cartArray.map((item) => {
            if (action.payload.id === item.id) {
                return { ...item, amount: (item.amount - 1) }
            }
            return item
        })
        const newCart2 = newCart1.filter(({ amount }) => {
            return amount > 0
        })

        return { ...state, cartArray: newCart2 }
    }

    throw new Error(`No matching action "${action.type}" in action list`)
}
export default reducer