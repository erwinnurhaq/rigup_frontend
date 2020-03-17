import React, { useEffect } from 'react'

const InfoDelivery = () => {

    useEffect(() => {
        document.title = 'Delivery - RIGUP!'
    }, [])

    return (
        <div className='infoContainer'>
            <div className='infoWrapper'>
                <div className='infoLeftContainer'>
                    <div className='infoContent'>
                        <div className='contentWrapper'>
                            <div className="section">
                                <h1>Delivery RIG-UP!</h1>
                                <p>We are partner with JNE for delivering packages. Don't worry about packaging quality, we always use rigid box for fragile items.</p>
                            </div>
                            <div className="section">
                                <h3>JNE Delivery Time and Condition:</h3>
                                <ul>
                                    <li>Package delivery stored massively everyday to JNE on 18.00 WIB, on Monday to Saturday. No delivery on Sunday or Holiday.</li>
                                    <li>Shipping cost included on checkout.</li>
                                    <li>If shipping cost is not enough, package will be hold and our customer care will inform you about it immediately</li>
                                    <li>Delivery delay or other problems on shipping process is all JNE's responsibility</li>
                                </ul>
                            </div>
                            <div className="infoContentBankImg">
                                <img src={require('../img/logoJNE.png')} alt='JNE' />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='infoRightContainer'>
                    <img src={require('../img/banner/bannerDelivery.jpg')} alt='info' />
                </div>
            </div>
        </div>
    )
}

export default InfoDelivery
