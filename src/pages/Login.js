import React, { Component, lazy, Suspense } from 'react'
import { connect } from 'react-redux'
import { TextField, Button, FormControlLabel, Checkbox, InputAdornment, IconButton, DialogActions } from '@material-ui/core'
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import { userLogin, userLogout, sendEmailResetPassword } from '../redux/actions'
import { Redirect, Link } from 'react-router-dom'

import Loading from '../components/Loading'
const ModalWarning = lazy(() => import('../components/ModalWarning'))
const ModalDefault = lazy(() => import('../components/ModalDefault'))

class Login extends Component {
    state = {
        modalShow: false,
        modalResetShow: false,
        modalResetSuccessShow: false,
        emailReset: '',
        userOrEmail: '',
        password: '',
        keepLogin: false,
        showPassword: false
    }

    componentDidMount() {
        document.title = 'Login - RIGUP!'
    }

    closeModal = () => this.setState({ modalShow: false })
    closeModalReset = () => this.setState({ modalResetShow: false })
    closeModalResetSuccess = () => this.setState({ modalResetSuccessShow: false })

    onInputChange = e => {
        let x = e.target.value
        if (x.includes(' ')) x = x.replace(' ', '')
        this.setState({ [e.target.id]: x })
    }

    onLoginClick = async () => {
        const { userOrEmail, password, keepLogin } = this.state
        if (userOrEmail === '' || password === '') {
            return this.setState({ modalShow: true })
        }
        this.setState({ userOrEmail: '', password: '', keepLogin: false })
        await this.props.userLogin({ userOrEmail, password, keepLogin })
    }

    onKeyUp = e => {
        if (e.key === "Enter") {
            this.onLoginClick()
        }
    }

    onBtnForgotPasswordClick = () => {
        this.props.userLogout()
        this.setState({ modalResetShow: true })
    }

    onBtnResetClick = async () => {
        console.log('ok')
        await this.props.sendEmailResetPassword(this.state.emailReset)
        if (!this.props.user.error) {
            this.setState({ modalResetShow: false, modalResetSuccessShow: true })
        }
    }

    onKeyUpResetPassword = e => {
        if (e.key === "Enter") {
            this.onBtnResetClick()
        }
    }

    modalCannotBlank = () => this.state.modalShow ? (
        <Suspense fallback={<Loading />}>
            <ModalWarning
                show={this.state.modalShow}
                setShow={this.closeModal}
            >Cannot Blank!</ModalWarning>
        </Suspense>
    ) : null

    modalResetSuccess = () => this.state.modalResetSuccessShow ? (
        <Suspense fallback={<Loading />}>
            <ModalWarning
                title='Success'
                show={this.state.modalResetSuccessShow}
                setShow={this.closeModalResetSuccess}
            >Reset link has been sent and valid for 1 hour, please check your email!</ModalWarning>
        </Suspense>
    ) : null

    modalResetPassword = () => this.state.modalResetShow ? (
        <Suspense fallback={<Loading />}>
            <ModalDefault
                title='Forgot Password'
                size='sm'
                show={this.state.modalResetShow}
            >
                <div style={{ padding: '0 50px' }}>
                    <TextField
                        margin="dense" label="Email Address" id="emailReset" type="text"
                        value={this.state.emailReset}
                        onChange={this.onInputChange}
                        onKeyUp={this.onKeyUpResetPassword}
                        fullWidth required
                    />
                    <div>{this.props.user.loading ? <Loading /> : this.props.user.error ? this.props.user.error : ''}</div>
                </div>
                <DialogActions>
                    <Button variant='text' onClick={this.closeModalReset} >Close</Button>
                    <Button variant='text' color='secondary' onClick={this.onBtnResetClick} >Reset</Button>
                </DialogActions>
            </ModalDefault>
        </Suspense>
    ) : null

    render() {
        if (this.props.user.user && this.props.user.user.verified === 1) {
            return <Redirect to={localStorage.getItem('rigupprevpath') || '/'} />
        } else if (this.props.user.user && this.props.user.user.verified === 0) {
            return <Redirect to='/verification' />
        } else {
            return (
                <div className="loginContainer">
                    <div className="title">L O G I N</div>
                    <div className="formWrapper">
                        <form>
                            <TextField
                                margin="dense" label="Username Or Email" id="userOrEmail" type="text"
                                value={this.state.userOrEmail}
                                onChange={this.onInputChange}
                                fullWidth required
                            />
                            <TextField
                                margin="dense" label="Password" id="password" type={this.state.showPassword ? 'text' : 'password'}
                                value={this.state.password}
                                onChange={this.onInputChange}
                                onKeyUp={this.onKeyUp}
                                fullWidth required
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => this.setState({ showPassword: !this.state.showPassword })}
                                            onMouseDown={e => e.preventDefault()}
                                        >
                                            {this.state.showPassword ? <Visibility style={{ color: 'whitesmoke' }} /> : <VisibilityOff style={{ color: 'grey' }} />}
                                        </IconButton>
                                    </InputAdornment>
                                }}
                            />
                            <div className="btnLoginContainer">
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={this.state.keepLogin}
                                            onChange={() => this.setState({ keepLogin: !this.state.keepLogin })}
                                        />}
                                    label='Keep Me Logged in'
                                />
                                <Button onClick={this.onLoginClick} variant='outlined'>
                                    <p style={{ padding: '0 5px' }}>LOGIN</p>
                                </Button>
                            </div>
                        </form>
                        {this.modalCannotBlank()}
                        {this.props.user.error ? (
                            <h3 style={{ color: 'lightcoral', paddingTop: '15px' }}>{this.props.user.error}</h3>
                        ) : null}
                        <div className='forgotPassword'>
                            Forgot password? Please <div onClick={this.onBtnForgotPasswordClick}>Click Here</div>
                        </div>
                        <div className='notAMember'>
                            Not a member yet? Please <Link to='/register'>Register Here</Link>
                        </div>
                        {this.modalResetPassword()}
                        {this.modalResetSuccess()}
                    </div>
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

export default connect(stateToProps, { userLogin, userLogout, sendEmailResetPassword })(Login)