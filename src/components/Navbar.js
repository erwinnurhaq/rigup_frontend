import React, { lazy, Suspense } from 'react'
import { withRouter, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { Button } from '@material-ui/core'
import Loading from './Loading'
import { setChangeStyle } from '../redux/actions'

const NavbarRightMenu = lazy(() => import('./NavbarRightMenu'))


class Navbar extends React.Component {

    toLogin = () => {
        localStorage.setItem('rigupprevpath', this.props.location.pathname)
        this.props.history.push('/login')
    }

    rightContainerRender = () => {
        const { user } = this.props.user
        if (user && user.verified === 1) {
            return (
                <Suspense fallback={<Loading />}>
                    <NavbarRightMenu user={user} />
                </Suspense>
            )
        } else {
            return <Button className="btnLogin" variant="outlined" onClick={this.toLogin}>LOGIN</Button>
        }
    }

    styleChanger = () => {
        if (window.scrollY > window.innerHeight / 40) {
            this.props.setChangeStyle('changeNav', true);
        } else {
            this.props.setChangeStyle('changeNav', false)
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.styleChanger);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.styleChanger)
    }

    render() {
        if (!this.props.location.pathname.includes('/admindashboard')) {
            return (
                <div className={`navContainer ${this.props.changeStyle.changeNav ? 'change' : ''}`}>
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

const stateToProps = ({ user, changeStyle }) => {
    return {
        user, changeStyle
    }
}

export default withRouter(connect(stateToProps, { setChangeStyle, setChangeStyle })(Navbar))