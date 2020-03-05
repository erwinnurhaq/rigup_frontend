import React, { lazy, Suspense } from 'react'
import { withRouter, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { Button } from '@material-ui/core'
import Loading from './Loading'

const NavbarRightMenu = lazy(() => import('./NavbarRightMenu'))


class Navbar extends React.Component {

    toLogin = () => this.props.history.push('/login')

    rightContainerRender = () => {
        const { user } = this.props.user
        if (user) {
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
        if (!this.props.location.pathname.includes('/admindashboard')) {
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
        return null
    }
}

const stateToProps = ({ user }) => {
    return {
        user
    }
}

export default withRouter(connect(stateToProps)(Navbar))