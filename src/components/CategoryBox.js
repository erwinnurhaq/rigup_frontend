import React from 'react'
import { useSelector } from 'react-redux'

const CategoryBox = (props) => {
    const { selectedCat } = useSelector(({ categories }) => categories)
    return (
        <div className={`categoryBox ${selectedCat === props.id ? 'active' : ''}`}
            onClick={() => props.onTabClick(props.id)}
        >
            <div className='iconBox'>
                {props.children}
            </div>
            <div className='iconText'>{props.label}</div>
        </div>
    )
}

export default CategoryBox
