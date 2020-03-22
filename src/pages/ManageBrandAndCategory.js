import React, { useState, useEffect, lazy, Suspense } from 'react'
import { useDispatch } from 'react-redux'
import { getBrands, getBrandCat, getMostParent } from '../redux/actions'

import Loading from '../components/Loading'
const ManageBrand = lazy(() => import('../components/ManageBrand'))
const ManageBrandCat = lazy(() => import('../components/ManageBrandCat'))
const ManageCategory = lazy(() => import('../components/ManageCategory'))
const ModalWarning = lazy(() => import('../components/ModalWarning'))


const ManageBrandAndCategory = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getMostParent())
        dispatch(getBrands())
        dispatch(getBrandCat())
    }, [dispatch])

    const [showModalWarning, setShowModalWarning] = useState(false)

    const renderModalWarning = () => showModalWarning ? (
        <Suspense fallback={<Loading />}>
            <ModalWarning
                title='Warning'
                show={showModalWarning}
                setShow={setShowModalWarning}
            >Please select category and fill the form correctly!</ModalWarning>
        </Suspense>
    ) : null

    return (
        <div className="manageBrandCatContainer">
            <Suspense fallback={<Loading />}>
                <ManageBrand
                    showModalWarning={showModalWarning}
                    setShowModalWarning={setShowModalWarning}
                />
            </Suspense>
            <Suspense fallback={<Loading />}>
                <ManageCategory
                    showModalWarning={showModalWarning}
                    setShowModalWarning={setShowModalWarning}
                />
            </Suspense>
            <Suspense fallback={<Loading />}>
                <ManageBrandCat />
            </Suspense>
            {renderModalWarning()}
        </div>
    )
}

export default ManageBrandAndCategory
