import React, { useState, lazy, Suspense } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Loading from '../components/Loading'
import StoreProductCard from '../components/StoreProductCard'

const ModalWarning = lazy(() => import('../components/ModalWarning'))

const UserWishlist = () => {
    const dispatch = useDispatch()
    const { wishlist } = useSelector(({ userWishlist }) => userWishlist)
    const [showModalSuccess, setShowModalSuccess] = useState(false)
    const [showModalWarning, setShowModalWarning] = useState(false)

    const renderWishlistCard = () => wishlist && wishlist.length > 0 ? wishlist.map(product => (
        <StoreProductCard
            key={product.id}
            product={product}
            showModalSuccess={showModalSuccess}
            setShowModalSuccess={setShowModalSuccess}
            showModalWarning={showModalWarning}
            setShowModalWarning={setShowModalWarning}
        />
    )) : (
            <h1>No Wishlist Added.</h1>
        )


    const renderModalWarning = () => showModalWarning ? (
        <Suspense fallback={<Loading />}>
            <ModalWarning
                show={showModalWarning}
                setShow={setShowModalWarning}
                title='Warning'
            >You are not logged in, Please login first to continue.</ModalWarning>
        </Suspense>
    ) : null

    const renderModalSuccess = () => showModalSuccess ? (
        <Suspense fallback={<Loading />}>
            <ModalWarning
                show={showModalSuccess}
                setShow={setShowModalSuccess}
                title='Success'
            >Done!</ModalWarning>
        </Suspense>
    ) : null

    return (
        <div className='userWishlistContainer'>
            <div className="userWishlistWrapper">
                {renderWishlistCard()}
                {renderModalWarning()}
                {renderModalSuccess()}
            </div>
        </div>
    )
}

export default UserWishlist
