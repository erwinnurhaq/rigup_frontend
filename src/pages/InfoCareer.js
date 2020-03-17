import React, { useEffect } from 'react'

const InfoCareer = () => {

    useEffect(() => {
        document.title = 'Career - RIGUP!'
    }, [])

    return (
        <div className='infoContainer'>
            <div className='infoWrapper'>
                <div className='infoLeftContainer'>
                    <div className='infoContent'>
                        <div className='contentWrapper'>
                            <div className="section">
                                <h1>Career RIG-UP!</h1>
                            </div>
                            <div className="section">
                                <h3>No job available at the moment.</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='infoRightContainer'>
                    <img src={require('../img/banner/bannerCareers.jpg')} alt='info' />
                </div>
            </div>
        </div>
    )
}

export default InfoCareer
