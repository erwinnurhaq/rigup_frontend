import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { API_URL } from '../support/API_URL';
import { fetchCarouselContent } from '../redux/actions'
import Slider from "react-slick";
import Loading from './Loading'

const StoreCarousel = (prop) => {
    const dispatch = useDispatch();
    const carouselContent = useSelector(({ carousel }) => carousel.carousel)

    useEffect(() => {
        dispatch(fetchCarouselContent())
    }, [dispatch])

    const settings = {
        infinite: true,
        dots: true,
        centerPadding: "60px",
        slidesToShow: 1,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 5000
    };

    return (
        <Slider {...settings}>
            {carouselContent.length !== 0 ? carouselContent.map((item) => (
                <div key={item.id} className="carouselItem"
                    onClick={() => prop.history.push(item.link)}
                >
                    <div className='imageContainer'>
                        <img src={`${API_URL}${item.image}`} alt={item.id} />
                    </div>
                    <div className='textContainer'>
                        <h1>{item.heroText}</h1>
                        <p>{item.text}</p>
                    </div>
                </div>
            )
            ) : (
                    <div className="carouselItem" >
                        <div className='imageContainer' style={{ backgroundColor: 'dimgray' }}>
                            <Loading />
                        </div>
                    </div>
                )}
        </Slider>
    )
}

export default withRouter(StoreCarousel)
