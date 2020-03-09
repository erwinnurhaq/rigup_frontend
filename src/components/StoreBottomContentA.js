import React from 'react'

export default ({image, title, text}) => {
    return (
        <div className='contentBottomA'>
            <img src={require(`../img/${image}`)} alt={title} />
            <h3>{title}</h3>
            <p>{text}</p>
        </div>
    )
}
