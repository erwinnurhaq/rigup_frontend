import React, { Component, lazy, Suspense } from 'react'
import { connect } from 'react-redux'
import { TextField, Button, FormControlLabel, Checkbox } from '@material-ui/core'

import { userLogin } from '../redux/actions'
import { Redirect, Link } from 'react-router-dom'

import Loading from '../components/Loading'
const ModalWarning = lazy(() => import('../components/ModalWarning'))

class Login extends Component {
    state = {
        modalShow: false,
        userOrEmail: '',
        password: '',
        keepLogin: false,
    }

    componentDidMount() {
        document.title = 'Login - RIGUP!'
    }

    closeModal = () => this.setState({ modalShow: false })

    onInputChange = e => {
        let x = e.target.value
        if (x.includes(' ')) x = x.replace(' ', '')
        this.setState({ [e.target.id]: x })
    }

    onLoginClick = () => {
        const { userOrEmail, password, keepLogin } = this.state
        if (userOrEmail === '' || password === '') {
            return this.setState({ modalShow: true })
        }
        this.setState({ userOrEmail: '', password: '', keepLogin: false })
        this.props.userLogin({ userOrEmail, password, keepLogin })
    }

    render() {
        if (this.props.user.user) {
            return (
                <Redirect to='/' />
            )
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
                                margin="dense" label="Password" id="password" type="password"
                                value={this.state.password}
                                onChange={this.onInputChange}
                                fullWidth required
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
                        {this.state.modalShow ? (
                            <Suspense fallback={<Loading />}>
                                <ModalWarning
                                    show={this.state.modalShow}
                                    setShow={this.closeModal}
                                >Cannot Blank!</ModalWarning>
                            </Suspense>
                        ) : null}
                        {this.props.user.error ? (
                            <h3 style={{ color: 'lightcoral', paddingTop: '15px' }}>{this.props.user.error}</h3>
                        ) : null}
                        <div className='notAMember'>
                            Not a member yet? Please <Link to='/register'>Register Here</Link>
                        </div>
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

export default connect(stateToProps, { userLogin })(Login)