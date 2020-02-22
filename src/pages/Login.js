import React, { Component, lazy, Suspense } from 'react'
import { connect } from 'react-redux'

import { userLogin } from '../redux/actions'
import { withRouter, Redirect } from 'react-router-dom'

import Loading from '../components/Loading'
const ModalWarning = lazy(() => import('../components/ModalWarning'))

class Login extends Component {
    state = {
        modalShow: false,
        userOrEmail: '',
        password: ''
    }

    closeModal = () => this.setState({ modalShow: false })

    onInputChange = e => {
        let x = e.target.value
        if (x.includes(' ')) x = x.replace(' ', '')
        this.setState({ [e.target.name]: x })
    }

    onLoginClick = () => {
        const { userOrEmail, password } = this.state
        if (userOrEmail === '' || password === '') {
            return this.setState({ modalShow: true })
        }
        this.setState({ userOrEmail: '', password: '' })
        this.props.userLogin({ userOrEmail, password })
    }

    render() {
        if (this.props.user.isLogin) {
            return (
                <Redirect to='/' />
            )
        } else {
            return (
                <div className="loginContainer">
                    <div className="formWrapper">
                        <h3>Login</h3>
                        <form>
                            <input
                                type="text"
                                name="userOrEmail"
                                value={this.state.userOrEmail}
                                onChange={e => this.onInputChange(e)}
                            />
                            <input
                                type="password"
                                name="password"
                                value={this.state.password}
                                onChange={e => this.onInputChange(e)}
                            />
                            <input
                                type="button"
                                value="LOGIN"
                                onClick={this.onLoginClick}
                            />
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
                            <Suspense >
                                <h2 style={{ color: 'lightcoral' }}>{this.props.user.error}</h2>
                            </Suspense>
                        ) : null}
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

export default withRouter(connect(stateToProps, { userLogin })(Login))