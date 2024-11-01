import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ZoomModal from './Components/ZoomModal'
import { useDispatch, useSelector } from 'react-redux'
import CheckInCart from './Components/CheckInCart'
import RemoveFromCart from './Components/RemoveFromCart'
import Counter from './Components/Counter'
import Empty from './Components/Empty'
import QuestionModal from './Components/QuestionModal'
import { DELIVERY_FEE } from './Components/Constants'
import Modal from 'react-bootstrap/Modal';
import states from "./Components/StatesInUSA"
import IncreaseInCart from './Components/IncreaseInCart'

const Cart = () => {
    const history = useNavigate()
    const dispatch= useDispatch()
    const cartAdd = useSelector(state => state.cartAdd)
    const {cart} = cartAdd
    const [show2, setShow2] = useState(false)
    const [itemToGo, setItemToGo] = useState()
    const [itemToGo2, setItemToGo2] = useState()
    const [checkForTripDetails,setCheckForTripDetails] = useState(JSON.parse(localStorage.getItem(`checkOutUserInfo`)))
    const [formData, setFormData] = useState(
        checkForTripDetails ? {...checkForTripDetails.items,size: ""} :{
            name: '',
            size: '',
            users_address: '',
            email: '',
            phone: '',
            city: '',
            state: '',
            country: '',
            zipcode: '',
            checked: false,
        }
    )

    const [showModal, setShowModal] = useState(false);

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);
    
    const removeFromCart = ()=>{
        if (itemToGo && CheckInCart(itemToGo,cart)) RemoveFromCart(itemToGo,dispatch,cart)
    }
    
    const handleRemoveFromCart = (item)=>{
        setItemToGo(item)
        setShow2(true)
    }

    const [showSideBarTwo, setShowSideBarTwo] = useState(false)
    const [show, setShow] = useState(false)
    const [zoom, setZoom] = useState(false)
    const togglerSideBar = (item=null) => {
        setItemToGo2(item)
        setShowSideBarTwo(!showSideBarTwo)
    }
    const zoomer = (data) => {
        setShow(true)
        setZoom(data)
    }
    const calculator = () =>{
        const calcItems = (cart && cart.length >0) ? cart.reduce((x,carts)=>x + (parseInt(carts.counter) * parseInt(carts.price)),0) : 0
        return calcItems
    }
    const submitHandler = (e)=>{
        e.preventDefault()
        if(!formData?.size){
            return
        }
        const my_data = {
            items: {
                ...formData, 
                bag: cart,
                price : calculator() + parseInt(DELIVERY_FEE),
                counter : Counter(cart) ? Counter(cart) : 1 ,
            },
            type: "cart",
        }
        localStorage.setItem(`checkOutUserInfo`, JSON.stringify(my_data))
        history(`/checkout/cart/cart`)
    }
    const Edit = () =>{
        let this_data = {
            items: {...checkForTripDetails.items,checked: false},
            type: 'cart',
        }
        localStorage.setItem(`checkOutUserInfo`, JSON.stringify(this_data))
        setCheckForTripDetails(this_data)
    }
    return (
        <div className='cart'>
            <div className="cartContent">
                <div className="detailsCarouselSm">
                    <div className='py-5'>
                        {(cart && cart.length !== 0) &&
                            <button onClick={handleShow} className='productButton'>
                                Proceed to checkout
                            </button>
                        }
                        <div className='pt-3 text-center'>
                            <Link className='anchor' to={"/items/list"}>
                                Continue shopping
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="twoEquo centerY">
                    <div className="header2">
                        My Shopping Cart <span>({Counter(cart ? cart : [])})</span>
                    </div>
                    <div className='detailsCarouselLg'>
                        <Link className='anchor' to={"/items/list"}>
                            Continue shopping
                        </Link>
                    </div>
                    
                </div>
                {(cart && cart.length) ? cart.map(item =>(
                        <div className='cartDetailsContainer'>
                            <div className='shopLeft'>
                                <div className='theContent relative' onClick={()=>zoomer([item?.cover_image, item?.model_image,...item?.other_images.map(img => img.image)])}>
                                     {/* change Img */}
                                    <img src={`${process.env.REACT_APP_BASE_URL === "http://127.0.0.1:8000" ? process.env.REACT_APP_BASE_URL : "" }${item.cover_image}`} alt={item.name} />
                                    <img className='zoomIcon' width="20" height="20" src="https://img.icons8.com/external-icongeek26-outline-icongeek26/20/external-zoom-in-graphic-design-icongeek26-outline-icongeek26.png" alt="external-zoom-in-graphic-design-icongeek26-outline-icongeek26"/>
                                </div>
                            </div>
                            <div className='border_left'>
                                <div className='border_bottom padderCart lilSmImgContainer'>
                                    <div className='lilSmImg relative' onClick={()=>zoomer([item?.cover_image, item?.model_image,...item?.other_images.map(img => img.image)])}>
                                        {/* change Img */}
                                        <img src={`${process.env.REACT_APP_BASE_URL === "http://127.0.0.1:8000" ? process.env.REACT_APP_BASE_URL : "" }${item.cover_image}`} alt={item.name} />
                                        <img className='zoomIcon' width="20" height="20" src="https://img.icons8.com/external-icongeek26-outline-icongeek26/20/external-zoom-in-graphic-design-icongeek26-outline-icongeek26.png" alt="external-zoom-in-graphic-design-icongeek26-outline-icongeek26"/>
                                    </div>
                                    <div className='pdSmSc'>
                                        <div>
                                            <small>
                                                BG{item.id + parseInt(process.env.REACT_APP_CONSTANT)}
                                            </small>
                                        </div>
                                        <div className='ppadName'>
                                            <div className="productName">
                                                {item.name}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="padderCart">
                                    <div className="twoEquo">
                                        <span>
                                            Color
                                        </span>
                                        <span>
                                            {item.color || "--"}
                                        </span>
                                    </div>
                                    <div className="twoEquo pt-1">
                                        <span>
                                            Material
                                        </span>
                                        <span>
                                            {item.material || "--"}
                                        </span>
                                    </div>
                                    
                                </div>
                                <div className="heightManager" />
                                <div className="padderCart border_bottom">
                                    <div className="twoEquo centerY">
                                        <div className='sel'>
                                            <select value={item.counter} onChange={(e)=>IncreaseInCart(item,cart,e.target.value,dispatch)}>
                                                {item.amount_available ? [...Array(item.amount_available)].map((_, i) =>(
                                                    <option value={i+1} key={i+1}>
                                                        {i+1}
                                                    </option>
                                                ))
                                                :
                                                    [...Array(12)].map((_, i) =>(
                                                        <option value={i+1} key={i+1}>
                                                            {i+1}
                                                        </option>
                                                    ))
                                                }
                                                
                                            </select>
                                        </div>
                                        <span>
                                            ${item.price.toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                                <div className='divideByTwo'>
                                    <div className='text-center xx pointer'  onClick={()=>togglerSideBar(item)}>
                                        <img width="15" height="15" src="https://img.icons8.com/fluency-systems-regular/15/visible--v1.png" alt="visible--v1"/>
                                        <span className='pl_1'>View Details</span>
                                    </div>
                                    <div className='text-center pointer' onClick={()=>handleRemoveFromCart(item)}>
                                        <img width="15" height="15" src="https://img.icons8.com/ios/15/cancel.png" alt="cancel"/>
                                        <span className='pl_1'>Remove</span>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    ))
                :
                    <Empty msg={"Your cart is empty"} />
                }
            </div>
            <div className="bg-white ">
                {(cart && cart.length !== 0) &&
                    <div className='rightSideContents'>
                        <div className="twoEquo">
                            <span>
                                Subtotal
                            </span>
                            <span>
                                ${calculator()?.toFixed(2)}
                            </span>
                        </div>
                        <div className="twoEquo">
                            <span>
                                Shipping
                            </span>
                            <span>
                                ${DELIVERY_FEE?.toFixed(2)}
                            </span>
                        </div>
                        <div className="twoEquo">
                            <span>
                                Tax
                            </span>
                            <span>
                                $0.00
                            </span>
                        </div>
                        <div className="twoEquo mt-4 font_17">
                            <span>
                                Total
                            </span>
                            <span>
                                ${(calculator() + parseInt(DELIVERY_FEE))?.toFixed(2)}
                            </span>
                        </div>
                        <div className="mt-4">
                            <button onClick={handleShow} className='productButton'>
                                Proceed to checkout
                            </button>
                        </div>
                    </div>
                }
            </div>
            <div onClick={togglerSideBar} className={`${showSideBarTwo ? "addToCartSideBar" : "d_none"}`} />
            <div className={`${showSideBarTwo ? "productDetailContainer display" : "productDetailContainer"}`}>
                {itemToGo2 &&
                    <div className="autos">
                        <div className="pt-4 bg-white sticky-top">
                            <div className="twoEquo pt-4  bg-white">
                                <div className='font_17'>
                                    Product details
                                </div>
                                <img className='pointer' onClick={togglerSideBar} width="20" height="20" src="https://img.icons8.com/material-rounded/20/delete-sign.png" alt="delete-sign"/>
                            </div>
                        </div>
                        <div className='heightRow xm'>
                            <div className='cartViews py-4 border-bottom'>
                                <div className="theContent">
                                    {/* change Img */}
                                    <img src={`${process.env.REACT_APP_BASE_URL === "http://127.0.0.1:8000" ? process.env.REACT_APP_BASE_URL : "" }${itemToGo2?.cover_image}`} alt={itemToGo2?.name} />
                                </div>
                                <div className="bagWords p-3">
                                    <div className='font_14'>
                                        {itemToGo2?.name}
                                    </div>
                                    <div className='font_14'>
                                        ${itemToGo2?.price?.toFixed(2)}
                                    </div>
                                </div>
                            </div>
                            {itemToGo2?.properties_separated_with_double_comma &&
                                <div className='py-3'>
                                    {itemToGo2.properties_separated_with_double_comma.split(",,").length > 5 ?
                                        <ul>
                                            <div className="divideByTwoWithGap ">
                                                {itemToGo2.properties_separated_with_double_comma.split(",,").map((x,i)=>(
                                                    <li key={i}>{x}</li>
                                                ))}
                                            </div>
                                        </ul>
                                    :
                                        <ul>
                                            {itemToGo2.properties_separated_with_double_comma.split(",,").map((x,i)=>(
                                                <li key={i}>{x}</li>
                                            ))}
                                        </ul>
                                    }
                                </div>
                            }
                            <div>
                                {itemToGo2?.extra_information}
                            </div>
                            
                        </div>
                        <div className="sticky-bottom bg-white">
                            <button onClick={()=>history(`/product/details/${itemToGo2?.id}`)} className='productButton'>
                                View Product Page
                            </button>
                        </div>
                    </div>
                }
            </div>
            <QuestionModal 
                show={show2}
                setShow={setShow2}
                msg={`Do you wish to remove the item 
                ${itemToGo ? itemToGo.name : ""} from your Cart?`}
                head="Remove this Product"
                onHide={() => setShow(false)}
                removeFromCart={removeFromCart}
            />
            <ZoomModal show={show} setShow={setShow} zoom={zoom} />
            <Modal
                show={showModal}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size="xl"
            >
                
                <Modal.Body>
                    <form onSubmit={submitHandler}>
                        <div className="checkOut pt-4">
                            <div className="form-group ">
                                <label className='font_17 text-danger'>Enter your size</label>
                                <input
                                    required 
                                    value={formData.size}
                                    onChange={(e)=>setFormData({...formData,size:e.target.value})} 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Eg: XXL"
                                />
                            </div>
                        </div>
                        <div className="font_17 pt-4">
                            Shipping Details
                        </div>
                        {(checkForTripDetails && checkForTripDetails?.items?.checked) ? 
                            <div>
                                <div className='checkOut pt-3 shpDet'>
                                    <div className="form-group">
                                        <label>Full Name</label>
                                        {checkForTripDetails.items.name}
                                    </div>
                                    <div className="form-group">
                                        <label>Delivery address</label>
                                        {checkForTripDetails.items.users_address}
                                    </div>
                                    <div className="form-group">
                                        <label>Email address</label>
                                        {checkForTripDetails.items.email}
                                    </div>
                                    <div className="form-group">
                                        <label>Phone Number</label>
                                        {checkForTripDetails.items.phone}
                                    </div>
                                    <div className="form-group">
                                        <label>City</label>
                                        {checkForTripDetails.items.city}
                                    </div>
                                    <div className="form-group">
                                        <label>State</label>
                                        {checkForTripDetails.items.state}
                                    </div>
                                    <div className="form-group">
                                        <label>Country</label>
                                        {checkForTripDetails.items.country}
                                    </div>
                                    <div className="form-group">
                                        <label>Zip Code</label>
                                        {checkForTripDetails.items.zipcode}
                                    </div>
                                    <div className="form-group">
                                        <span onClick={Edit} className='px-3 text-primary btn btn-sm btn-outline-primary'>
                                            Edit
                                        </span>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <button role='submit' disabled={!formData.size} className="productButton">
                                        Proceed to checkout
                                    </button>
                                </div>
                            </div>
                        :
                            <div className='checkOut pt-3'>
                                <div className="form-group">
                                    <label>Full Name</label>
                                    <input
                                        required 
                                        value={formData.name}
                                        onChange={(e)=>setFormData({...formData,name:e.target.value})} 
                                        type="text" 
                                        className="form-control" 
                                        placeholder="Enter your full name"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Delivery address</label>
                                    <input
                                    required 
                                    value={formData.users_address} 
                                    onChange={(e)=>setFormData({...formData,users_address:e.target.value})}
                                    type="text" className="form-control" 
                                    placeholder="Enter delivery address"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Email address</label>
                                    <input
                                    required 
                                    value={formData.email}
                                    onChange={(e)=>setFormData({...formData,email:e.target.value})}
                                    type="email" 
                                    className="form-control" 
                                    placeholder="Enter email"
                                    />
                                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                                </div>
                                <div className="form-group">
                                    <label>Phone Number</label>
                                    <input
                                        required 
                                        value={formData.phone}
                                        onChange={(e)=>setFormData({...formData,phone:e.target.value})} 
                                        type="text" 
                                        className="form-control" 
                                        placeholder="Enter your phone number"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Country</label>
                                    <select 
                                        id="inputState" 
                                        className="form-control"
                                        value={formData.country}
                                        onChange={(e)=>setFormData({...formData,country:e.target.value})}
                                        required
                                    >
                                        <option value="">Choose...</option>
                                        <option value='USA'>USA</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>State</label>
                                    <select 
                                        required
                                        id="inputStates" 
                                        className="form-control"
                                        value={formData.state}
                                        onChange={(e)=>setFormData({...formData,state:e.target.value})}
                                    >
                                        <option value="">Choose...</option>
                                        {states()?.map(st=>(
                                            <option key={st.abbreviation} value={st.name}>{st.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>City</label>
                                    <input 
                                        required
                                        type="text" 
                                        className="form-control" 
                                        value={formData.city}
                                        onChange={(e)=>setFormData({...formData,city:e.target.value})}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Zip Code</label>
                                    <input 
                                        required
                                        type="text" 
                                        className="form-control" 
                                        value={formData.zipcode}
                                        onChange={(e)=>setFormData({...formData,zipcode:e.target.value})}
                                    />
                                </div>
                                <div className="input-group mt-3 centerY">
                                    <div className="input-group-text w-100">
                                        <input 
                                            value={formData?.checked} 
                                            onChange={(e)=>setFormData({...formData,checked:e.target.checked})}
                                            type="checkbox" 
                                            aria-label="Save my shipping details" 
                                        />
                                        <div className='pl_1'>
                                            Save my shipping details
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <button disabled={!formData.size} role='submit' className='productButton'>
                                        Proceed to checkout
                                    </button>
                                </div>
                            </div>
                        }
                    </form>
                    <img onClick={handleClose} className='cancelWishList' width="20" height="20" src="https://img.icons8.com/fluency-systems-filled/20/delete-sign.png" alt="delete-sign"/>
                </Modal.Body>
                
            </Modal>
        </div>
    )
}

export default Cart