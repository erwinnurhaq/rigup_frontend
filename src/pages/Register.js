import React, { useState, useEffect, lazy, Suspense } from 'react'
import Axios from 'axios'
import { Redirect } from 'react-router-dom'
import { Button, TextField, FormControl, InputLabel, Select, MenuItem, FormHelperText, RadioGroup, Radio, FormControlLabel } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux'
import { API_URL } from '../support/API_URL'
import { register } from '../redux/actions'

import Loading from '../components/Loading'
const ModalWarning = lazy(() => import('../components/ModalWarning'))

const Register = () => {

    let initialState = {
        user: {
            fullname: '',
            genderId: '',
            address: '',
            cityId: '',
            phone: '',
            email: '',
            username: '',
            password: '',
            confirmPass: ''
        },
        cityList: []
    }
    const dispatch = useDispatch()
    const [state, setState] = useState(initialState)
    const [modalShow, setModalShow] = useState(false)
    const [warningMessage, setWarningMessage] = useState('')
    const currentUser = useSelector(({ user }) => user)

    // RegEx variable
    const minChar = new RegExp(/^(?=.{8,})/)
    const minNum = new RegExp(/^(?=.*\d)/)
    const minLowCase = new RegExp(/^(?=.*[a-z])/)
    const minUpCase = new RegExp(/^(?=.*[A-Z])/)

    //check form for appropriate characters
    const nameChecked = minChar.test(state.user.username);
    const passCharChecked = minChar.test(state.user.password);
    const passNumChecked = minNum.test(state.user.password);
    const passLowCaseChecked = minLowCase.test(state.user.password);
    const passUpCaseChecked = minUpCase.test(state.user.password);

    useEffect(() => {
        document.title = 'Register - RIGUP!'
        Axios.get(`${API_URL}/ro/city`)
            .then(res => {
                console.log(res.data)
                setState({ ...state, cityList: res.data })
            })
            .catch(err => console.log(err))
    }, [])

    const onInputChange = e => {
        setState({
            ...state,
            user: { ...state.user, [e.target.id]: e.target.value }
        })
    }
    const onInputNumChange = e => {
        setState({
            ...state,
            user: { ...state.user, [e.target.name]: parseInt(e.target.value) }
        })
    }

    const warning = message => {
        setWarningMessage(message)
        setModalShow(!modalShow)
    }

    //-----------------------------------------------------------------
    const onRegClick = async () => {
        //check form not blank
        for (const key in state.user) {
            if (state.user[key] === '') {
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
        if (state.user.password !== state.user.confirmPass) {
            return warning('Password and Confirm Password is incorrect!')
        }
        // //do register
        await dispatch(register(state.user))
        setState(initialState)
    }
    //-----------------------------------------------------------------

    const renderCityList = () => state.cityList.map(i => (
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


    if (currentUser.user) {
        return (
            <Redirect to='/' />
        )
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
                            value={state.fullname}
                            onChange={onInputChange}
                            required
                        />
                        <FormControl component="fieldset">
                            <RadioGroup
                                aria-label="gender"
                                name="genderId"
                                id="genderId"
                                value={state.user.genderId}
                                onChange={onInputNumChange}
                            >
                                <div style={{ display: 'flex' }}>
                                    <FormControlLabel
                                        value="1"
                                        checked={state.user.genderId === 1}
                                        style={{ fontSize: '12px' }}
                                        control={<Radio />}
                                        label="Male" />
                                    <FormControlLabel
                                        value="2"
                                        checked={state.user.genderId === 2}
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
                            value={state.address}
                            onChange={onInputChange}
                            required
                        />
                        <FormControl required>
                            <InputLabel id="selectCity">City</InputLabel>
                            <Select
                                labelId="cityId"
                                id="cityId"
                                name="cityId"
                                value={state.user.cityId}
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
                            value={state.phone}
                            onChange={onInputChange}
                            required
                        />
                        <TextField
                            margin="dense"
                            label="Your email"
                            id="email"
                            type="email"
                            fullWidth
                            value={state.email}
                            onChange={onInputChange}
                            required
                        />
                        <TextField
                            margin="dense"
                            label="Your username (min. 8 characters)"
                            id="username"
                            type="text"
                            fullWidth
                            value={state.username}
                            onChange={onInputChange}
                            required
                        />
                        <TextField
                            margin="dense"
                            label="Your password"
                            id="password"
                            type="password"
                            fullWidth
                            value={state.password}
                            onChange={onInputChange}
                            required
                        />
                        <TextField
                            margin="dense"
                            label="Confirm password"
                            id="confirmPass"
                            type="password"
                            fullWidth
                            value={state.confirmPass}
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
            </div>
        )
    }
}


export default Register
