import React from 'react'
import VerticalCard from '../Cards/VerticleCard'
import Link from 'next/link'
import MobileHeadline from '../MobileHeadlines/MobileHeadline'
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs'
import VerticalCardSkeleton from '../Skeleton/VerticalCardSkeleton'
import { translate } from '@/utils'

const FeaturedProperty = ({ getFeaturedListing, isLoading, language, nearbyCityData, handleImageLoaded }) => {
    return (
        <>
            {isLoading ? (
                <section id="feature" style={{ paddingTop: nearbyCityData && nearbyCityData?.length > 0 ? "80px" : "0px",paddingBottom: nearbyCityData && nearbyCityData?.length > 0 ? "80px" : "0px"  }}>
                    <div className="container">
                        <div id="main_features" className="py-3">
                            {/* <div>
                                <div className="feature_header">
                                    <span className="headline">
                                        {translate("dicoverOurFeaturedListing")}
                                    </span>
                                    <div className="rightside_header">
                                        {getFeaturedListing.length > 8 ? (
                                            <Link href="/featured-properties">
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
                                        ) : null}
                                    </div>
                                </div>
                                <div className="mobile-headline-view">
                                    <MobileHeadline
                                        data={{
                                            text: translate("dicoverOurFeaturedListing"),
                                            link: getFeaturedListing.length > 8 ? "/featured-properties" : "",
                                        }}
                                    />
                                </div>
                            </div> */}
                        </div>
                        <div className="row" style={{ rowGap: "20px" }}>
                            {Array.from({ length: 8 }).map((_, index) => (
                                <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3 loading_data" key={index}>
                                    <VerticalCardSkeleton />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            ) : (

                <section id="feature" style={{ paddingTop: nearbyCityData && nearbyCityData?.length > 0 ? "80px" : "0px" }}>
                    <div className="container">
                        {getFeaturedListing && getFeaturedListing.length > 0 ? (
                            <div id="main_features">
                                <div>
                                    <div className="feature_header">
                                        {/* <span className="headline">
                                            {translate("discoverOur")} <span className="">{translate("featured")}</span> {translate("listings")}
                                        </span> */}
                                        <div className="rightside_header">
                                            {getFeaturedListing.length > 8 ? (
                                                <Link href="/featured-properties">
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
                                            ) : null}
                                        </div>
                                    </div>
                                    <div className="mobile-headline-view">
                                        {/* <MobileHeadline
                                              data={{
                                                text: translate("dicoverOurFeaturedListing"),
                                                link: getFeaturedListing.length > 8 ? "/featured-properties" : "",
                                            }}
                                        /> */}
                                    </div>
                                </div>
                                <div className="feature-section-cards">
                                    <div id="feature_cards" className="row">
                                        {getFeaturedListing.slice(0, 8).map((ele, index) => (
                                            <div className="col-sm-12 col-md-6 col-lg-6 col-xl-4 col-xxl-3" key={index}>
                                                <Link href="/properties-details/[slug]" as={`/properties-details/${ele.slug_id}`} passHref>
                                                    <VerticalCard ele={ele} onImageLoad={handleImageLoaded} />
                                                </Link>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            null
                        )}
                    </div>
                </section>
            )}
        </>
    )
}

export default FeaturedProperty
