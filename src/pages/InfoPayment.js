import React, { useEffect } from 'react'

const InfoPayment = () => {

    useEffect(() => {
        document.title = 'Payment - RIGUP!'
    }, [])

    return (
        <div className='infoContainer'>
            <div className='infoWrapper'>
                <div className='infoLeftContainer'>
                    <div className='infoContent'>
                        <div className='contentWrapper'>
                            <div className="section">
                                <h1>Payment RIG-UP!</h1>
                                <p>We can receive many kind of payment method. Bank account number available if you have purchased an item.</p>
                            </div>
                            <div className="section">
                                <h3>Offline shopping at our shop:</h3>
                                <ul>
                                    <li>Cash</li>
                                    <li>DEBIT</li>
                                    <li>CREDIT CARD</li>
                                    <li>BANK TRANSFER</li>
                                </ul>
                            </div>
                            <div className="section">
                                <h3>Online shopping at our website:</h3>
                                <ul>
                                    <li>BANK TRANSFER</li>
                                </ul>
                            </div>
                            <div className="infoContentBankImg">
                                <img src={require('../img/logoBCA.png')} alt='BCA' />
                                <img src={require('../img/logoBNI.png')} alt='BNI' />
                                <img src={require('../img/logoMandiri.png')} alt='Mandiri' />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='infoRightContainer'>
                    <img src={require('../img/banner/bannerPayment.jpg')} alt='info' />
                </div>
            </div>
        </div>
    )
}

export default InfoPayment
