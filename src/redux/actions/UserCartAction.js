import axios from 'axios'
import { API_URL } from '../../support/API_URL'

const error = (err) => {
    let error = err.response && Object.keys(err.response).length >= 0 ? err.response.data.message : 'Cannot connect to API'
    return {
        type: 'USER_CART_ERROR',
        payload: error
    }
}

export const getUserCart = () => {
    return async (dispatch) => {
        try{
            dispatch({type: 'USER_CART_LOADING'})
            const token = localStorage.getItem('riguptoken')
            const res = await axios.get(`${API_URL}/carts/user`,{
                headers: {Authorization: `Bearer ${token}`}
            })
            dispatch({
                type: 'USER_CART_FETCHED',
                payload: res.data
            })
        } catch (err) {
            dispatch(error(err))
        }
    }
}

export const addCart = (cart) => {
    return async (dispatch) => {
        try{
            dispatch({type: 'USER_CART_LOADING'})
            const token = localStorage.getItem('riguptoken')
            const res = await axios.post(`${API_URL}/carts/user`, cart,{
                headers: {Authorization: `Bearer ${token}`}
            })
            dispatch({
                type: 'USER_CART_FETCHED',
                payload: res.data
            })
        } catch (err) {
            dispatch(error(err))
        }
    }
}

export const editCart = (cartId, quantity) => {
    return async (dispatch) => {
        try{
            dispatch({type: 'USER_CART_LOADING'})
            const token = localStorage.getItem('riguptoken')
            const res = await axios.put(`${API_URL}/carts/user`, {
                id: cartId, quantity
            },{
                headers: {Authorization: `Bearer ${token}`}
            })
            dispatch({
                type: 'USER_CART_FETCHED',
                payload: res.data
            })
        } catch (err) {
            dispatch(error(err))
        }
    }
}

export const deleteCart = (cartId) => {
    return async (dispatch) => {
        try{
            dispatch({type: 'USER_CART_LOADING'})
            const token = localStorage.getItem('riguptoken')
            const res = await axios.delete(`${API_URL}/carts/user`, {
                params: {id: cartId},
                headers: {Authorization: `Bearer ${token}`}
            })
            dispatch({
                type: 'USER_CART_FETCHED',
                payload: res.data
            })
        } catch (err) {
            dispatch(error(err))
        }
    }
}

export const emptyCart = () => {
    return {type: 'USER_CART_EMPTY'}
}