import React from 'react'
import { Link, withRouter } from 'react-router-dom'

class Footer extends React.Component {
    render() {
        if (!this.props.location.pathname.includes('/admindashboard')) {
            return (
                <div className="footerContainer">
                    <div className="wrapper">
                        <div className="socialContainer">
                            <a href='https://www.facebook.com' target="blank"><div className="iconWrap">f</div></a>
                            <a href='https://www.twitter.com' target="blank"><div className="iconWrap">t</div></a>
                            <a href='https://www.instagram.com' target="blank"><div className="iconWrap">ig</div></a>
                            <a href='https://www.bukalapak.com' target="blank"><div className="iconWrap">bl</div></a>
                            <a href='https://www.tokopedia.com' target="blank"><div className="iconWrap">tp</div></a>
                        </div>
                        <div className="linksContainer">
                            <ul>
                                <li><Link to='/infopayment'>Payment</Link></li>
                                <li><Link to='/infodelivery'>Delivery</Link></li>
                                <li><Link to='/infosupport'>Support</Link></li>
                            </ul>
                            <ul>
                                <li><Link to='/infoabout'>About</Link></li>
                                <li><Link to='/infocareer'>Careers</Link></li>
                                <li><Link to='/infoprivacypolicy'>Privacy Policy</Link></li>
                            </ul>
                        </div>
                        <div className="copyrightsContainer">
                            Copyrights &copy; 2020 - RIG-UP!.INC ALL RIGHTS RESERVED.
                        </div>
                    </div>
                </div>
            )
        }
        return null
    }
}

export default withRouter(Footer)