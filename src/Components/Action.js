import axios from "axios"
import { ADD_CART_FAIL, ADD_CART_REQUEST, ADD_CART_SUCCESS, ADD_WISH_FAIL, ADD_WISH_REQUEST, ADD_WISH_SUCCESS, ALL_BAGS_FAIL, ALL_BAGS_REQUEST, ALL_BAGS_SUCCESS, BAG_DETAIL_FAIL, BAG_DETAIL_REQUEST, BAG_DETAIL_SUCCESS, CHECKOUT_FAIL, CHECKOUT_REQUEST, CHECKOUT_SUCCESS, FEATURED_BAGS_FAIL, FEATURED_BAGS_REQUEST, FEATURED_BAGS_SUCCESS, HOME_VIEW_FAIL, HOME_VIEW_REQUEST, HOME_VIEW_SUCCESS, PERSONALIZED_BAG_FAIL, PERSONALIZED_BAG_REQUEST, PERSONALIZED_BAG_SUCCESS } from "./Constants"
import { ADJUST_HEIGHT_FAIL, ADJUST_HEIGHT_REQUEST, ADJUST_HEIGHT_SUCCESS } from "./Constants"



export const cartAddAction =() => async(dispatch) =>{
    
    try{
        dispatch({type: ADD_CART_REQUEST})
        dispatch({
            type: ADD_CART_SUCCESS,
            payload: JSON.parse(localStorage.getItem(`cartItems`)) ? JSON.parse(localStorage.getItem(`cartItems`)) : []
        })
    } catch(error){
        dispatch({
            type : ADD_CART_FAIL,
            payload : []
        })
    }
}
export const hightAddAction =() => async(dispatch) =>{
    
    try{
        dispatch({type: ADJUST_HEIGHT_REQUEST})
        dispatch({
            type: ADJUST_HEIGHT_SUCCESS,
            payload: JSON.parse(localStorage.getItem(`hightItems`)) ? JSON.parse(localStorage.getItem(`hightItems`)) : []
        })
    } catch(error){
        dispatch({
            type : ADJUST_HEIGHT_FAIL,
            payload : []
        })
    }
}
export const wishAddAction =() => async(dispatch) =>{
    
    try{
        dispatch({type: ADD_WISH_REQUEST})
        dispatch({
            type: ADD_WISH_SUCCESS,
            payload: JSON.parse(localStorage.getItem(`wishItems`)) ? JSON.parse(localStorage.getItem(`wishItems`)) : []
        })
    } catch(error){
        dispatch({
            type : ADD_WISH_FAIL,
            payload : []
        })
    }
}
export const bagDetailAction =(x=0) => async(dispatch,getState) =>{
    
    try{
        dispatch({type: BAG_DETAIL_REQUEST})
        const headers= {
            "Content-type":"application/json"
        }
        const {data} = await axios.post(
            `${process.env.REACT_APP_BASE_URL}/api/bag_detail/${x}`,
            headers
        )
        dispatch({
            type: BAG_DETAIL_SUCCESS,
            payload: data
        })
    } catch(error){
        dispatch({
            type : BAG_DETAIL_FAIL,
            payload : error.response && error.response.data.detail ? error.response.data.detail : error.message
        })
    }
}
export const allBagsAction =(route,uri=null) => async(dispatch,getState) =>{
    try{
        dispatch({type: ALL_BAGS_REQUEST})
        const headers= {
            "Content-type":"application/json"
        }
        const url = uri ? `${process.env.REACT_APP_BASE_URL}/api/search${uri?.search && `?query=${uri?.search}`}${uri?.page && `&page=${uri?.page}`}` : ''
        const {data} = await axios.get(uri ? url :
            `${process.env.REACT_APP_BASE_URL}/api/${route ? "new_bags" : "bags"}`,
            headers
        )
        dispatch({
            type: ALL_BAGS_SUCCESS,
            payload: data
        })
    } catch(error){
        dispatch({
            type : ALL_BAGS_FAIL,
            payload : error.response?.data?.detail ? error.response.data.detail : error.message
        })
    }
}

export const checkoutAction =(x) => async(dispatch,getState) =>{
    
    try{
        dispatch({type: CHECKOUT_REQUEST})
        const headers= {
            "Content-type":"application/json"
        }
        const {data} = await axios.post(
            `${process.env.REACT_APP_BASE_URL}/api/checkout`,
            x,
            headers
        )
        dispatch({
            type: CHECKOUT_SUCCESS,
            payload: data
        })
    } catch(error){
        dispatch({
            type : CHECKOUT_FAIL,
            payload : error.response && error.response.data.detail ? error.response.data.detail : error.message
        })
    }
}

export const personalRequestAction =(x) => async(dispatch,getState) =>{
    
    try{
        dispatch({type: PERSONALIZED_BAG_REQUEST})
        const headers= {
            "Content-type":"application/json"
        }
        const {data} = await axios.post(
            `${process.env.REACT_APP_BASE_URL}/api/request-bag`,
            x,
            headers
        )
        dispatch({
            type: PERSONALIZED_BAG_SUCCESS,
            payload: data
        })
    } catch(error){
        dispatch({
            type : PERSONALIZED_BAG_FAIL,
            payload : error.response && error.response.data.detail ? error.response.data.detail : error.message
        })
    }
}

