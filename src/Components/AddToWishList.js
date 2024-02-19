import { wishAddAction } from "./Action"
import CheckWishList from "./CheckWishList"

const AddToWishList = (x,dispatch,wish) => {
    if (CheckWishList(x,wish)){
        let wishfilt = wish.filter(m =>m.id !== x.id)
        localStorage.setItem(`wishItems`, JSON.stringify(wishfilt))
        dispatch(wishAddAction())
    }else{
        let wishfilt = [x,...wish]
        localStorage.setItem(`wishItems`, JSON.stringify(wishfilt))
        dispatch(wishAddAction())
    }
}

export default AddToWishList