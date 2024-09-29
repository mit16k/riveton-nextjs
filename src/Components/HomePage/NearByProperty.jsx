import { translate } from '@/utils'
import React from 'react'
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs'
import MobileHeadline from '../MobileHeadlines/MobileHeadline'
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import NearbyCityswiper from '../NearbyCitySwiper/NearbyCityswiper';
import VerticalCardSkeleton from '../Skeleton/VerticalCardSkeleton';
import Link from 'next/link';


const NearByProperty = ({ isLoading, userCurrentLocation, nearbyCityData, language, breakpoints }) => {
    return (
        <>
            {/* Nearby City Section  Section  */}
            {isLoading ? (
                <section id="nearbyCityProperties">
                    <div className="container">
                        <div className="most_fav_header">
                            <span className="headline">
                                <span>
                                    {translate("propertiesnearby")}{" "} <span className=""> {userCurrentLocation}</span>
                                </span>
                            </span>
                            {nearbyCityData?.length > 4 &&
                                <div className="rightside_most_fav_header">
                                    <Link href={`/properties/city/${userCurrentLocation}`}>
                                        <button className="learn-more" id="viewall">
                                            <span aria-hidden="true" className="circle">
                                                <div className="icon_div">
                                                    <span className="icon arrow">
                                                        {language.rtl === 1 ? <BsArrowLeft /> : <BsArrowRight />}
                                                    </span>
                                                </div>
                                            </span>
                                            <span className="button-text">{translate("seeAllProp")}</span>
                                        </button>
                                    </Link>
                                </div>
                            }
                        </div>
                        <div className="mobile-headline-view">
                            <MobileHeadline
                                data={{
                                    text: translate("propertiesnearby"),
                                    link: `/properties/city/${userCurrentLocation}`,
                                }}
                            />
                        </div>
                        <div className="mt-4">

                            <Swiper
                                dir={language.rtl === 1 ? "rtl" : "ltr"}
                                slidesPerView={4}
                                spaceBetween={30}
                                freeMode={true}
                                pagination={{
                                    clickable: true,
                                }}
                                modules={[FreeMode, Pagination]}
                                className="most-view-swiper"
                                breakpoints={breakpoints}
                            >
                                {Array.from({ length: 6 }).map((_, index) => (
                                    <SwiperSlide>
                                        <div className="loading_data">
                                            <VerticalCardSkeleton />
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                </section>
            ) : (
                nearbyCityData && nearbyCityData?.length > 0 && (
                    <section id="nearbyCityProperties">
                        <div className="container">
                            <NearbyCityswiper data={nearbyCityData} isLoading={isLoading} userCurrentLocation={userCurrentLocation} l={language} />
                        </div>
                    </section>
                )
            )}
        </>
    )
}

export default NearByProperty