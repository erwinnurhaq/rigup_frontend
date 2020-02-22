import React, { Component, lazy, Suspense } from 'react'
import Axios from 'axios'
import { withRouter, Redirect } from 'react-router-dom'
import { Button, TextField, FormControl, InputLabel, Select, MenuItem, FormHelperText, RadioGroup, Radio, FormLabel, FormControlLabel } from '@material-ui/core';
import { connect } from 'react-redux'
import { API_URL } from '../support/API_URL'
import { register } from '../redux/actions'

import Loading from '../components/Loading'
const ModalWarning = lazy(() => import('../components/ModalWarning'))

// RegEx variable
// const minChar = new RegExp(/^(?=.{8,})/)
// const minNum = new RegExp(/^(?=.*\d)/)
// const minLowCase = new RegExp(/^(?=.*[a-z])/)
// const minUpCase = new RegExp(/^(?=.*[A-Z])/)

class Register extends Component {

    state = {
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
        cityList: [],
        modalShow: false
    }

    closeModal = () => this.setState({ modalShow: false })

    componentDidMount() {
        Axios.get(`${API_URL}/users/citylist`)
            .then(res => {
                console.log(res.data)
                this.setState({ cityList: res.data })
            })
            .catch(err => console.log(err))
    }

    onInputChange = e => {
        this.setState({ user: { ...this.state.user, [e.target.id]: e.target.value } })
    }
    onInputNumChange = e => {
        this.setState({ user: { ...this.state.user, [e.target.name]: parseInt(e.target.value) } })
    }

    onRegClick = () => {
        console.log(this.state)
        for (const key in this.state.user) {
            if (this.state.user[key] === '') {
                return this.setState({ modalShow: true })
            }
        }
        this.props.register(this.state.user)
        this.setState({
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
            }
        })
    }

    renderCityList = () => {
        return this.state.cityList.map(i => {
            return (
                <MenuItem key={i.id} value={i.id}>{i.city}</MenuItem>
            )
        })
    }

    render() {
        if (this.props.user.isLogin) {
            return (
                <Redirect to='/' />
            )
        } else {
            return (
                <div className="registerContainer">
                    <form className="formWrapper">
                        <h3 className="formTitle">Join Us!</h3>
                        <div className="formInput">
                            <TextField
                                margin="dense"
                                label="Your full name"
                                id="fullname"
                                type="text"
                                fullWidth
                                value={this.state.fullname}
                                onChange={e => this.onInputChange(e)}
                                required
                            />
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Gender</FormLabel>
                                <RadioGroup
                                    aria-label="gender"
                                    name="genderId"
                                    id="genderId"
                                    value={this.state.user.genderId}
                                    onChange={e => this.onInputNumChange(e)}
                                >
                                    <FormControlLabel value="1" checked={this.state.user.genderId === 1} control={<Radio />} label="Male" />
                                    <FormControlLabel value="2" checked={this.state.user.genderId === 2} control={<Radio />} label="Female" />
                                </RadioGroup>
                            </FormControl>
                            <TextField
                                margin="dense"
                                label="Address"
                                id="address"
                                type="text"
                                fullWidth
                                value={this.state.address}
                                onChange={e => this.onInputChange(e)}
                                required
                            />
                            <FormControl required>
                                <InputLabel id="selectCity">City</InputLabel>
                                <Select
                                    labelId="cityId"
                                    id="cityId"
                                    name="cityId"
                                    value={this.state.user.cityId}
                                    onChange={e => this.onInputNumChange(e)}
                                >
                                    <MenuItem value="0"><em>Please select one:</em></MenuItem>
                                    {this.renderCityList()}
                                </Select>
                                <FormHelperText>Required</FormHelperText>
                            </FormControl>
                            <TextField
                                margin="dense"
                                label="Phone"
                                id="phone"
                                type="number"
                                fullWidth
                                value={this.state.phone}
                                onChange={e => this.onInputChange(e)}
                                required
                            />
                            <TextField
                                margin="dense"
                                label="Your email"
                                id="email"
                                type="email"
                                fullWidth
                                value={this.state.email}
                                onChange={e => this.onInputChange(e)}
                                required
                            />
                            <TextField
                                margin="dense"
                                label="Your username (min. 8 characters)"
                                id="username"
                                type="text"
                                fullWidth
                                value={this.state.username}
                                onChange={e => this.onInputChange(e)}
                                required
                            />
                            <TextField
                                margin="dense"
                                label="Your password"
                                id="password"
                                type="password"
                                fullWidth
                                value={this.state.password}
                                onChange={e => this.onInputChange(e)}
                                required
                            />
                            <TextField
                                margin="dense"
                                label="Confirm password"
                                id="confirmPass"
                                type="password"
                                fullWidth
                                value={this.state.confirmPass}
                                onChange={e => this.onInputChange(e)}
                                required
                            />
                        </div>
                        <div className="btnContainer">
                            <Button variant='contained' onClick={this.onRegClick}>Register</Button>
                        </div>
                    </form>
                    {this.state.modalShow ? (
                        <Suspense fallback={<Loading />}>
                            <ModalWarning
                                show={this.state.modalShow}
                                setShow={this.closeModal}
                            >Cannot Blank!</ModalWarning>
                        </Suspense>
                    ) : null}
                </div>
            )
        }
    }
}

const stateToProps = ({ user }) => {
    return {
        user
    }
}

export default withRouter(connect(stateToProps, { register })(Register))
