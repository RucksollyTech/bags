import { cartAddAction } from "./Action"

const RemoveFromCart = (x,dispatch,cart) => {
    let cartfilt = cart ? cart.filter(m =>m.id !== x.id) : ""
    localStorage.setItem(`cartItems`, JSON.stringify(cartfilt))
    dispatch(cartAddAction())
}

export default RemoveFromCart
