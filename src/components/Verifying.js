import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Loading from './Loading'
import { useParams, Redirect } from 'react-router-dom'
import { newUserVerification } from '../redux/actions'

const Verifying = () => {

    const { usertoken } = useParams()
    const dispatch = useDispatch()
    const user = useSelector(({ user }) => user)

    useEffect(() => {
        dispatch(newUserVerification(usertoken))
    }, [dispatch, usertoken])

    console.log('usertoken: ', usertoken)

    if (user.error) {
        return <div>{user.error}</div>
    } else if (user.user && user.user.verified === 1) {
        return <Redirect to='/' />
    } else {
        return <div><Loading /></div>
    }
}

export default Verifying
