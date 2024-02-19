const CheckWishList = (x,wish) => {
    let wishfilt = wish ? wish.filter(m =>m.id === x.id) : ""
    if (wishfilt && wishfilt.length > 0) {
        return true
    }
    return false
}

export default CheckWishList