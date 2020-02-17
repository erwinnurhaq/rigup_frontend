import React from 'react'

function Loading() {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)'
    }
    return (
        <div style={style}>
            <div id="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
        </div>
    )
}

export default Loading
