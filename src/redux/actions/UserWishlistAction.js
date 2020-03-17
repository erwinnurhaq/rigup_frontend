import axios from 'axios'
import { API_URL } from '../../support/API_URL'

const error = (err) => {
    let error = err.response && Object.keys(err.response).length >= 0 ? err.response.data.message : 'Cannot connect to API'
    return {
        type: 'USER_WISHLIST_ERROR',
        payload: error
    }
}

export const getUserWishlist = () => {
    return async (dispatch) => {
        try {
            dispatch({ type: 'USER_WISHLIST_LOADING' })
            const token = localStorage.getItem('riguptoken')
            const res = await axios.get(`${API_URL}/wishlists/user`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            dispatch({
                type: 'USER_WISHLIST_FETCHED',
                payload: res.data
            })
        } catch (err) {
            dispatch(error(err))
        }
    }
}

export const addWishlist = (productId) => {
    return async (dispatch) => {
        try {
            dispatch({ type: 'USER_WISHLIST_LOADING' })
            const token = localStorage.getItem('riguptoken')
            const res = await axios.post(`${API_URL}/wishlists/user`, { productId }, {
                headers: { Authorization: `Bearer ${token}` }
            })
            dispatch({
                type: 'USER_WISHLIST_FETCHED',
                payload: res.data
            })
        } catch (err) {
            dispatch(error(err))
        }
    }
}

export const deleteWishlist = (wishlistId) => {
    return async (dispatch) => {
        try {
            dispatch({ type: 'USER_WISHLIST_LOADING' })
            const token = localStorage.getItem('riguptoken')
            const res = await axios.delete(`${API_URL}/wishlists/user`, {
                params: { id: wishlistId },
                headers: { Authorization: `Bearer ${token}` }
            })
            dispatch({
                type: 'USER_WISHLIST_FETCHED',
                payload: res.data
            })
        } catch (err) {
            dispatch(error(err))
        }
    }
}

export const emptyWishlist = () => {
    return { type: 'USER_WISHLIST_EMPTY' }
}