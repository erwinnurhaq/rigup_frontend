import React, { useState, useEffect, lazy, Suspense } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FormControl, RadioGroup, FormControlLabel, TextField, Radio, InputLabel, Select, MenuItem, Button, DialogActions, InputAdornment, IconButton } from '@material-ui/core'
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import { setRegisterInputAll, setRegisterInput, setRegisterUserInitial, fetchCityList, editProfile, editPassword } from '../redux/actions'
import Loading from '../components/Loading'
const ModalDefault = lazy(() => import('../components/ModalDefault'))

const UserProfile = () => {
    const dispatch = useDispatch()
    const { user, error, loading } = useSelector(({ user }) => user)
    const formRegister = useSelector(({ formRegister }) => formRegister.user)
    const cityList = useSelector(({ formRegister }) => formRegister.cityList)
    const [edit, setEdit] = useState(false)
    const [currentPassword, setCurrentPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [showModalNotif, setShowModalNotif] = useState(false)
    const [showModalEditPassword, setShowModalEditPassword] = useState(false)

    // RegEx variable
    const minChar = new RegExp(/^(?=.{8,})/)
    const minNum = new RegExp(/^(?=.*\d)/)
    const minLowCase = new RegExp(/^(?=.*[a-z])/)
    const minUpCase = new RegExp(/^(?=.*[A-Z])/)

    //check form for appropriate characters
    const passCharChecked = minChar.test(formRegister.password);
    const passNumChecked = minNum.test(formRegister.password);
    const passLowCaseChecked = minLowCase.test(formRegister.password);
    const passUpCaseChecked = minUpCase.test(formRegister.password);

    useEffect(() => {
        document.title = 'User Profile - RIGUP!'
        dispatch(fetchCityList())
    }, [dispatch])

    const onCloseModalEditPassword = () => {
        setShowModalEditPassword(false)
        setCurrentPassword('')
        dispatch(setRegisterUserInitial())
    }

    const onCloseModalNotif = () => {
        setEdit(false)
        setShowModalNotif(false)
        onCloseModalEditPassword()
        dispatch(setRegisterUserInitial())
    }

    const onBtnEditProfile = () => {
        dispatch(setRegisterInputAll({
            fullname: user.fullname,
            genderId: user.gender === 'Male' ? 1 : 2,
            address: user.address,
            cityId: user.cityId,
            phone: user.phone
        }))
        setEdit(true)
    }

    const onCancelEditProfile = () => {
        setEdit(false)
        dispatch(setRegisterUserInitial())
    }

    const onSaveEditProfile = async () => {
        let { fullname, genderId, address, cityId, phone } = formRegister
        if (fullname === '' || genderId === '' || address === '' || cityId === '' || phone === '') {
            return alert('Please fill form correctly!')
        }
        setShowModalNotif(true)
        await dispatch(editProfile({ fullname, genderId, address, cityId, phone }))
    }

    const onSaveEditPassword = async () => {
        let { password, confirmPass } = formRegister
        if (password === '' || confirmPass === '') {
            return alert('Cannot blank!')
        }
        //check appropriate characters is all OK
        if (!passCharChecked
            || !passNumChecked
            || !passLowCaseChecked
            || !passUpCaseChecked) {
            return alert('Password is not correct!')
        }
        //check confirm pass
        if (password !== confirmPass) {
            return alert('Password and confirm pass is not correct!')
        }
        setShowModalNotif(true)
        await dispatch(editPassword(currentPassword, formRegister.password))
    }

    const onKeyUpChangePass = (e) => {
        if (e.key === "Enter") {
            onSaveEditPassword()
        }
    }

    const onInputChange = e => {
        dispatch(setRegisterInput(e.target.id, e.target.value))
    }
    const onInputNumChange = e => {
        dispatch(setRegisterInput(e.target.name, parseInt(e.target.value)))
    }
    const renderCityList = () => cityList.map(i => (
        <MenuItem key={i.city_id} value={i.city_id}>{i.type} {i.city_name}</MenuItem>
    ))

    const modalNotif = () => showModalNotif ? (
        <Suspense fallback={<Loading />}>
            <ModalDefault
                title='Notification'
                size='sm'
                show={showModalNotif}
            >
                <div style={{ padding: '0 50px' }}>
                    {loading ? <Loading /> : error ? error : 'Profile has been updated'}
                </div>
                <DialogActions>
                    <Button variant='text' onClick={onCloseModalNotif} >Close</Button>
                </DialogActions>
            </ModalDefault>
        </Suspense>
    ) : null

    const modalEditPassword = () => showModalEditPassword ? (
        <Suspense fallback={<Loading />}>
            <ModalDefault
                title='Edit Password'
                size='sm'
                show={showModalEditPassword}
            >
                <div style={{ padding: '0 50px' }}>
                    <TextField
                        margin="dense"
                        label="Your current password"
                        id="currentPass"
                        type='password'
                        fullWidth
                        value={currentPassword}
                        onChange={e => setCurrentPassword(e.target.value)}
                        required
                    />
                    <TextField
                        margin="dense"
                        label="Your new password"
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
                        label="Confirm new password"
                        id="confirmPass"
                        type='password'
                        fullWidth
                        value={formRegister.confirmPass}
                        onChange={onInputChange}
                        onKeyUp={onKeyUpChangePass}
                        required
                    />
                    <div className="passwordCheck">
                        <div>Password should at least contain:</div>
                        <div style={{ color: passCharChecked ? '' : 'lightcoral' }}>- 8 characters</div>
                        <div style={{ color: passNumChecked ? '' : 'lightcoral' }}>- A number</div>
                        <div style={{ color: passLowCaseChecked ? '' : 'lightcoral' }}>- A lowercased character</div>
                        <div style={{ color: passUpCaseChecked ? '' : 'lightcoral' }}>- An uppercased character</div>
                    </div>
                </div>
                <DialogActions>
                    <Button variant='text' onClick={onCloseModalEditPassword} >Close</Button>
                    <Button variant='text' color='secondary' onClick={onSaveEditPassword} >Edit Password</Button>
                </DialogActions>
            </ModalDefault>
        </Suspense>
    ) : null

    return (
        <div className='userProfileContainer'>
            <div className="userProfileWrapper">
                <div className="dataWrapper">
                    <div className="label">Fullname</div>
                    <div className="mid">:</div>
                    <div className="content">
                        {edit ? (
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
                        ) : user.fullname.toUpperCase()}
                    </div>
                </div>
                <div className="dataWrapper">
                    <div className="label">Gender</div>
                    <div className="mid">:</div>
                    <div className="content">
                        {edit ? (
                            <FormControl component="fieldset">
                                <RadioGroup
                                    aria-label="gender"
                                    name="genderId"
                                    id="genderId"
                                    value={formRegister.genderId || 0}
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
                        ) : user.gender}
                    </div>
                </div>
                <div className="dataWrapper">
                    <div className="label">Address</div>
                    <div className="mid">:</div>
                    <div className="content">
                        {edit ? (
                            <TextField
                                margin="dense"
                                label="Address"
                                id="address"
                                type="text"
                                fullWidth
                                value={formRegister.address || ''}
                                onChange={onInputChange}
                                required
                            />
                        ) : user.address}
                    </div>
                </div>
                <div className="dataWrapper">
                    <div className="label">City</div>
                    <div className="mid">:</div>
                    <div className="content">
                        {edit ? (
                            <FormControl required>
                                <InputLabel id="selectCity">City</InputLabel>
                                <Select
                                    labelId="cityId"
                                    id="cityId"
                                    name="cityId"
                                    value={formRegister.cityId || 0}
                                    onChange={onInputNumChange}
                                    style={{ color: 'white' }}
                                >
                                    <MenuItem value="0"><em>Please select one:</em></MenuItem>
                                    {renderCityList()}
                                </Select>
                            </FormControl>
                        ) : user.city}
                    </div>
                </div>
                <div className="dataWrapper">
                    <div className="label">Phone</div>
                    <div className="mid">:</div>
                    <div className="content">
                        {edit ? (
                            <TextField
                                margin="dense"
                                label="Phone"
                                id="phone"
                                type="number"
                                fullWidth
                                value={formRegister.phone || ''}
                                onChange={onInputChange}
                                required
                            />
                        ) : user.phone}
                    </div>
                </div>
                <div className="dataWrapper">
                    <div className="label">Email</div>
                    <div className="mid">:</div>
                    <div className="content">{user.email}</div>
                </div>
                <div className="dataWrapper">
                    <div className="label">Username</div>
                    <div className="mid">:</div>
                    <div className="content">{user.username}</div>
                </div>
                {edit ? (
                    <div className="btnUserProfileContainer">
                        <Button onClick={onSaveEditProfile}>Save Profile</Button>
                        <Button onClick={onCancelEditProfile}>Cancel</Button>
                    </div>
                ) : (
                        <div className="btnUserProfileContainer">
                            <Button onClick={onBtnEditProfile}>Edit Profile</Button>
                            <Button onClick={() => setShowModalEditPassword(true)}>Edit Password</Button>
                        </div>
                    )}
            </div>
            {modalNotif()}
            {modalEditPassword()}
        </div>
    )
}

export default UserProfile
