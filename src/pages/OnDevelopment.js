import React, { useEffect } from 'react'

function OnDevelopment() {

    useEffect(() => {
        document.title = 'On Development - RIGUP!'
    }, [])

    return (
        <div className="loginContainer">
            <h2 style={{ color: 'white' }}>On Development</h2>
        </div>
    )
}

export default OnDevelopment
