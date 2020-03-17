import React, { useEffect } from 'react'

const InfoAbout = () => {

    useEffect(() => {
        document.title = 'About - RIGUP!'
    }, [])

    return (
        <div className='infoContainer'>
            <div className='infoWrapper'>
                <div className='infoLeftContainer'>
                    <div className='infoContent'>
                        <div className='contentWrapper'>
                            <div className="section">
                                <h1>About RIG-UP!</h1>
                                <p>We strive to offer every individual customer the best possible PC experience from start to finish no matter what PC they have purchased from us.</p>
                            </div>
                            <div className="section">
                                <h3>Who We Are</h3>
                                <p>RIG-UP! is a PC Store and Build that has been operated and established since 2019.</p>
                                <p>We gained trust over time by enthusiast, gamers, and professionals.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='infoRightContainer'>
                    <img src={require('../img/banner/bannerAbout.jpg')} alt='info' />
                </div>
            </div>
        </div>
    )
}

export default InfoAbout
