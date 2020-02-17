import React from 'react'
import { Button } from '@material-ui/core'
import { withRouter } from 'react-router-dom'

class Navbar extends React.Component {

    toLogin = () => {
        this.props.history.push('/login')
    }

    render() {
        return (
            <div className="navContainer">
                <div className="wrapper">
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="#">News</a></li>
                        <li><a href="#">Special Offers</a></li>
                    </ul>
                    <div className="logoContainer">
                        <p>RIG-Up!</p>
                    </div>
                    <div className="rightContainer">
                        <Button className="btnLogin" variant="outlined" onClick={this.toLogin}>LOGIN</Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Navbar)