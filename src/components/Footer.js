import React from 'react'
import { Link, withRouter } from 'react-router-dom'

class Footer extends React.Component {
    render() {
        if (!this.props.location.pathname.includes('/admindashboard')) {
            return (
                <div className="footerContainer">
                    <div className="wrapper">
                        <div className="socialContainer">
                            <div className="iconWrap">f</div>
                            <div className="iconWrap">t</div>
                            <div className="iconWrap">ig</div>
                            <div className="iconWrap">bl</div>
                            <div className="iconWrap">tp</div>
                        </div>
                        <div className="linksContainer">
                            <ul>
                                <li><Link to='/'>Features</Link></li>
                                <li><Link to='/'>Payment</Link></li>
                                <li><Link to='/'>Delivery</Link></li>
                            </ul>
                            <ul>
                                <li><Link to='/'>About</Link></li>
                                <li><Link to='/'>Privacy Policy</Link></li>
                                <li><Link to='/'>Support</Link></li>
                            </ul>
                        </div>
                        <div className="copyrightsContainer">
                            Copyrights &copy; 2019 - RIG-UP!.INC ALL RIGHTS RESERVED.
                        </div>
                    </div>
                </div>
            )
        }
        return null
    }
}

export default withRouter(Footer)