import React, { useState, lazy, Suspense, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Button } from '@material-ui/core'

import { resendVerification, userLogout } from '../redux/actions'
import Loading from '../components/Loading'
const ModalWarning = lazy(() => import('../components/ModalWarning'))


const Verification = () => {
    const dispatch = useDispatch()
    const [modalShow, setModalShow] = useState(false)
    const { user, loading } = useSelector(({ user }) => user)

    const onResendClick = () => {
        setModalShow(!modalShow)
        dispatch(resendVerification(user.id, user.email))
    }

    const renderModalWarning = () => modalShow ? (
        <Suspense fallback={<Loading />}>
            <ModalWarning
                show={modalShow}
                setShow={setModalShow}
                title={loading ? 'Please Wait' : 'Success!'}
            >{loading ? 'Sending Email...' : 'Verification link has been sent'}</ModalWarning>
        </Suspense>
    ) : null

    useEffect(() => {
        document.title = 'Verification - RIGUP!'
        return () => {
            dispatch(userLogout())
        }
    }, [])

    if (user && user.verified === 1) {
        return <Redirect to='/' />
    } else if (user && user.verified === 0) {
        return (
            <div className="verificationContainer">
                <div className="title">V E R I F Y</div>
                <div className="contentWrapper">
                    <div>
                        <h3>Thank you!</h3>
                        <p>You haven't verified yet</p>
                        <p>Please check your email inbox to verify</p>
                    </div>
                    <div>
                        <p>Verification link is not received?</p>
                        <Button variant='outlined' onClick={onResendClick}>Resend verification</Button>
                    </div>
                </div>
                {renderModalWarning()}
            </div>
        )
    } else {
        return <Redirect to='/register' />
    }
}

export default Verification
