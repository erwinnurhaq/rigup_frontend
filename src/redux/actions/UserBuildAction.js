import axios from 'axios'
import { API_URL } from '../../support/API_URL'
import {
    USER_BUILD_LOADING,
    USER_BUILD_FETCHED,
    USER_BUILD_ERROR
} from './Types'

const error = (err) => {
    let error = err.response && Object.keys(err.response).length >= 0 ? err.response.data.message : 'Cannot connect to API'
    return {
        type: USER_BUILD_ERROR,
        payload: error
    }
}

export const getUserBuild = () => {
    return async (dispatch) => {
        try {
            dispatch({ type: USER_BUILD_LOADING })
            const token = localStorage.getItem('riguptoken')
            const res = await axios.get(`${API_URL}/builds/user`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            dispatch({
                type: USER_BUILD_FETCHED,
                payload: res.data
            })
        } catch (err) {
            dispatch(error(err))
        }
    }
}

export const addBuild = (build) => {
    return async (dispatch) => {
        try {
            dispatch({ type: USER_BUILD_LOADING })
            const token = localStorage.getItem('riguptoken')
            const res = await axios.post(`${API_URL}/builds/user`, build, {
                headers: { Authorization: `Bearer ${token}` }
            })
            dispatch({
                type: USER_BUILD_FETCHED,
                payload: res.data
            })
        } catch (err) {
            dispatch(error(err))
        }
    }
}

export const deleteBuild = (buildId) => {
    return async (dispatch) => {
        try {
            dispatch({ type: USER_BUILD_LOADING })
            const token = localStorage.getItem('riguptoken')
            const res = await axios.delete(`${API_URL}/builds/user`, {
                params: { id: buildId },
                headers: { Authorization: `Bearer ${token}` }
            })
            dispatch({
                type: USER_BUILD_FETCHED,
                payload: res.data
            })
        } catch (err) {
            dispatch(error(err))
        }
    }
}
