import React, { useState, lazy, Suspense } from 'react'
import { useSelector } from 'react-redux'

import Loading from '../components/Loading'
import StoreProductCard from '../components/StoreProductCard'

const ModalWarning = lazy(() => import('../components/ModalWarning'))

const UserWishlist = () => {
    const { wishlist } = useSelector(({ userWishlist }) => userWishlist)
    const [showModalWarning, setShowModalWarning] = useState(false)

    const renderWishlistCard = () => wishlist && wishlist.length > 0 ? wishlist.map(product => (
        <StoreProductCard
            key={product.id}
            product={product}
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

    return (
        <div className='userWishlistContainer'>
            <div className="userWishlistWrapper">
                {renderWishlistCard()}
                {renderModalWarning()}
            </div>
        </div>
    )
}

export default UserWishlist
