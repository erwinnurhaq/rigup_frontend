import React from 'react'

class Footer extends React.Component {
    render() {
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
                            <li><a href="#">Features</a></li>
                            <li><a href="#">Payment</a></li>
                            <li><a href="#">Delivery</a></li>
                        </ul>
                        <ul>
                            <li><a href="#">About</a></li>
                            <li><a href="#">Privacy Policy</a></li>
                            <li><a href="#">Support</a></li>
                        </ul>
                    </div>
                    <div className="copyrightsContainer">
                        Copyrights &copy; 2019 - RIG-UP!.INC ALL RIGHTS RESERVED.
                    </div>
                </div>
            </div>
        )
    }
}

export default Footer