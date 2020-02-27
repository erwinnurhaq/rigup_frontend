import React, { lazy, Suspense } from 'react'
import { withRouter, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { Button } from '@material-ui/core'
import Loading from './Loading'

const NavbarRightMenu = lazy(() => import('./NavbarRightMenu'))


class Navbar extends React.Component {

    toLogin = () => this.props.history.push('/login')

    rightContainerRender = () => {
        const { user, isLogin } = this.props.user
        if (isLogin) {
            return (
                <Suspense fallback={<Loading />}>
                    <NavbarRightMenu user={user} />
                </Suspense>
            )
        } else {
            return <Button className="btnLogin" variant="outlined" onClick={this.toLogin}>LOGIN</Button>
        }
    }

    render() {
        return (
            <div className="navContainer">
                <div className="wrapper">
                    <ul>
                        <li><NavLink to='/'>Home</NavLink></li>
                        <li><NavLink to='/news'>News</NavLink></li>
                        <li><NavLink to='/promo'>Special Offers</NavLink></li>
                    </ul>
                    <div className="logoContainer">
                        <p>RIG-Up!</p>
                    </div>
                    <div className="rightContainer">
                        <div className="rightWrapper">
                            {this.rightContainerRender()}
                        </div>
                    </div>
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

export default withRouter(connect(stateToProps)(Navbar))