import axios from 'axios'
import { API_URL } from '../../support/API_URL'
import {
    BRANDCAT_LOADING,
    BRANDCAT_ERROR,
    BRANDCAT_FETCH_SUCCESS
} from './Types'

const error = (err) => {
    let error = err.response && Object.keys(err.response).length >= 0 ? err.response.data.message : 'Cannot connect to API'
    return {
        type: BRANDCAT_ERROR,
        payload: error
    }
}

export const getBrandCat = () => {
    return async dispatch => {
        try {
            dispatch({ type: BRANDCAT_LOADING })
            const res = await axios.get(`${API_URL}/brandcats`)
            console.log('brand categories: ', res.data)
            dispatch({
                type: BRANDCAT_FETCH_SUCCESS,
                payload: res.data
            })
        } catch (err) {
            dispatch(error(err))
        }
    }
}

//brandId -> INT, categoryId -> array of INT
export const assignBrandCat = ({ brandId, categoryId }) => {
    return async dispatch => {
        try {
            dispatch({ type: BRANDCAT_LOADING })
            const token = localStorage.getItem('riguptoken')
            const res = await axios.post(`${API_URL}/brandcats`,
                { brandId, categoryId },
                { headers: { Authorization: `Bearer ${token}` } }
            )
            console.log('assign brandCat: ', res.data)
            dispatch(getBrandCat())
        } catch (err) {
            dispatch(error(err))
        }
    }
}