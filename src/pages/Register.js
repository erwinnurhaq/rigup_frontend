import React, { useState, useEffect, lazy, Suspense } from 'react'
import { Redirect } from 'react-router-dom'
import { Button, TextField, FormControl, InputLabel, Select, MenuItem, FormHelperText, RadioGroup, Radio, FormControlLabel, DialogActions, InputAdornment, IconButton } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { useSelector, useDispatch } from 'react-redux'
import { register, fetchCityList, setRegisterInitial, setRegisterInput } from '../redux/actions'

import Loading from '../components/Loading'
const ModalWarning = lazy(() => import('../components/ModalWarning'))
const ModalDefault = lazy(() => import('../components/ModalDefault'))

const Register = () => {

    const dispatch = useDispatch()
    const [showPassword, setShowPassword] = useState(false)
    const [modalShowLoading, setModalShowLoading] = useState(false)
    const [modalShow, setModalShow] = useState(false)
    const [warningMessage, setWarningMessage] = useState('')
    const currentUser = useSelector(({ user }) => user)
    const formRegister = useSelector(({ formRegister }) => formRegister.user)
    const cityList = useSelector(({ formRegister }) => formRegister.cityList)

    // RegEx variable
    const minChar = new RegExp(/^(?=.{8,})/)
    const minNum = new RegExp(/^(?=.*\d)/)
    const minLowCase = new RegExp(/^(?=.*[a-z])/)
    const minUpCase = new RegExp(/^(?=.*[A-Z])/)

    //check form for appropriate characters
    const nameChecked = minChar.test(formRegister.username);
    const passCharChecked = minChar.test(formRegister.password);
    const passNumChecked = minNum.test(formRegister.password);
    const passLowCaseChecked = minLowCase.test(formRegister.password);
    const passUpCaseChecked = minUpCase.test(formRegister.password);

    useEffect(() => {
        document.title = 'Register - RIGUP!'
        dispatch(fetchCityList())
    }, [dispatch])

    const onInputChange = e => {
        dispatch(setRegisterInput(e.target.id, e.target.value))
    }
    const onInputNumChange = e => {
        dispatch(setRegisterInput(e.target.name, parseInt(e.target.value)))
    }

    const warning = message => {
        setWarningMessage(message)
        setModalShow(!modalShow)
    }

    //-----------------------------------------------------------------
    const onRegClick = async () => {
        //check form not blank
        for (const key in formRegister) {
            if (formRegister[key] === '') {
                return warning('Please fill the form correctly!')
            }
        }
        //check appropriate characters is all OK
        if (!nameChecked
            || !passCharChecked
            || !passNumChecked
            || !passLowCaseChecked
            || !passUpCaseChecked) {
            return warning('Username or Password is incorrect!')
        }
        //check confirm pass
        if (formRegister.password !== formRegister.confirmPass) {
            return warning('Password and Confirm Password is incorrect!')
        }
        // //do register
        setModalShowLoading(!modalShowLoading)
        await dispatch(register(formRegister))
        dispatch(setRegisterInitial())
    }
    //-----------------------------------------------------------------

    const renderCityList = () => cityList.map(i => (
        <MenuItem key={i.city_id} value={i.city_id}>{i.type} {i.city_name}</MenuItem>
    ))

    const renderModalWarning = () => modalShow ? (
        <Suspense fallback={<Loading />}>
            <ModalWarning
                show={modalShow}
                setShow={setModalShow}
                title='Warning'
            >{warningMessage}</ModalWarning>
        </Suspense>
    ) : null

    const renderModalLoading = () => modalShowLoading ? (
        <Suspense fallback={<Loading />}>
            <ModalDefault
                show={modalShowLoading}
                title='Registering'
            >
                <div>{currentUser.error ? currentUser.error : <Loading />}</div>
                <DialogActions>
                    <Button
                        variant='text'
                        onClick={() => setModalShowLoading(!modalShowLoading)}
                    >Close</Button>
                </DialogActions>
            </ModalDefault>
        </Suspense>
    ) : null


    if (currentUser.user && currentUser.user.verified === 1) {
        return <Redirect to='/' />
    } else if (currentUser.user && currentUser.user.verified === 0) {
        return <Redirect to='/verification' />
    } else {
        return (
            <div className="registerContainer">
                <div className="title">J O I N U S</div>
                <form className="formWrapper">
                    <div className="formInput">
                        <TextField
                            margin="dense"
                            label="Your full name"
                            id="fullname"
                            type="text"
                            fullWidth
                            value={formRegister.fullname}
                            onChange={onInputChange}
                            required
                        />
                        <FormControl component="fieldset">
                            <RadioGroup
                                aria-label="gender"
                                name="genderId"
                                id="genderId"
                                value={formRegister.genderId}
                                onChange={onInputNumChange}
                            >
                                <div style={{ display: 'flex' }}>
                                    <FormControlLabel
                                        value="1"
                                        checked={formRegister.genderId === 1}
                                        style={{ fontSize: '12px' }}
                                        control={<Radio />}
                                        label="Male" />
                                    <FormControlLabel
                                        value="2"
                                        checked={formRegister.genderId === 2}
                                        style={{ fontSize: '12px' }}
                                        control={<Radio />}
                                        label="Female" />
                                </div>
                            </RadioGroup>
                        </FormControl>
                        <TextField
                            margin="dense"
                            label="Address"
                            id="address"
                            type="text"
                            fullWidth
                            value={formRegister.address}
                            onChange={onInputChange}
                            required
                        />
                        <FormControl required>
                            <InputLabel id="selectCity">City</InputLabel>
                            <Select
                                labelId="cityId"
                                id="cityId"
                                name="cityId"
                                value={formRegister.cityId}
                                onChange={onInputNumChange}
                                style={{ color: 'white' }}
                            >
                                <MenuItem value="0"><em>Please select one:</em></MenuItem>
                                {renderCityList()}
                            </Select>
                            <FormHelperText>Required</FormHelperText>
                        </FormControl>
                        <TextField
                            margin="dense"
                            label="Phone"
                            id="phone"
                            type="number"
                            fullWidth
                            value={formRegister.phone}
                            onChange={onInputChange}
                            required
                        />
                        <TextField
                            margin="dense"
                            label="Your email"
                            id="email"
                            type="email"
                            fullWidth
                            value={formRegister.email}
                            onChange={onInputChange}
                            required
                        />
                        <TextField
                            margin="dense"
                            label="Your username (min. 8 characters)"
                            id="username"
                            type="text"
                            fullWidth
                            value={formRegister.username}
                            onChange={onInputChange}
                            required
                        />
                        <TextField
                            margin="dense"
                            label="Your password"
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            fullWidth
                            value={formRegister.password}
                            onChange={onInputChange}
                            required
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
                            margin="dense"
                            label="Confirm password"
                            id="confirmPass"
                            type={showPassword ? 'text' : 'password'}
                            fullWidth
                            value={formRegister.confirmPass}
                            onChange={onInputChange}
                            required
                        />
                        <div className="btnContainer">
                            <Button variant='outlined' onClick={onRegClick}>Register</Button>
                        </div>
                    </div>
                    <div className="textCheckValid">
                        <div className="usernameCheck">
                            <div>Username should at least contain:</div>
                            <div style={{ color: nameChecked ? '' : 'lightcoral' }}>- 8 characters</div>
                        </div>
                        <div className="passwordCheck">
                            <div>Password should at least contain:</div>
                            <div style={{ color: passCharChecked ? '' : 'lightcoral' }}>- 8 characters</div>
                            <div style={{ color: passNumChecked ? '' : 'lightcoral' }}>- A number</div>
                            <div style={{ color: passLowCaseChecked ? '' : 'lightcoral' }}>- A lowercased character</div>
                            <div style={{ color: passUpCaseChecked ? '' : 'lightcoral' }}>- An uppercased character</div>
                        </div>
                    </div>
                </form>
                {renderModalWarning()}
                {renderModalLoading()}
            </div>
        )
    }
}


export default Register
