import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ADJUST_HEIGHT_FAIL } from './Components/Constants'
import { bagDetailAction, hightAddAction } from './Components/Action'
import { useNavigate, useParams } from 'react-router-dom'
import Accordion from 'react-bootstrap/Accordion';
import Carousel from 'react-bootstrap/Carousel'
import ZoomModal from './Components/ZoomModal'
import CheckInCart from './Components/CheckInCart'
import AddToCart from './Components/AddToCart'
import Loader from './Components/Loader'
import CheckWishList from './Components/CheckWishList'
import AddToWishList from './Components/AddToWishList'

const BagDetails = () => {
    const dispatch = useDispatch()
    const history = useNavigate()
    const {id} = useParams();
    const [showSideBar, setShowSideBar] = useState(false)
    const [showSideBarTwo, setShowSideBarTwo] = useState(false)
    const [theHeight, setTheHeight] = useState(false)
    const [show, setShow] = useState(false)
    const [zoom, setZoom] = useState(false)
    const [index, setIndex] = useState(0);

    const bag = useSelector(state => state.bag)
    const {loading,bag:bg} = bag

    const wishAdd = useSelector(state => state.wishAdd)
    const {wish} = wishAdd

    const cartAdd = useSelector(state => state.cartAdd)
    const {cart} = cartAdd


    const addToCart = ()=>{
        if (!CheckInCart(bg,cart)) AddToCart(bg,dispatch,cart)
    }
    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };
    
    const checkScroll = (e) => {
        setTheHeight(e.target.scrollTop)
        localStorage.setItem(`hightItems`, JSON.stringify(e.target.scrollTop))
        dispatch(hightAddAction())
    }

    const toggler = () => {
        addToCart()
        setShowSideBar(!showSideBar)
        localStorage.setItem(`hightItems`, JSON.stringify(showSideBar ? theHeight : 51))
        dispatch(hightAddAction())
    }
    const togglerSideBar = () => {
        setShowSideBarTwo(!showSideBarTwo)
        localStorage.setItem(`hightItems`, JSON.stringify(showSideBarTwo ? theHeight : 51))
        dispatch(hightAddAction())
    }
    
    const zoomer = (data) => {
        let filters = bg?.other_images.map(img => img.image)
        const dataTest = [bg?.cover_image, bg?.model_image,...filters]
        setShow(true)
        let selectedImg = dataTest.filter(i => i !== data)
        setZoom([data, ...selectedImg])
    }
    
    useEffect(()=> {
        dispatch(bagDetailAction(parseInt(id) - parseInt(process.env.REACT_APP_CONSTANT)))
    },[id])
    useEffect(()=>{
        return ()=>dispatch({
            type : ADJUST_HEIGHT_FAIL,
        })
    },[])
    return (
        <div className='bagDetailViewContainer'>
            <div className="scrollTip relative detailsCarouselLg" onScroll={checkScroll}>
                <div className="absoluteScroll">
                    {loading && <Loader />}
                    {/* change Img */}
                    {bg?.model_image &&
                        <div onClick={()=>zoomer(bg.model_image)} >
                            <img src={`${process.env.REACT_APP_BASE_URL}${bg.model_image}`} alt="Bag" onClick={()=>zoomer(bg.model_image)} />
                        </div>
                    }
                    {bg?.cover_image &&
                        <div onClick={()=>zoomer(bg.cover_image)} >
                            <img src={`${process.env.REACT_APP_BASE_URL}${bg.cover_image}`} alt="Bag" onClick={()=>zoomer(bg.cover_image)} />
                        </div>
                    }
                    {bg?.other_images.map((item)=>(
                        <div key={item.id} onClick={()=>zoomer(item.image)} >
                            <img src={`${process.env.REACT_APP_BASE_URL}${item.image}`} alt="Bag" onClick={()=>zoomer(item.image)} />
                        </div>
                    ))}
                </div>
            </div>
            <div className='detailsCarouselSm'>
                {loading && <Loader />}
                {/* change Img */}
                <Carousel 
                    activeIndex={index} 
                    onSelect={handleSelect}
                    controls = {false}
                    indicators = {false}
                    interval={null}
                >
                    {bg?.model_image &&
                        <Carousel.Item>
                            <div onClick={()=>zoomer(bg.model_image)} >
                                <img src={`${process.env.REACT_APP_BASE_URL}${bg.model_image}`} alt="Bag" onClick={()=>zoomer(bg.model_image)} />
                            </div>
                        </Carousel.Item>
                    }
                    {bg?.cover_image &&
                        <Carousel.Item>
                            <div onClick={()=>zoomer(bg.cover_image)} >
                                <img src={`${process.env.REACT_APP_BASE_URL}${bg.cover_image}`} alt="Bag" onClick={()=>zoomer(bg.cover_image)} />
                            </div>
                        </Carousel.Item>
                    }
                    {bg?.other_images.map((item)=>(
                        <Carousel.Item key={item.id}>
                            <div onClick={()=>zoomer(item.image)} >
                                <img src={`${process.env.REACT_APP_BASE_URL}${item.image}`} alt="Bag" onClick={()=>zoomer(item.image)} />
                            </div>
                        </Carousel.Item>
                    ))}
                </Carousel>
            </div>
            <div className='bagDetails'>
                {bg && 
                    <div className="bagDetailsContent">
                        <div className="twoEquo">
                            <small>
                                BG{id ? id : ""}
                            </small>
                            <span>
                                {/* <img width="24" height="24" src="https://img.icons8.com/material-rounded/24/like--v1.png" alt="like--v1"/> */}
                                <img className='pointer' width="20" onClick={()=>AddToWishList(bg,dispatch,wish)} height="20" src={`https://img.icons8.com/material-${CheckWishList(bg,wish) ? "rounded" : "outlined"}/20/19110B/like--v1.png`} alt="like--v1"/>
                            </span>
                        </div>
                        <div>
                            <div className="productName">
                                {bg.name}
                            </div>
                            <div>
                                ${bg.price.toFixed(2)}
                            </div>
                        </div>
                        <div className="productButtonContainer">
                            <button onClick={toggler} className='productButton'>
                                Place in cart
                            </button>
                        </div>
                        {bg?.description &&
                            <div className='text-muted font_12'>
                                {bg.description}
                            </div>
                        }
                        <div className="pt-3">
                            <small className=" pointer" onClick={togglerSideBar}>
                                Product details
                            </small>
                        </div>
                    </div>
                }
            </div>
            <div className={`${showSideBar ? "addToCartSideBar" : "d_none"}`}>
                {(bg && CheckInCart(bg,cart)) ? 
                    <div className='leftAutoBeen'>
                        <div className="twoEquo">
                            <div className='font_17'>
                                Added to Cart
                            </div>
                            <img onClick={toggler} width="20" height="20" src="https://img.icons8.com/material-rounded/20/delete-sign.png" alt="delete-sign"/>
                        </div>
                        <div className="gg">
                            <div className='theContent img'>
                                {/* change Img */}
                                <img src={`${process.env.REACT_APP_BASE_URL}${bg.cover_image}`} alt={bg.name} />
                            </div>  
                            <div className='padMe'>
                                <div className="twoEquo">
                                    <small>
                                        BG{id ? id : ""}
                                    </small>
                                </div>
                                <div className='ppadName'>
                                    <div className="productName">
                                        {bg.name}
                                    </div>
                                    <div>
                                        {bg.material}
                                    </div>
                                    <div className='pt-2'>
                                        ${bg.price.toFixed(2)}
                                    </div>
                                </div>
                            </div>                      
                        </div>
                        <div className="mt-4">
                            <button onClick={()=>history("/products/cart")} className='productButton'>
                                View my Cart
                            </button>
                            <button onClick={toggler} className='productButton xx'>
                                Continue Shopping
                            </button>
                        </div>

                    </div>
                :
                    <div className="leftAutoBeen bold6 relative">
                        Not added to cart. <span className="text-primary pointer">Add to cart</span>
                        <img className='cancelShw' onClick={toggler} width="20" height="20" src="https://img.icons8.com/material-rounded/20/delete-sign.png" alt="delete-sign"/>
                    </div>
                }
            </div>
            <div onClick={togglerSideBar} className={`${showSideBarTwo ? "addToCartSideBar" : "d_none"}`} />
            <div className={`${showSideBarTwo ? "productDetailContainer display" : "productDetailContainer"}`}>
                <div className="autos">
                    <div className="pt-4 bg-white sticky-top">
                        <div className="twoEquo pt-4  bg-white">
                            <div className='font_17'>
                                Product details
                            </div>
                            <img className='pointer' onClick={togglerSideBar} width="20" height="20" src="https://img.icons8.com/material-rounded/20/delete-sign.png" alt="delete-sign"/>
                        </div>
                    </div>
                    {bg && 
                        <div className='heightRow xm'>
                            <div className=' pt-4'>
                                {bg.description || bg.name}
                            </div>
                            {bg.dimensions_LHW_in_inches !== "0 x 0 x 0" && 
                                <div className="pt-5">
                                    <div>{bg.dimensions_LHW_in_inches} inches</div>
                                    <div>(Length x Height x Width)</div>
                                </div>
                            }
                            {bg.properties_separated_with_double_comma &&
                                <ul className='pt-4'>
                                    <div className="divideByTwoWithGap ">
                                        {bg?.properties_separated_with_double_comma.split(',,').map((val,i)=>(
                                            <li key={i}>{val}</li>
                                        ))}
                                    </div>
                                </ul>
                            }
                            {bg.extra_information &&
                                <div className="pt-3 ">
                                    {bg.extra_information}
                                </div>
                            }
                            {(bg.sustainability || bg.product_care) &&
                                <div className='pt-4'>
                                    <Accordion>
                                        {bg.sustainability &&
                                            <Accordion.Item eventKey="0">
                                                <Accordion.Header>Sustainability</Accordion.Header>
                                                <Accordion.Body>
                                                    {bg.sustainability}
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        }
                                        {bg.product_care && 
                                            <Accordion.Item eventKey="1">
                                                <Accordion.Header>Product Care</Accordion.Header>
                                                <Accordion.Body>
                                                    {bg.product_care}
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        }
                                    </Accordion>
                                </div>
                            }
                        </div>
                    }
                </div>
            </div>
            <ZoomModal show={show} setShow={setShow} zoom={zoom} />
        </div>
    )
}

export default BagDetails