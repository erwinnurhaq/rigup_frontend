import React, { useState, Suspense } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, withRouter } from 'react-router-dom'
import { TextField, InputAdornment, IconButton, Button } from '@material-ui/core'
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import Loading from '../components/Loading'
import ModalDefault from '../components/ModalDefault'
import { resetPassword } from '../redux/actions'
import { useEffect } from 'react';

const ResetPassword = (props) => {
    const { usertoken } = useParams()
    const dispatch = useDispatch()
    const user = useSelector(({ user }) => user)
    const initialState = {
        passwordReset: '',
        confirmPasswordReset: ''
    }
    const [state, setState] = useState(initialState)
    const [showModalLoading, setShowModalLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    console.log('usertoken: ', usertoken)

    // RegEx variable
    const minChar = new RegExp(/^(?=.{8,})/)
    const minNum = new RegExp(/^(?=.*\d)/)
    const minLowCase = new RegExp(/^(?=.*[a-z])/)
    const minUpCase = new RegExp(/^(?=.*[A-Z])/)

    //check form for appropriate characters
    const passCharChecked = minChar.test(state.passwordReset);
    const passNumChecked = minNum.test(state.passwordReset);
    const passLowCaseChecked = minLowCase.test(state.passwordReset);
    const passUpCaseChecked = minUpCase.test(state.passwordReset);

    const onResetPassword = async () => {
        //check form not blank
        for (const key in state) {
            if (state[key] === '') {
                return alert('Please fill the form correctly!')
            }
        }
        //check appropriate characters is all OK
        if (!passCharChecked
            || !passNumChecked
            || !passLowCaseChecked
            || !passUpCaseChecked) {
            return alert('Password is incorrect!')
        }
        //check confirm pass
        if (state.passwordReset !== state.confirmPasswordReset) {
            return alert('Password and Confirm Password is incorrect!')
        }
        //do reset
        setShowModalLoading(true)
        await dispatch(resetPassword(state.passwordReset, usertoken))
    }

    const onInputChange = e => {
        let x = e.target.value
        if (x.includes(' ')) x = x.replace(' ', '')
        setState({ ...state, [e.target.id]: x })
    }

    const onKeyUp = e => {
        if (e.key === "Enter") {
            onResetPassword()
        }
    }

    useEffect(() => {
        document.title = 'Reset Password - RIGUP!'
    }, [])

    const renderModalLoading = () => showModalLoading ? (
        <Suspense fallback={<Loading />}>
            <ModalDefault show={showModalLoading} title='Processing' >
                <div>{user.loading ? <Loading /> : user.error ? (
                    <div style={{ padding: '0 50px' }}>
                        <p style={{ paddingBottom: '25px' }}>{user.error}</p>
                        <Button variant='text' onClick={() => setShowModalLoading(false)}>Close</Button>
                    </div>
                ) : (
                        <div style={{ padding: '0 50px' }}>
                            <p style={{ paddingBottom: '25px' }}>Reset password success, you can now login with your new password.</p>
                            <Button variant='text' color='secondary' onClick={() => props.history.push('/login')}>Go to Login</Button>
                        </div>
                    )}</div>
            </ModalDefault>
        </Suspense>
    ) : null

    return (
        <div className='loginContainer'>
            <div className="title">R E S E T</div>
            <div className="formWrapper">
                <form>
                    <TextField
                        margin="dense" label="Enter New Password" id="passwordReset" type={showPassword ? 'text' : 'password'}
                        value={state.passwordReset}
                        onChange={onInputChange}
                        fullWidth required
                        InputProps={{
                            endAdornment: <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => setShowPassword(!showPassword)}
                                    onMouseDown={e => e.preventDefault()}
                                >
                                    {showPassword ? <Visibility style={{ color: 'whitesmoke' }} /> : <VisibilityOff style={{ color: 'grey' }} />}
                                </IconButton>
                            </InputAdornment>
                        }}
                    />
                    <TextField
                        margin="dense" label="Confirm New Password" id="confirmPasswordReset" type="password"
                        value={state.confirmPasswordReset}
                        onChange={onInputChange}
                        onKeyUp={onKeyUp}
                        fullWidth required
                    />
                    <div className="btnContainer">
                        <Button variant='outlined' style={{ color: 'darkviolet', borderColor: 'darkviolet', margin: '10px 0' }} onClick={onResetPassword}>
                            <p style={{ padding: '0 5px' }}>Reset Password</p>
                        </Button>
                    </div>
                </form>
                <div className="textCheckValid">
                    <div className="passwordCheck" style={{ color: 'lightgrey' }}>
                        <div>Password should at least contain:</div>
                        <div style={{ color: passCharChecked ? '' : 'lightcoral' }}>- 8 characters</div>
                        <div style={{ color: passNumChecked ? '' : 'lightcoral' }}>- A number</div>
                        <div style={{ color: passLowCaseChecked ? '' : 'lightcoral' }}>- A lowercased character</div>
                        <div style={{ color: passUpCaseChecked ? '' : 'lightcoral' }}>- An uppercased character</div>
                    </div>
                </div>
            </div>
            {renderModalLoading()}
        </div>
    )
}

export default withRouter(ResetPassword)
