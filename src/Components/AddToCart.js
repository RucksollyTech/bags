import { cartAddAction } from "./Action"

const AddToCart = (x,dispatch,cart,color,size) => {
    let cartfilt = cart ? cart.filter(m =>m.id === x.id) : []
    if (cartfilt && cartfilt.length > 0) return cartfilt[0].counter
    let xx = (cart && cart.length === 0) ? [{...x,counter:1}] : [{...x,counter:1},...cart]
    if(color && size){
        xx = (cart && cart.length === 0) ? [{...x,counter:1,colorSelect:color,size}] : [{...x,counter:1,colorSelect:color,size},...cart]
    }
    localStorage.setItem(`cartItems`, JSON.stringify(xx))
    dispatch(cartAddAction())
    return 1
}

export default AddToCart
