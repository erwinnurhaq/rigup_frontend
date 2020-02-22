import axios from 'axios'
import { API_URL } from '../../support/API_URL'

const error = (err) => {
    let error = err.response ? err.response.data.error : 'Cannot connect to API'
    return {
        type: 'BRAND_ERROR',
        payload: error
    }
}

export const getAllBrands = () => {
    return async dispatch => {
        try {
            const res = await axios.get(`${API_URL}/brands`)
            console.log(res.data)
            dispatch({
                type: 'BRAND_FETCH_SUCCESS',
                payload: res.data
            })
        } catch (err) {
            dispatch(error(err))
        }
    }
}

export const getBrandByCategory = categoryId => {
    return async dispatch => {
        try {
            const res = await axios.post(`${API_URL}/brands/brandcat`, null, {
                params: { categoryId }
            })
            console.log(res.data)
            dispatch({
                type: 'BRANDBYCATEGORY_FETCH_SUCCESS',
                payload: res.data
            })
        } catch (err) {
            dispatch(error(err))
        }
    }
}

export const getBrandCat = () => {
    return async dispatch => {
        try {
            const res = await axios.get(`${API_URL}/brands/brandcat`)
            console.log(res.data)
            dispatch({
                type: 'BRANDCAT_FETCH_SUCCESS',
                payload: res.data
            })
        } catch (err) {
            dispatch(error(err))
        }
    }
}

export const assignBrandCat = (body) => {
    return async dispatch => {
        try {
            const res = await axios.post(`${API_URL}/brands/assignbrandcat`, body)
            console.log(res.data)
            dispatch(getBrandCat())
        } catch (err) {
            dispatch(error(err))
        }
    }
}