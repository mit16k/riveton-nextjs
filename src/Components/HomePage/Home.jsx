"use client"
import React, { useEffect, useState } from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { FiEye } from "react-icons/fi";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
// import required modules
import { FreeMode, Pagination } from "swiper/modules";
import MobileHeadline from "../MobileHeadlines/MobileHeadline";
import Link from "next/link";
import Loader from "../Loader/Loader";
import { GetAllArticlesApi, GetCountByCitysApi, GetFeturedListingsApi, GetSliderApi, getAllprojectsApi, getHomePageApi, getUserRecommendationApi } from "@/store/actions/campaign";
import VerticalCardSkeleton from "../Skeleton/VerticalCardSkeleton";
import VerticalCard from "../Cards/VerticleCard";
import HorizontalCard from "../Cards/HorizontalCard";
import CustomHorizontalSkeleton from "../Skeleton/CustomHorizontalSkeleton";
import CategoryCard from "../Cards/CategoryCard";
import CustomCategorySkeleton from "../Skeleton/CustomCategorySkeleton";
import ArticleCard from "../Cards/ArticleCard";
import ArticleCardSkeleton from "../Skeleton/ArticleCardSkeleton";
import NearByCitysSkeleton from "../Skeleton/NearByCitysSkeleton";
import { settingsData } from "@/store/reducer/settingsSlice";
import { useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import "aos/dist/aos.css";
import { placeholderImage, translate } from "@/utils";
import Layout from "../Layout/Layout";
import SearchTab from "../SearchTab/SearchTab.jsx";
import NearbyCityswiper from "../NearbyCitySwiper/NearbyCityswiper.jsx"
import { store } from "@/store/store";
import { categoriesCacheData, saveIsProject, saveSliderDataLength } from "@/store/reducer/momentSlice";
import SliderComponent from "../HomeSlider/SliderComponent";
import { languageData } from "@/store/reducer/languageSlice";
import { IoIosArrowForward } from "react-icons/io";
import ProjectCard from "../Cards/ProjectCard";
import { FaArrowRight } from "react-icons/fa";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import ProjectCardSkeleton from "../Skeleton/ProjectCardSkeleton";
import LoginModal from "../LoginModal/LoginModal";
import UserRecommendationCard from "../Cards/UserRecommendationCard";
import NoData from "../NoDataFound/NoData";
import AgentCardSkeleton from "../Skeleton/AgentCardSkeleton";
import AgentCard from "../Cards/AgentCard";
import SliderSkeleton from "../Skeleton/SliderSkeleton";

const HomePage = () => {

    const router = useRouter()

    const lang = useSelector(languageData);
    useEffect(() => { }, [lang])

    const settingData = useSelector(settingsData);
    const isPremiumUser = settingData && settingData.is_premium;

    const [isLoading, setIsLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const [sliderData, setSliderData] = useState([])
    const [categoryData, setCategoryData] = useState([])
    const [nearbyCityData, setnearbyCityData] = useState()
    const [getFeaturedListing, setGetFeaturedListing] = useState([]);
    const [getMostViewedProp, setGetMostViewedProp] = useState([]);
    const [getMostFavProperties, setGetMostFavProperties] = useState([]);
    const [getProjects, setGetProjects] = useState([]);
    const [getArticles, setGetArticles] = useState([]);
    const [agentsData, setAgentData] = useState([]);
    const [getNearByCitysData, setGetNearByCitysData] = useState([]);
    const [userRecommendationData, setUserRecommendationData] = useState([]);

    const isLoggedIn = useSelector((state) => state.User_signup);
    const userCurrentId = isLoggedIn && isLoggedIn.data ? isLoggedIn.data.data.id : null;
    const userCurrentLocation = isLoggedIn && isLoggedIn.data ? isLoggedIn.data.data.city : null;
    const language = store.getState().Language.languages;
    const Categorydata = useSelector(categoriesCacheData);


    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handlecheckPremiumUser = (e, slug_id) => {
        e.preventDefault()
        if (userCurrentId) {
            if (isPremiumUser) {
                router.push(`/project-details/${slug_id}`)
            } else {
                Swal.fire({
                    title: "Opps!",
                    text: "You are not premium user sorry!",
                    icon: "warning",
                    allowOutsideClick: false,
                    showCancelButton: false,
                    customClass: {
                        confirmButton: 'Swal-confirm-buttons',
                        cancelButton: "Swal-cancel-buttons"
                    },
                    confirmButtonText: "Ok",
                }).then((result) => {
                    if (result.isConfirmed) {
                        router.push("/")
                    }
                });
            }
        } else {
            Swal.fire({
                title: translate("plzLogFirsttoAccess"),
                icon: "warning",
                allowOutsideClick: false,
                showCancelButton: false,
                allowOutsideClick: true,
                customClass: {
                    confirmButton: 'Swal-confirm-buttons',
                    cancelButton: "Swal-cancel-buttons"
                },
                confirmButtonText: "Ok",
            }).then((result) => {
                if (result.isConfirmed) {
                    setShowModal(true)
                }
            });
        }
    }
    const handlecheckPremiumUserAgent = (e, ele) => {
        e.preventDefault()
        if (userCurrentId) {
            if (isPremiumUser) {
                if (ele?.property_count === 0 && ele?.projects_count !== 0) {
                    router.push(`/agent-details/${ele?.slug_id}`)
                    saveIsProject(true)
                } else {
                    router.push(`/agent-details/${ele?.slug_id}`)
                    saveIsProject(false)
                }
            } else {
                Swal.fire({
                    title: "Opps!",
                    text: "You are not premium user sorry!",
                    icon: "warning",
                    allowOutsideClick: false,
                    showCancelButton: false,
                    customClass: {
                        confirmButton: 'Swal-confirm-buttons',
                        cancelButton: "Swal-cancel-buttons"
                    },
                    confirmButtonText: "Ok",
                }).then((result) => {
                    if (result.isConfirmed) {
                        router.push("/")
                    }
                });
            }
        } else {
            Swal.fire({
                title: translate("plzLogFirsttoAccess"),
                icon: "warning",
                allowOutsideClick: false,
                showCancelButton: false,
                allowOutsideClick: true,
                customClass: {
                    confirmButton: 'Swal-confirm-buttons',
                    cancelButton: "Swal-cancel-buttons"
                },
                confirmButtonText: "Ok",
            }).then((result) => {
                if (result.isConfirmed) {
                    setShowModal(true)
                }
            });
        }
    }

    const breakpoints = {
        0: {
            slidesPerView: 1,
        },
        375: {
            slidesPerView: 1.5,
        },
        576: {
            slidesPerView: 2,
        },
        768: {
            slidesPerView: 3,
        },
        992: {
            slidesPerView: 4,
        },
        1200: {
            slidesPerView: 3,
        },
        1400: {
            slidesPerView: 4,
        },
    };

    const breakpointsMostFav = {
        0: {
            slidesPerView: 1,
        },
        375: {
            slidesPerView: 1.5,
        },
        576: {
            slidesPerView: 2,
        },
        1200: {
            slidesPerView: 3,
        },
        1400: {
            slidesPerView: 4,
        },
    };

    const breakpointsProjects = {
        0: {
            slidesPerView: 1,
        },
        375: {
            slidesPerView: 1.5,
        },
        576: {
            slidesPerView: 2,
        },
        1200: {
            slidesPerView: 3,
        },
        1400: {
            slidesPerView: 4,
        },
    };
    const breakpointsAgents = {
        0: {
            slidesPerView: 1,
        },
        375: {
            slidesPerView: 1.5,
        },
        576: {
            slidesPerView: 2,
        },
        1200: {
            slidesPerView: 2.5,
        },
        1400: {
            slidesPerView: 4,
        },
    };

    const fetchCountByCityData = () => {
        try {

            setIsLoading(true);

            GetCountByCitysApi({
                onSuccess: (response) => {
                    const cityData = response.data;
                    setIsLoading(false);
                    setGetNearByCitysData(cityData);
                },
                onError: (error) => {
                    console.log(error);
                    setIsLoading(false);

                }
            });
        } catch (error) {
            console.log(error)
        }
    }



    const fetchHomePageData = () => {
        setIsLoading(true)
        try {
            getHomePageApi({
                onSuccess: (res) => {
                    const responseData = res?.data
                    setIsLoading(false);
                    // set slider section 
                    setSliderData(responseData?.slider_section)
                    
                    saveSliderDataLength(responseData?.slider_section?.length)
                    // set featured section
                    setGetFeaturedListing(responseData?.featured_section)
                    // set category data 
                    setCategoryData(responseData?.categories_section)
                    // set most fav properties 
                    setGetMostFavProperties(responseData?.most_liked_properties)
                    // set most_viewed_properties
                    setGetMostViewedProp(responseData?.most_viewed_properties)
                    // set project section 
                    setGetProjects(responseData?.project_section)
                    // article section data 
                    setGetArticles(responseData?.article_section)
                    // near by properties 
                    setnearbyCityData(responseData?.nearby_properties)
                    // set user_recommendation
                    setUserRecommendationData(responseData?.user_recommendation)
                    // set agent section data 
                    setAgentData(responseData?.agents_list)
                },
                onError: (err) => {
                    setIsLoading(false);
                    console.log(err)
                }
            })
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchHomePageData()
        fetchCountByCityData()
    }, [isLoggedIn])


    const handleImageLoaded = () => {
        // Set isLoading to false when the image is loaded
        setIsLoading(false);
    };

    return (
        <>
            <Layout>
                {isLoading ? (
                    <SliderSkeleton />
                ) : (
                    sliderData && sliderData?.length > 0 ? (
                        <section id="mainheroImage">
                            <div>
                                <SliderComponent sliderData={sliderData} />
                            </div>
                            {/* Sell Rent  */}

                            <SearchTab getCategories={Categorydata} />
                        </section>
                    ) : (
                        null
                    )
                )}
                <div style={{ marginTop: sliderData.length > 0 ? '0' : '150px' }}>

                    {/* Nearby City Section  Section  */}
                    {isLoading ? (
                        <section id="nearbyCityProperties">
                            <div className="container">
                                <div className="most_fav_header">
                                    <span className="headline">
                                        <span>
                                            {translate("properties")}{" "} {translate("nearby")}{" "} <span className=""> {userCurrentLocation}</span>
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
                                            start: translate("properties"),
                                            center: translate("nearby"),
                                            end: userCurrentLocation,
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
                    {/* featrured section */}
                    {isLoading ? (
                        <section id="feature" style={{ paddingTop: nearbyCityData && nearbyCityData?.length > 0 ? '"80px"' : "0px" }}>
                            <div className="container">
                                <div id="main_features" className="py-3">
                                    <div>
                                        <div className="feature_header">
                                            <span className="headline">
                                                {translate("discoverOur")} <span className="">{translate("featured")}</span> {translate("listings")}
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
                                                    start: translate("discoverOur"),
                                                    center: translate("featured"),
                                                    end: translate("listings"),
                                                    link: getFeaturedListing.length > 8 ? "/featured-properties" : "",
                                                }}
                                            />
                                        </div>
                                    </div>
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
                                                <span className="headline">
                                                    {translate("discoverOur")} <span className="">{translate("featured")}</span> {translate("listings")}
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
                                                        start: translate("discoverOur"),
                                                        center: translate("featured"),
                                                        end: translate("listings"),
                                                        link: getFeaturedListing.length > 8 ? "/featured-properties" : "",
                                                    }}
                                                />
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


                    {/* APARTMENT SECTION */}

                    {isLoading ? (
                        // Show skeleton loading when data is being fetched
                        <section id="apartments" style={{ padding: "50px" }}>
                            <div className="container">
                                <div className="row">
                                    <div className="col-sm-12 col-md-4 col-lg-3" id="browse-by-agents">
                                        <div className="browse-agent">
                                            <span>{translate("exploreApartment")}</span>
                                            <Link href="/all-categories">
                                                <button className="mt-3">
                                                    <FiEye className="mx-2" size={25} />
                                                    {translate("viewAllCategories")}
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="mobile-headline-view">
                                        <MobileHeadline
                                            data={{
                                                start: translate("explore"),
                                                center: translate("apart"),
                                                end: translate("types"),
                                                link: "/all-categories",
                                            }}
                                        />
                                    </div>
                                    <div className="col-sm-12 col-md-8 col-lg-9 loading_data">
                                        <Swiper
                                            dir={language.rtl === "1" ? "rtl" : "ltr"}
                                            spaceBetween={30}
                                            freeMode={true}
                                            pagination={{
                                                clickable: true,
                                            }}
                                            modules={[FreeMode, Pagination]}
                                            className="aprtment-swiper"
                                            breakpoints={breakpoints}
                                        >
                                            {Array.from({ length: 6 }).map((_, index) => (
                                                <SwiperSlide key={index}>
                                                    <CustomCategorySkeleton />
                                                </SwiperSlide>
                                            ))}
                                        </Swiper>
                                    </div>
                                </div>
                            </div>
                        </section>
                    ) : (
                        // Check if categoryData exists and has valid data
                        categoryData && categoryData.some(ele => ele.properties_count !== 0 && ele.properties_count !== "") ? (
                            <section id="apartments">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-sm-12 col-md-4 col-lg-3" id="browse-by-agents">
                                            <div className="browse-agent">
                                                <span>{translate("exploreApartment")}</span>
                                                <Link href="/all-categories">
                                                    <button className="mt-3">
                                                        <FiEye className="mx-2" size={25} />
                                                        {translate("viewAllCategories")}
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="mobile-headline-view">
                                            <MobileHeadline
                                                data={{
                                                    start: translate("explore"),
                                                    center: translate("apart"),
                                                    end: translate("types"),
                                                    link: "/all-categories",
                                                }}
                                            />
                                        </div>
                                        <div className="col-sm-12 col-md-8 col-lg-9" id="all-apart-cards">
                                            <div className="aprt_cards">
                                                <Swiper
                                                    dir={language.rtl === "1" ? "rtl" : "ltr"}
                                                    spaceBetween={30}
                                                    freeMode={true}
                                                    pagination={{
                                                        clickable: true,
                                                    }}
                                                    modules={[FreeMode, Pagination]}
                                                    className="aprtment-swiper"
                                                    breakpoints={breakpoints}
                                                >
                                                    {categoryData.map((ele, index) =>
                                                        ele.properties_count !== 0 && ele.properties_count !== "" ? (
                                                            <SwiperSlide id="aprt-swiper-slider" key={index}>
                                                                <Link href={`/properties/categories/${ele.slug_id}`}>
                                                                    <CategoryCard ele={ele} />
                                                                </Link>
                                                            </SwiperSlide>
                                                        ) : null
                                                    )}
                                                </Swiper>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        ) : null
                    )}

                    {/* ===== most PROPERTIE SECTION ====== */}


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
                                                    start: translate("most"),
                                                    center: translate("viewed"),
                                                    end: translate("properties"),
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
                                                        start: translate("most"),
                                                        center: translate("viewed"),
                                                        end: translate("properties"),
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

                    {/* ===== AGENT SECTION =======  */}

                    {/* {isLoading ? (
                        <>
                            <section id='agent_section'>
                                <div className="container">
                                    <div className='row'>

                                        <div className="col-sm-12 col-md-4 col-lg-3" id='browse-by-agents'>
                                            <div className='browse-agent'>
                                                <span>{translate("browseByAgents")}
                                                </span>
                                                <Link href="/all-agents">
                                                    <button className='mt-3'> <FiEye className="mx-2" size={25} />
                                                        {translate("viewAllAgents")}
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="mobile-headline-view"  >
                                            <MobileHeadline data={{
                                                start: translate("browser"),
                                                center: translate("agents"),
                                                link: "/all-agents"
                                            }
                                            } />
                                        </div>
                                        <div className="col-sm-12 col-md-4 col-lg-9" id='agent-slider-cards'>
                                            <div className="loading_data mt-4">
                                                <Swiper
                                                    dir={language.rtl === "1" ? "rtl" : "ltr"}
                                                    //  slidesPerView={4}
                                                    // loop={true}
                                                    spaceBetween={30}
                                                    freeMode={true}
                                                    pagination={{
                                                        clickable: true,

                                                    }}
                                                    modules={[FreeMode, Pagination]}
                                                    className='agent-swiper'
                                                    breakpoints={breakpoints}



                                                >
                                                    {Array.from({ length: 6 }).map((_, index) => (
                                                        <SwiperSlide>
                                                            <div className="loading_data">
                                                                <AgentCardSkeleton />
                                                            </div>
                                                        </SwiperSlide>
                                                    ))}
                                                </Swiper>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </>
                    ) : (
                        // Once loading is complete, render the agents section if data is available
                        agentsData && agentsData.length > 0 ? (
                            <section id='agent_section'>
                                <div className="container">
                                    <div className='row'>
                                        <div className="col-sm-12 col-md-4 col-lg-3" id='browse-by-agents'>
                                            <div className='browse-agent'>
                                                <span>{translate("browseByAgents")}</span>
                                                <Link href="/all-agents">
                                                    <button className='mt-3'>
                                                        <FiEye className="mx-2" size={25} />
                                                        {translate("viewAllAgents")}
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="mobile-headline-view">
                                            <MobileHeadline
                                                data={{
                                                    start: translate("browser"),
                                                    center: translate("agents"),
                                                    link: "/all-agents"
                                                }}
                                            />
                                        </div>
                                        <div className="col-sm-12 col-md-4 col-lg-9" id='agent-slider-cards'>
                                            <div className='agents-cards ' dir={language.rtl === "1" ? "rtl" : "ltr"}>
                                                <Swiper
                                                    dir={language.rtl === "1" ? "rtl" : "ltr"}
                                                    slidesPerView={3}
                                                    spaceBetween={30}
                                                    freeMode={true}
                                                    pagination={{
                                                        clickable: true,
                                                    }}
                                                    modules={[FreeMode, Pagination]}
                                                    className='agent-swiper'
                                                    breakpoints={breakpointsAgents}
                                                >
                                                    {agentsData.map((ele, index) => (
                                                        <SwiperSlide key={index} id="agent-swiper-slider" >
                                                            <AgentCard ele={ele} handlecheckPremiumUserAgent={handlecheckPremiumUserAgent} />
                                                        </SwiperSlide>
                                                    ))}
                                                </Swiper>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        ) : null
                    )} */}

                    {/* user recommendation section  */}
                    {isLoading ? (
                        // Show skeleton loading when data is being fetched
                        <section id="personalize_feed">
                            <div className="container">
                                <div className="personalize_feed_header">
                                    <h3 className="headline">
                                        <span className="">
                                            {" "} {translate("personalize")}
                                        </span>
                                        {" "}
                                        <span>
                                            <span>{translate("feed")}</span>
                                        </span>{" "}
                                    </h3>
                                </div>
                                <div className="mobile-headline-view">
                                    <MobileHeadline
                                        data={{
                                            start: translate("personalize"),
                                            center: translate("feed"),
                                            link: "",
                                        }}
                                    />
                                </div>
                                <div id="personalize_feed_properties" dir={language.rtl === "1" ? "rtl" : "ltr"}>
                                    <Swiper
                                        slidesPerView={4}
                                        spaceBetween={30}
                                        freeMode={true}
                                        pagination={{
                                            clickable: true,
                                        }}
                                        modules={[FreeMode, Pagination]}
                                        className="personalize_feed_swiper"
                                        breakpoints={breakpointsMostFav}
                                    >
                                        {Array.from({ length: 6 }).map((_, index) => (
                                            <SwiperSlide key={index}>
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
                        // Check if userRecommendationData exists and has valid data
                        userRecommendationData && userRecommendationData.length > 0 ? (
                            <section id="personalize_feed">
                                <div className="container">
                                    <div className="personalize_feed_header">
                                        <h3 className="headline">
                                            <span className="">
                                                {" "} {translate("personalize")}
                                            </span>
                                            {" "}
                                            <span>
                                                <span>{translate("feed")}</span>
                                            </span>{" "}
                                        </h3>
                                        <div className="rightside_personalize_feed">
                                            {userRecommendationData.length > 4 ?
                                                <Link href="/all-personalized-feeds">
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
                                                start: translate("personalize"),
                                                center: translate("feed"),
                                                link: userRecommendationData.length > 4 ? "/all-personalized-feeds" : "",
                                            }}
                                        />
                                    </div>
                                    <div id="personalize_feed_properties" dir={language.rtl === "1" ? "rtl" : "ltr"}>
                                        <Swiper
                                            slidesPerView={4}
                                            spaceBetween={30}
                                            freeMode={true}
                                            pagination={{
                                                clickable: true,
                                            }}
                                            modules={[FreeMode, Pagination]}
                                            className="personalize_feed_swiper"
                                            breakpoints={breakpointsMostFav}
                                        >
                                            {userRecommendationData.map((ele, index) => (
                                                <SwiperSlide id="most-view-swiper-slider" key={index}>
                                                    <Link href="/properties-details/[slug]" as={`/properties-details/${ele.slug_id}`} passHref>
                                                        <UserRecommendationCard ele={ele} />
                                                    </Link>
                                                </SwiperSlide>
                                            ))}
                                        </Swiper>
                                    </div>
                                </div>
                            </section>
                        ) : null
                    )}

                    {isLoading ? (
                        // Show skeleton loading when data is being fetched
                        <section id="upcoming_projects" style={{ marginBottom: !isPremiumUser ? '100px' : '0' }}>
                            <div className="container">
                                <div className="project_header">
                                    <h3 className="headline">
                                        {translate("upcoming")}{" "}
                                        <span>
                                            <span className=""> {translate("projects")}</span>
                                        </span>{" "}
                                    </h3>
                                </div>
                                <div className="mobile-headline-view-project">
                                    <div id="mobile_headline_projects">
                                        <div className="main_headline_projects">
                                            <span className="headline">
                                                {translate("upcoming")}{" "}
                                                <span>
                                                    <span className=""> {translate("projects")}</span>
                                                </span>{" "}
                                            </span>
                                        </div>
                                        <div>
                                            <button className="mobileViewArrowProject">
                                                <IoIosArrowForward size={25} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div id="projects_cards" dir={language.rtl === "1" ? "rtl" : "ltr"}>
                                    <Swiper
                                        slidesPerView={4}
                                        spaceBetween={30}
                                        freeMode={true}
                                        pagination={{
                                            clickable: true,
                                        }}
                                        modules={[FreeMode, Pagination]}
                                        className="all_project_swiper"
                                        breakpoints={breakpointsProjects}
                                    >
                                        {Array.from({ length: 6 }).map((_, index) => (
                                            <SwiperSlide key={index}>
                                                <div className="loading_data">
                                                    <ProjectCardSkeleton />
                                                </div>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                </div>
                            </div>
                        </section>
                    ) : (
                        // Check if getProjects exists and has valid data
                        getProjects && getProjects.length > 0 ? (
                            <section id="upcoming_projects" style={{ marginBottom: !isPremiumUser ? '100px' : '0' }}>
                                <div className="container">
                                    <div className="project_header">
                                        <h3 className="headline">
                                            {translate("upcoming")}{" "}
                                            <span>
                                                <span className=""> {translate("projects")}</span>
                                            </span>{" "}
                                        </h3>
                                        <div className="rightside_project_header">
                                            {getProjects.length > 4 ?
                                                <Link href="/all-projects">
                                                    <button className="learn-more-project" id="viewall_projects">
                                                        <span aria-hidden="true" className="circle">
                                                            <div className="icon_div">
                                                                <span className="icon arrow">
                                                                    {language.rtl === 1 ? <BsArrowLeft /> : <BsArrowRight />}
                                                                </span>
                                                            </div>
                                                        </span>
                                                        <span className="button-text">{translate("seeAllProjects")}</span>
                                                    </button>
                                                </Link>
                                                : null}
                                        </div>
                                    </div>
                                    <div className="mobile-headline-view-project">
                                        <div id="mobile_headline_projects">
                                            <div className="main_headline_projects">
                                                <span className="headline">
                                                    {translate("upcoming")}{" "}
                                                    <span>
                                                        <span className=""> {translate("projects")}</span>
                                                    </span>{" "}
                                                </span>
                                            </div>
                                            <div>
                                                {getProjects.length > 4 ?
                                                    <Link href="/all-projects">
                                                        <button className="mobileViewArrowProject">
                                                            <IoIosArrowForward size={25} />
                                                        </button>
                                                    </Link>
                                                    : null}
                                            </div>
                                        </div>
                                    </div>
                                    <div id="projects_cards" dir={language.rtl === "1" ? "rtl" : "ltr"}>
                                        <Swiper
                                            slidesPerView={4}
                                            spaceBetween={30}
                                            freeMode={true}
                                            pagination={{
                                                clickable: true,
                                            }}
                                            modules={[FreeMode, Pagination]}
                                            className="all_project_swiper"
                                            breakpoints={breakpointsProjects}
                                        >
                                            {getProjects.map((ele, index) => (
                                                <SwiperSlide id="most-view-swiper-slider" key={index} onClick={(e) => handlecheckPremiumUser(e, ele.slug_id)}>
                                                    <ProjectCard ele={ele} />
                                                </SwiperSlide>
                                            ))}
                                        </Swiper>
                                    </div>
                                </div>

                                {!isPremiumUser &&
                                    <div className="subscribeForProject">
                                        <div className="container">
                                            <div className="card subcribeCard">
                                                <h3>
                                                    {translate("ourPremium")}
                                                </h3>
                                                <Link href="/subscription-plan" className="subscribeNoButton">
                                                    {translate("subscribeNow")} {""}
                                                    <FaArrowRight size={20} />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                }

                            </section>
                        ) : null
                    )}

                    {/* ===== MOST FAV SECTION =======  */}
                    {isLoading ? (
                        // Show skeleton loading when data is being fetched
                        <section id="most_fav_loading">
                            <div className="container">
                                <div className="most_fav_header mt-4">
                                    <div>
                                        <h3 className="headline">
                                            {translate("most")}{" "}
                                            <span>
                                                <span className="">{translate("fav")}</span>
                                            </span>{" "}
                                            {translate("properties")}
                                        </h3>
                                    </div>
                                    <div className="rightside_most_fav_header">
                                        {getMostFavProperties.length > 6 ?
                                            <Link href="/most-favorite-properties">
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
                                <div className="loading_data_section mt-4">
                                    <Swiper
                                        dir={language.rtl === "1" ? "rtl" : "ltr"}
                                        slidesPerView={4}
                                        spaceBetween={30}
                                        freeMode={true}
                                        pagination={{
                                            clickable: true,
                                        }}
                                        modules={[FreeMode, Pagination]}
                                        className="most-view-swiper"
                                        breakpoints={breakpointsMostFav}
                                    >
                                        {Array.from({ length: 6 }).map((_, index) => (
                                            <SwiperSlide key={index}>
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
                        // Show actual data when loading is complete
                        getMostFavProperties && getMostFavProperties.length > 0 ? (
                            <section id="most_fav">
                                <div className="container">
                                    <div className="most_fav_header">
                                        <div>
                                            <h3 className="headline">
                                                {translate("most")}{" "}
                                                <span>
                                                    <span className="">{translate("fav")}</span>
                                                </span>{" "}
                                                {translate("properties")}
                                            </h3>
                                        </div>
                                        <div className="rightside_most_fav_header">
                                            {getMostFavProperties.length > 6 ?
                                                <Link href="/most-favorite-properties">
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
                                                start: translate("most"),
                                                center: translate("fav"),
                                                end: translate("properties"),
                                                link: getMostFavProperties.length > 6 ? "/most-favorite-properties" : "",
                                            }}
                                        />
                                    </div>
                                    <div id="most-view-properties" dir={language.rtl === "1" ? "rtl" : "ltr"}>
                                        <Swiper
                                            slidesPerView={4}
                                            spaceBetween={30}
                                            freeMode={true}
                                            pagination={{
                                                clickable: true,
                                            }}
                                            modules={[FreeMode, Pagination]}
                                            className="most-view-swiper"
                                            breakpoints={breakpointsMostFav}
                                        >
                                            {getMostFavProperties.map((ele, index) => (
                                                <SwiperSlide key={index} id="most-view-swiper-slider">
                                                    <Link href="/properties-details/[slug]" as={`/properties-details/${ele.slug_id}`} passHref>
                                                        <VerticalCard ele={ele} />
                                                    </Link>
                                                </SwiperSlide>
                                            ))}
                                        </Swiper>
                                    </div>
                                </div>
                            </section>
                        ) : null
                    )}

                    {/* ===== PROPERTIES NEARBY CITY  SECTION ====== */}
                    {isLoading ? (
                        // Show skeleton UI when data is being fetched
                        <section id="main_citySection">
                            <div className="container">
                                <div className="prop_city_header">
                                    <h3 className="headline">
                                        {translate("properties")}{" "}
                                        <span>
                                            <span className=""> {translate("nearby")}</span>
                                        </span>{" "}
                                        {translate("cities")}
                                    </h3>
                                </div>
                                <div className="mobile-headline-view">
                                    <MobileHeadline
                                        data={{
                                            start: translate("properties"),
                                            center: translate("nearby"),
                                            end: translate("cities"),
                                            link: "",
                                        }}
                                    />
                                </div>
                                <div className="row" id="nearBy-Citys">
                                    {/* {Array.from({ length: 6 }).map((_, index) => ( */}
                                    <div className="col-12" >
                                        <div className="loading_data">
                                            <NearByCitysSkeleton />
                                        </div>
                                    </div>
                                    {/* ))} */}
                                </div>
                            </div>
                        </section>
                    ) : (
                        // Check if getNearByCitysData exists and has valid data
                        getNearByCitysData && getNearByCitysData.length > 0 ? (
                            <section id="main_citySection">
                                <div className="container">
                                    <div className="prop_city_header">
                                        <h3 className="headline">
                                            {translate("properties")}{" "}
                                            <span>
                                                <span className=""> {translate("nearby")}</span>
                                            </span>{" "}
                                            {translate("cities")}
                                        </h3>
                                        <div className="rightside_prop_city_header">
                                            {getNearByCitysData.length > 6 ?
                                                <Link href="/properties-nearby-city">
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
                                                start: translate("properties"),
                                                center: translate("nearby"),
                                                end: translate("cities"),
                                                link: getNearByCitysData.length > 6 ? "/properties-nearby-city" : "",
                                            }}
                                        />
                                    </div>
                                    <div className="row" id="nearBy-Citys">
                                        {getNearByCitysData?.length > 5 ? (
                                            <>
                                                <div className="col-12 col-md-6 col-lg-3" id="city_img_div">
                                                    <Link href={`/properties/city/${getNearByCitysData[1]?.City}`}>
                                                        <div className="card bg-dark text-white mb-3" id="group_card">
                                                            <Image
                                                                loading="lazy"
                                                                src={getNearByCitysData && getNearByCitysData[1]?.image}
                                                                className="card-img"
                                                                alt="no_img"
                                                                id="TopImg"
                                                                width={200}
                                                                height={200}
                                                                onError={placeholderImage}
                                                            />
                                                            <div className="card-img-overlay">
                                                                <div id="city_img_headlines">
                                                                    <h4 className="card-title">{getNearByCitysData && getNearByCitysData[1]?.City}</h4>
                                                                    <p className="card-text">
                                                                        {getNearByCitysData && getNearByCitysData[1]?.Count} {translate("properties")}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </div>
                                                <div className="col-12 col-md-6 col-lg-3" id="city_img_div">
                                                    <Link href={`/properties/city/${getNearByCitysData[2]?.City}`}>
                                                        <div className="card bg-dark text-white mb-3" id="group_card">
                                                            <Image
                                                                loading="lazy"
                                                                src={getNearByCitysData && getNearByCitysData[2]?.image}
                                                                onError={placeholderImage}
                                                                className="card-img"
                                                                alt="no_img"
                                                                id="TopImg"
                                                                width={200}
                                                                height={200}
                                                            />
                                                            <div className="card-img-overlay">
                                                                <div id="city_img_headlines">
                                                                    <h4 className="card-title">{getNearByCitysData && getNearByCitysData[2]?.City}</h4>
                                                                    <p className="card-text">
                                                                        {getNearByCitysData && getNearByCitysData[2]?.Count} {translate("properties")}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </div>
                                                <div className="col-lg-6" id="city_image_main_div">
                                                    <Link href={`/properties/city/${getNearByCitysData[0]?.City}`}>
                                                        <div className="card bg-dark text-white mb-3" id="cityImgTop">
                                                            <Image
                                                                loading="lazy"
                                                                src={getNearByCitysData && getNearByCitysData[0]?.image}
                                                                className="card-img"
                                                                alt="no_img"
                                                                id="TopImg"
                                                                width={200}
                                                                height={200}
                                                                onError={placeholderImage}
                                                            />
                                                            <div className="card-img-overlay">
                                                                <div id="city_img_headlines">
                                                                    <h4 className="card-title">{getNearByCitysData && getNearByCitysData[0]?.City} </h4>
                                                                    <p className="card-text">
                                                                        {getNearByCitysData && getNearByCitysData[0]?.Count} {translate("properties")}{" "}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </div>
                                                <div className="col-lg-6" id="city_image_main_div">
                                                    <Link href={`/properties/city/${getNearByCitysData[5]?.City}`}>
                                                        <div className="card bg-dark text-white" id="cityImgTop">
                                                            <Image
                                                                loading="lazy"
                                                                src={getNearByCitysData && getNearByCitysData[5]?.image}
                                                                className="card-img"
                                                                alt="no_img"
                                                                id="TopImg"
                                                                onError={placeholderImage}
                                                                width={200}
                                                                height={200}
                                                            />
                                                            <div className="card-img-overlay">
                                                                <div id="city_img_headlines">
                                                                    <h4 className="card-title">{getNearByCitysData && getNearByCitysData[5]?.City} </h4>
                                                                    <p className="card-text">
                                                                        {getNearByCitysData && getNearByCitysData[5]?.Count} {translate("properties")}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </div>
                                                <div className="col-12 col-md-6 col-lg-3" id="city_img_div01">
                                                    <Link href={`/properties/city/${getNearByCitysData[3]?.City}`}>
                                                        <div className="card bg-dark text-white" id="group_card">
                                                            <Image
                                                                loading="lazy"
                                                                src={getNearByCitysData && getNearByCitysData[3]?.image}
                                                                className="card-img"
                                                                alt="no_img"
                                                                id="TopImg"
                                                                width={200}
                                                                height={200}
                                                                onError={placeholderImage}
                                                            />
                                                            <div className="card-img-overlay">
                                                                <div id="city_img_headlines">
                                                                    <h4 className="card-title">{getNearByCitysData && getNearByCitysData[3]?.City}</h4>
                                                                    <p className="card-text">
                                                                        {getNearByCitysData && getNearByCitysData[3]?.Count} {translate("properties")}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </div>
                                                <div className="col-12 col-md-6 col-lg-3" id="city_img_div01">
                                                    <Link href={`/properties/city/${getNearByCitysData[4]?.City}`}>
                                                        <div className="card bg-dark text-white " id="group_card">
                                                            <Image
                                                                loading="lazy"
                                                                src={getNearByCitysData && getNearByCitysData[4]?.image}
                                                                className="card-img"
                                                                alt="no_img"
                                                                id="TopImg"
                                                                width={200}
                                                                height={200}
                                                                onError={placeholderImage}
                                                            />
                                                            <div className="card-img-overlay">
                                                                <div id="city_img_headlines">
                                                                    <h4 className="card-title">{getNearByCitysData && getNearByCitysData[4]?.City}</h4>
                                                                    <p className="card-text">
                                                                        {getNearByCitysData && getNearByCitysData[4]?.Count} {translate("properties")}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                {getNearByCitysData?.slice(0, 4).map((ele, index) => (
                                                    <div className="col-12 col-md-6 col-lg-3" id="city_img_div" key={index}>
                                                        <Link href={`/properties/city/${ele?.City}`}>
                                                            <div className="card bg-dark text-white mb-3" id="group_card">
                                                                <Image
                                                                    loading="lazy"
                                                                    src={ele?.image}
                                                                    className="card-img"
                                                                    alt="no_img"
                                                                    id="TopImg"
                                                                    width={200}
                                                                    height={200}
                                                                    onError={placeholderImage}
                                                                />
                                                                <div className="card-img-overlay">
                                                                    <div id="city_img_headlines">
                                                                        <h4 className="card-title">{ele?.City}</h4>
                                                                        <p className="card-text">
                                                                            {ele?.Count} {translate("properties")}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                ))}
                                            </>
                                        )}
                                    </div>
                                </div>
                            </section>
                        ) : null
                    )}

                    {/* ========== ARTICLE SECTION ========== */}
                    {isLoading ? (
                        // Show loading state while data is being fetched
                        <div className="container">
                            <div className="article_headline mt-4">
                                <div>
                                    <h3 className="headline">
                                        {translate("our")}{" "}
                                        <span>
                                            <span className="">{translate("articles")}</span>
                                        </span>
                                    </h3>
                                </div>
                                <div className="rightside_article_headlin">
                                    {getArticles.length > 4 ? (
                                        <Link href="/articles">
                                            <button className="learn-more" id="viewall">
                                                <span aria-hidden="true" className="circle">
                                                    <div className="icon_div">
                                                        <span className="icon arrow">
                                                            {language.rtl === 1 ? <BsArrowLeft /> : <BsArrowRight />}
                                                        </span>
                                                    </div>
                                                </span>
                                                <span className="button-text">{translate("seeAllArticles")}</span>
                                            </button>
                                        </Link>
                                    ) : null}
                                </div>
                            </div>
                            <div className="mobile-headline-view">
                                <MobileHeadline
                                    data={{
                                        start: translate("our"),
                                        center: translate("articles"),
                                        link: getArticles.length > 4 ? "/articles" : "",
                                    }}
                                />
                            </div>
                            <div className="row mt-5 mb-5" >
                                {Array.from({ length: 4 }).map((_, index) => (
                                    <div key={index} className="col-sm-12 col-md-6 col-lg-3 loading_data">
                                        <ArticleCardSkeleton />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        // Render articles when data is loaded
                        getArticles && getArticles?.length > 0 ? (
                            <section id="articles">
                                <div className="container">
                                    <div className="article_headline">
                                        <div>
                                            <h3 className="headline">
                                                {translate("our")}{" "}
                                                <span>
                                                    <span className="">{translate("articles")}</span>
                                                </span>
                                            </h3>
                                        </div>
                                        <div className="rightside_article_headlin">
                                            {getArticles.length > 4 ? (
                                                <Link href="/articles">
                                                    <button className="learn-more" id="viewall">
                                                        <span aria-hidden="true" className="circle">
                                                            <div className="icon_div">
                                                                <span className="icon arrow">
                                                                    {language.rtl === 1 ? <BsArrowLeft /> : <BsArrowRight />}
                                                                </span>
                                                            </div>
                                                        </span>
                                                        <span className="button-text">{translate("seeAllArticles")}</span>
                                                    </button>
                                                </Link>
                                            ) : null}
                                        </div>
                                    </div>
                                    <div className="mobile-headline-view">
                                        <MobileHeadline
                                            data={{
                                                start: translate("our"),
                                                center: translate("articles"),
                                                link: getArticles.length > 4 ? "/articles" : "",
                                            }}
                                        />
                                    </div>
                                    <div className="row" id="article_cards">
                                        {getArticles?.slice(0, 4).map((ele, index) => (
                                            <div key={index} className="col-12 col-md-6 col-lg-3">
                                                <ArticleCard ele={ele} index={index} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </section>
                        ) : null
                    )}


                    {/* WHEN NO DATA IN ADMIN PANEL  */}
                    {!isLoading &&

                        sliderData?.length !== 1 &&
                        getFeaturedListing?.length !== 1 &&
                        categoryData?.every(ele => ele.properties_count !== 1 || ele.properties_count === "") &&
                        getMostViewedProp?.length !== 1 &&
                        getNearByCitysData?.length !== 1 &&
                        getMostFavProperties?.length !== 1 &&
                        agentsData?.length !== 1 &&
                        getArticles?.length !== 1 ? (
                        <div className="noData_container">
                            <NoData />
                        </div>
                    ) : null}
                </div>



                {showModal &&
                    <LoginModal isOpen={showModal} onClose={handleCloseModal} />
                }
            </Layout >

        </>
    );
};

export default HomePage;
