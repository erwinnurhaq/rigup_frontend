import axios from 'axios'
import { API_URL } from '../../support/API_URL'

export const fetchCarouselContent = () => {
    return async dispatch => {
        try {
            const res = await axios.get(`${API_URL}/carousels`)
            dispatch({ type: 'CAROUSEL_CONTENT_FETCHED', payload: res.data })
        } catch (err) {
            console.log(err)
        }
    }
}