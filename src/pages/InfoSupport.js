import React, { useEffect } from 'react'

const InfoSupport = () => {

    useEffect(() => {
        document.title = 'Support - RIGUP!'
    }, [])

    return (
        <div className='infoContainer'>
            <div className='infoWrapper'>
                <div className='infoLeftContainer'>
                    <div className='infoContent'>
                        <div className='contentWrapper'>
                            <div className="section">
                                <h1>Support RIG-UP!</h1>
                            </div>
                            <div className="section">
                                <h3>Customer Care</h3>
                                <p>Open to customer on Monday - Saturday, 10.00 - 19.00 WIB</p>
                                <p>Phone: (021) XXXXXXX</p>
                                <p>Email: customercare@xxxx.com</p>
                            </div>
                            <div className="section">
                                <h3>Our Store</h3>
                                <p>Mangga XXX Mall Lt.XX No.XX Central Jakarta XXXXX</p>
                                <p>Open to customer on Monday - Saturday, 10.00 - 19.00 WIB</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='infoRightContainer'>
                    <img src={require('../img/banner/bannerSupport.jpg')} alt='info' />
                </div>
            </div>
        </div>
    )
}

export default InfoSupport
