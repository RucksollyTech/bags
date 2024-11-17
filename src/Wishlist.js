import React, { useState } from 'react'
import QuestionModal from './Components/QuestionModal'
import { useDispatch, useSelector } from 'react-redux';
import Counter from './Components/Counter';
import Empty from './Components/Empty';
import { useNavigate } from 'react-router-dom';
import CheckWishList from './Components/CheckWishList';
import CheckInCart from './Components/CheckInCart';
import RemoveFromCart from './Components/RemoveFromCart';
import AddToCart from './Components/AddToCart';
import AddToWishList from './Components/AddToWishList';

const Wishlist = () => {
    const history = useNavigate()
    const dispatch = useDispatch()
    const [itemToGo, setItemToGo] = useState()
    const [show, setShow] = useState(false);
    const [isWish, setIsWish] = useState(true);
    const toggler = e => e.target.parentNode.parentNode.classList.toggle("active")
    const removeToggle = e => e.target.parentNode.parentNode.parentNode.classList.toggle("active")

    const wishAdd = useSelector(state => state.wishAdd)
    const {wish} = wishAdd
    const cartAdd = useSelector(state => state.cartAdd)
    const {cart} = cartAdd

    const addToCart = (bag)=>{
        CheckInCart(bag,cart) ? RemoveFromCart(bag,dispatch,cart) : AddToCart(bag,dispatch,cart)
    }
    const handleRemoveFromCart = (item)=>{
        setIsWish(false);
        setItemToGo(item)
        if (CheckInCart(item,cart)){
            setShow(true)
        }else{
            addToCart(item)
        }
    }
    const handleRemoveFromWish = (item)=>{
        setIsWish(true);
        setItemToGo(item)
        setShow(true)
    }
    const removeFromCart = ()=>{
        if (itemToGo && CheckInCart(itemToGo,cart)) RemoveFromCart(itemToGo,dispatch,cart)
    }
    const removeFromWish = ()=>{
        AddToWishList(itemToGo,dispatch,wish)
    }
    return (
        <div className='wishList'>
            <div className='pb-3 wishStandardWidth'>
                <h3>
                    {Counter(wish ? wish : [])} Items
                </h3>
            </div>
            <div className="wishListContainer wishStandardWidth">
                {(wish && wish.length > 0) ? wish.map(x=>(
                        <div className='theContent wishListContent relative' key={x.id}>
                            <div onClick={toggler}>
                                {/* change Img */}
                                <img className='pointer' src={`${process.env.REACT_APP_BASE_URL}${x.cover_image}`} alt={x.name} />
                                <div className="wishListDetailDisplay pointer" onClick={removeToggle}>
                                    <div>
                                        <small>
                                            BG{parseInt(x.id) + parseInt(process.env.REACT_APP_CONSTANT)}
                                        </small>
                                    </div>
                                    <div className='ppadName'>
                                        <div className="productName font_17">
                                            {x.name}
                                        </div>
                                    </div>
                                    <div className="pt-1 font_12 twoEquo">
                                        <span>
                                            Color
                                        </span>
                                        <span>
                                            {x.colorSelect || "--"}
                                        </span>
                                    </div>
                                    <div className=" pt-1 font_12 twoEquo">
                                        <span>
                                            Size
                                        </span>
                                        <span>
                                            {x.size || "--"}
                                        </span>
                                    </div>
                                    <div className="font_12 py-3">
                                        {x.description}
                                    </div>
                                    <div className='text-dark py-3 xd'>
                                        <button onClick={()=>handleRemoveFromCart(x)} className='productButton'>
                                            {CheckWishList(x,cart) ? "Remove from cart" : "Place in cart"}
                                        </button>
                                        <div className='pt-2'>
                                            <button onClick={()=>history(`/product/details/${x.id + parseInt(process.env.REACT_APP_CONSTANT)}`)} className='productButton xx'>
                                                <span className="mr-1">
                                                    <img width="15" height="15" src="https://img.icons8.com/material-rounded/15/plus-math--v1.png" alt="plus-math--v1"/>
                                                </span>Full Details
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="bagWords bg-white">
                                    <div>
                                        {x.name}
                                    </div>
                                    <div>
                                        ${parseInt(x.price).toFixed(2)}
                                    </div>
                                    
                                </div>
                            </div>
                            <img onClick={()=>handleRemoveFromWish(x)} className='cancelWishList' width="20" height="20" src="https://img.icons8.com/fluency-systems-filled/20/delete-sign.png" alt="delete-sign"/>
                        </div>
                    ))
                :
                    <div>
                        <Empty msg={"Your wish list is empty."} />
                    </div>
                }
            </div>
            <QuestionModal 
                show={show}
                setShow={setShow}
                msg={`Do you wish to remove the item 
                ${itemToGo ? itemToGo.name : ""} from your ${isWish ? "Wishlist" : "Cart" }?`}
                head={`Remove from my ${isWish ? "Wishlist" : "Cart" }`}
                onHide={() => setShow(false)}
                removeFromCart={isWish ? removeFromWish : removeFromCart}
            />
        </div>
    )
}

export default Wishlist