const CheckInCart = (x,cart) => {
    let cartfilt = (cart && x) ? cart.filter(m =>m.id === x.id) : ""
    return (cartfilt && cartfilt.length > 0) ? true : false
}

export default CheckInCart