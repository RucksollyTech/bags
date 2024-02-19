import { cartAddAction } from "./Action"

const IncreaseInCart = (x,cart,amount,dispatch) => {
    let cartfilt = cart ? cart.filter(m =>m.id === x.id) : ""
    let cartin = 0
    cart.map((k,nn)=>{
        if (k.id === x.id){
            cartin = nn
        }
    })
    if (amount){
        if(cartfilt && cartfilt.length > 0){
            cart[cartin].counter = parseInt(amount)
            localStorage.setItem(`cartItems`, JSON.stringify(cart))
            dispatch(cartAddAction())
        }
    }
    
}

export default IncreaseInCart



