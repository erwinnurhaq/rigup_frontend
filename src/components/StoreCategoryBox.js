import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AppsIcon from '@material-ui/icons/Apps';
import { Case, Motherboard2, Processor, Storage, Memory, VGA, PSU, Monitor, Accessories } from './IconSVG'
import Loading from './Loading'
import CategoryBox from './CategoryBox'
import {
    getMostParent,
    selectCat,
    selectFilter,
    setChangeStyle,
    selectChildCat,
    setSearch,
    getChildOfMainParent,
    getCountProductByCategoryId,
    getProductByCategoryId
} from '../redux/actions'

const StoreCategoryBox = () => {

    const dispatch = useDispatch()
    const { mostParent, selectedCat } = useSelector(({ categories }) => categories)
    const changeCategoryBox = useSelector(({ changeStyle }) => changeStyle.changeCategoryBox)

    useEffect(() => {
        dispatch(getMostParent())
    }, [dispatch])

    const onTabClick = async (id) => {
        if (selectedCat === id) {
            dispatch(setChangeStyle('changeBrowseProducts', false))
            window.scrollTo(0, 0)
            dispatch(selectFilter(null))
            dispatch(selectCat(null))
            dispatch(selectChildCat(null))
            dispatch(setSearch(''))
        } else {
            dispatch(setChangeStyle('changeBrowseProducts', true))
            window.scrollTo(0, 0.725 * window.innerHeight)
            dispatch(selectFilter(0))
            dispatch(selectCat(id))
            dispatch(selectChildCat(0))
            dispatch(setSearch(''))
            // await dispatch(getChildOfMainParent(id))
            // await dispatch(getCountProductByCategoryId(id))
            // await dispatch(getProductByCategoryId(id, 1, 12, 0))
        }
    }

    const icon = [
        <Case height='100%' width='100%' color='darkviolet' />,
        <Processor height='100%' width='100%' color='darkviolet' />,
        <Motherboard2 height='100%' width='100%' color='darkviolet' />,
        <Memory height='100%' width='100%' color='darkviolet' />,
        <VGA height='100%' width='100%' color='darkviolet' />,
        <Storage height='100%' width='100%' color='darkviolet' />,
        <PSU height='100%' width='100%' color='darkviolet' />,
        <Monitor height='100%' width='100%' color='darkviolet' />,
        <Accessories height='100%' width='100%' color='darkviolet' />
    ]

    const renderCategoryBox = () => {
        if (mostParent) {
            return (<>
                <CategoryBox id={0} onTabClick={onTabClick} label='ALL'>
                    <AppsIcon style={{ height: '100%', width: '100%', color: 'darkviolet' }} />
                </CategoryBox>
                {mostParent.map(i => (
                    <CategoryBox key={i.id} id={i.id} onTabClick={onTabClick} label={i.category}>
                        {icon[i.id - 1]}
                    </CategoryBox>
                ))}
            </>)
        } else {
            return (
                <div style={{ width: '100%', height: '10vh', backgroundColor: 'rgb(44, 44, 44)' }}>
                    <Loading />
                </div>
            )
        }
    }

    return (
        <div className={`CategoryBoxContainer ${changeCategoryBox ? 'change' : ''}`}>
            <div className='categoryBoxWrapper'>
                {renderCategoryBox()}
            </div>
        </div>
    )
}

export default StoreCategoryBox
