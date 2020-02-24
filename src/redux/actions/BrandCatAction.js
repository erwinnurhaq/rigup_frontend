import axios from 'axios'
import { API_URL } from '../../support/API_URL'

const error = (err) => {
    let error = err.response ? err.response.data.error : 'Cannot connect to API'
    return {
        type: 'BRANDCAT_ERROR',
        payload: error
    }
}

export const getBrandCat = () => {
    return async dispatch => {
        try {
            dispatch({ type: 'BRANDCAT_LOADING' })
            const res = await axios.get(`${API_URL}/brandcats`)
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

//brandId -> INT, categoryId -> array of INT
export const assignBrandCat = ({ brandId, categoryId }) => {
    return async dispatch => {
        try {
            dispatch({ type: 'BRANDCAT_LOADING' })
            const res = await axios.post(`${API_URL}/brandcats`,
                { brandId, categoryId }
            )
            console.log(res.data)
            dispatch(getBrandCat())
        } catch (err) {
            dispatch(error(err))
        }
    }
}