import React from 'react'
import HorizontalCard from '../Cards/HorizontalCard'
import Link from 'next/link'
import { translate } from '@/utils'
import MobileHeadline from '../MobileHeadlines/MobileHeadline'
import CustomHorizontalSkeleton from '../Skeleton/CustomHorizontalSkeleton'
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs'

const MostViewedProperty = ({ isLoading, getMostViewedProp, language }) => {
    return (
        <div>
            {isLoading ? (
                // Show skeleton loading when data is being fetched
                <section id="main_properties">
                    <div className="properties_section">
                        <div className="container">
                            <div id="prop">
                                <div className="prop_header">
                                    <div>
                                        <h3 className="headline">
                                            {translate("most")}{" "}
                                            <span>
                                                <span className=""> {translate("viewed")}</span>
                                            </span>{" "}
                                            {translate("properties")}
                                        </h3>
                                    </div>
                                    <div className="rightside_prop_header">
                                        <Link href="/most-viewed-properties">
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
                                </div>
                                <div className="mobile-headline-view">
                                    <MobileHeadline
                                        data={{
                                            text: translate("mostViewedProperties"),
                                            link: "/most-viewed-properties",
                                        }}
                                    />
                                </div>
                                <div className="cards_sec mt-4">
                                    <div className="row" style={{ rowGap: "30px" }}>
                                        {Array.from({ length: 6 }).map((_, index) => (
                                            <div className="col-sm-12 col-md-6 col-lg-6 loading_data" key={index}>
                                                <CustomHorizontalSkeleton />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            ) : (
                // Check if getMostViewedProp exists and has valid data
                getMostViewedProp && getMostViewedProp.length > 0 ? (
                    <section id="main_properties">
                        <div className="properties_section">
                            <div className="container">
                                <div id="prop">
                                    <div className="prop_header">
                                        <div>
                                            <h3 className="headline">
                                                {translate("most")}{" "}
                                                <span>
                                                    <span className=""> {translate("viewed")}</span>
                                                </span>{" "}
                                                {translate("properties")}
                                            </h3>
                                        </div>
                                        <div className="rightside_prop_header">
                                            {getMostViewedProp.length > 6 ?
                                                <Link href="/most-viewed-properties">
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
                                                : null}
                                        </div>
                                    </div>
                                    <div className="mobile-headline-view">
                                        <MobileHeadline
                                            data={{
                                                text: translate("mostViewedProperties"),
                                                link: getMostViewedProp.length > 6 ? "/most-viewed-properties" : "",
                                            }}
                                        />
                                    </div>
                                    <div className="cards_sec">
                                        <div className="row" style={{ rowGap: "20px" }}>
                                            {getMostViewedProp.slice(0, 6).map((ele, index) => (
                                                <div className="col-sm-12 col-md-6" key={index}>
                                                    <Link href="/properties-details/[slug]" as={`/properties-details/${ele.slug_id}`} passHref>
                                                        <HorizontalCard ele={ele} />
                                                    </Link>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                ) : null
            )}
        </div>
    )
}

export default MostViewedProperty
