import React, { Component, lazy, Suspense } from 'react'
import { connect } from 'react-redux'

import { userLogin, userLogout } from '../redux/actions'
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
        this.props.userLogin({ userOrEmail, password })
        this.setState({ userOrEmail: '', password: '' })
    }

    render() {
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
                        <input
                            type="button"
                            value="LOGOUT"
                            onClick={this.props.userLogout}
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
                    {this.props.user.isLogin ? (
                        <Suspense >
                            <h2 style={{ color: 'darkgreen' }}>Logged in</h2>
                        </Suspense>
                    ) : null}
                </div>

            </div>
        )
    }
}

const stateToProps = ({ user }) => {
    return {
        user
    }
}

export default connect(stateToProps, { userLogin, userLogout })(Login)