import React, { useState, useEffect } from "react";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import { FaEye } from "react-icons/fa";
import Link from "next/link";
import { GoPlay } from "react-icons/go";
import VideoPlayerModal from "../PlayerModal/VideoPlayerModal";
import { useSelector } from "react-redux";
import { settingsData } from "@/store/reducer/settingsSlice";
import { formatNumberWithCommas, placeholderImage, translate } from "@/utils";
import { BiLeftArrowCircle, BiRightArrowCircle } from "react-icons/bi";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const AutoplaySlider = withAutoplay(AwesomeSlider);
import { IoIosArrowDown } from "react-icons/io";
import { LuShovel } from "react-icons/lu";
import { FaRegShareSquare } from "react-icons/fa";
import { FaIdCardClip } from "react-icons/fa6";
import { FaFileSignature } from "react-icons/fa";
import { BsArrowLeftRight } from "react-icons/bs";
import { FaRegCreditCard } from "react-icons/fa6";
import { FaTableTennis } from "react-icons/fa";
import { FaHandSparkles } from "react-icons/fa";
// import videobg from "/rivetonbgvideo.mp4";

const SliderComponent = ({ sliderData }) => {
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [autoplay, setAutoplay] = useState(true); // Add state for controlling autoplay
  const systemSetttings = useSelector(settingsData);
  const CurrencySymbol = systemSetttings && systemSetttings.currency_symbol;
  const PlaceHolderImg =
    systemSetttings && systemSetttings?.web_placeholder_logo;

  const handleCloseModal = () => {
    setShowVideoModal(false);
    setAutoplay(true); // Enable autoplay when the video player is closed
  };
  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 200,
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: false,
    autoplay: true,
  };
  const settingsTwo = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };
  const handleOpenModal = () => {
    setShowVideoModal(true);
    setAutoplay(false); // Disable autoplay when the video player is open
  };

  const ButtonContentLeft = (
    <BiLeftArrowCircle className="custom_icons_slider" />
  );
  const ButtonContentRight = (
    <BiRightArrowCircle className="custom_icons_slider" />
  );
  console.log(sliderData, "sliderData");

  return (
    <div>
      <div className="slider-container">
        {/* <AutoplaySlider
        animation="cube"
        buttonContentRight={ButtonContentRight}
        buttonContentLeft={ButtonContentLeft}
        organicArrows={false}
        bullets={false}
        play={autoplay} // Use the state to control autoplay
        interval={3000}
        disableProgressBar={true}
      >
        {sliderData.map((single, index) => (
          <div
            key={index}
            data-src={single?.property?.title_image ? single?.property?.title_image : PlaceHolderImg}
            className='main_slider_div'
          >
            <div className="container">
              <div id="herotexts">
                <div>
                  <span id="priceteg">
                    <span>
                      {CurrencySymbol}
                    </span>
                    <span>
                      {formatNumberWithCommas(single?.property?.price)}
                    </span>
                  </span>
                  <h1 id="hero_headlines">{single?.property?.title}</h1>
                  <div className="hero_text_parameters">
                    {single?.parameters &&
                      single?.parameters.slice(0, 4).map((elem, index) => (
                        elem.value !== 0 && elem.value !== null && elem.value !== undefined && elem.value !== "" && (
                          <span key={index} id="specification">
                            {elem.name} : {elem.value}{index < 3 ? ', ' : ''}
                          </span>
                        )
                      ))}
                  </div>
                </div>
                <div id="viewall_hero_prop">
                  <Link href="/properties-details/[slug]" as={`/properties-details/${single?.property?.slug_id}`} passHref>
                    <button className="view_prop">
                      <FaEye size={20} className="icon" />
                      {translate("viewProperty")}
                    </button>
                  </Link>
                  {single && single?.property?.video_link ? (
                    <>
                      <div>
                        <GoPlay
                          className="playbutton"
                          size={50}
                          onClick={handleOpenModal} // Open the video player
                        />
                      </div>
                      <VideoPlayerModal isOpen={showVideoModal} onClose={handleCloseModal} data={single} />
                    </>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        ))}
      </AutoplaySlider> */}

        <div className="slider-container relative">
          <Slider {...settings}>
            {sliderData.map((single, index) => (
              // console.log(single, "single"),
              <div className="bg-overlay">
                {/* <img
                  style={{ width: "100%" }}
                  src={
                    single?.property?.title_image
                      ? single?.property?.title_image
                      : PlaceHolderImg
                  }
                /> */}
                <video
                  className=""
                  src="/rivetonbgvideo.mp4"
                  autoPlay
                  loop
                  muted
                />
                <h1 className="position-absolute image-title text-z-index">
                  {single.property.title}
                </h1>
                <p className="subtitle text-z-index">
                  Where Waterfront Dreams Become Reality
                </p>
              </div>
            ))}
          </Slider>
          <li
            className={`text-uppercase bg-white text-dark loeadMoreBtn d-flex align-items-center px-3 py-3`}
          >
            {translate("learnMore")}
          </li>

          <div className="menuItemsBtn">
            <div className="px-2 prop-search-bar d-flex">
              <div className="d-flex align-items-center prop-search-bar-items right-border">
                <div>
                  <div className="prop-search-bar-span">Property Type</div>
                  <div className="prop-search-bar-span mt-2 prop-search-bar-span-font">
                    Any
                  </div>
                </div>
                <IoIosArrowDown className="me-2" />
              </div>
              <div className="d-flex align-items-center prop-search-bar-items right-border">
                <div>
                  <div className="prop-search-bar-span">BedRoom</div>
                  <div className="prop-search-bar-span mt-2 prop-search-bar-span-font">
                    Any
                  </div>
                </div>
                <IoIosArrowDown className="me-2" />
              </div>
              <div className="d-flex align-items-center prop-search-bar-items right-border">
                <div>
                  <div className="prop-search-bar-span">Price Range</div>
                  <div className="prop-search-bar-span mt-2 prop-search-bar-span-font">
                    Any
                  </div>
                </div>
                <IoIosArrowDown className="me-2" />
              </div>
              <div className="d-flex align-items-center prop-search-bar-items right-border">
                <div>
                  <div className="prop-search-bar-span">Locations </div>
                  <div className="prop-search-bar-span mt-2 prop-search-bar-span-font">
                    Any
                  </div>
                </div>
                <IoIosArrowDown className="me-2" />
              </div>
              <div className="d-flex align-items-center prop-search-bar-items">
                <div className="serach-btn w-100">Quick Search</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-sider bg-white mt-5">
        <div className="row">
          <div className="col-lg-6">
            <div className="new-text my-5">
              RIVETON WORLD <div className="top-border"></div>
            </div>
            <h2 className="left-heading">About Us</h2>
            <div
              className="sub-title mb-5"
              style={{ fontSize: "18px", textAlign: "start", padding: 0 }}
            >
              Riveton Developments Ltd is a 21st century Real Estate Company
              located in Lagos, Nigeria. Riveton Homes and Properties is a
              product of Riveton Developments Ltd.<br></br>
              <br></br> We are focused on building new Nigerian communities
              primarily in Lagos and other places all over Nigeria. Our fulcrum
              plan is to continuously deliver new Real Estate projects and in
              the long run, move everyday Nigerians towards their property
              investment dreams.
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <img src="/1.jpg" className="w-100" />
            <h2 class="text-center heading-sider"> Latest Project</h2>
            <div class="sub-title">
              Experience Dubai Hills Estate communities and amenities from the
            </div>
            <div className="btn-wrapper">
              <div className="sider-btn">
                <div className="sider-btn-hover">Try it Now</div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <img src="/2.jpg" className="w-100" />
            <h2 class="text-center heading-sider">Deals and Discount</h2>
            <div class="sub-title">
              Explore our portfolio of international projects.
            </div>
            <div className="btn-wrapper">
              <div className="sider-btn">
                <div className="sider-btn-hover">Read More</div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <img src="/3.jpg" className="w-100" />
            <h2 class="text-center heading-sider">Blogs</h2>
            <div class="sub-title">
              Click to read our top tips and tricks for property management,
              home decoration and more.
            </div>
            <div className="btn-wrapper">
              <div className="sider-btn">
                <div className="sider-btn-hover">CLICK HERE</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-5 bg-white">
        <div className="col-md-4 px-5 mt-5 pt-5">
          <div className="new-text my-5">
            PROPERTIES <div className="top-border mt-0"></div>
          </div>
          <h2 className="left-heading">LATEST PROJECTS</h2>
          <div
            className="sub-title"
            style={{ fontSize: "18px", textAlign: "start", padding: 0 }}
          >
            Our properties, located in prime areas, boast unique designs and
            aspirational lifestyles within vibrant Emaar communities, all
            seamlessly managed by Emaar Community Management's dedicated team.
          </div>
          <div className="btn-wrapper">
            <div className="sider-btn" style={{ maxWidth: "100%" }}>
              <div className="sider-btn-hover">View All Properties</div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="img-container">
            <img src="/4.jpg" className="w-100 zoom-img" />
          </div>
          <div className="d-flex py-3">
            <div className="details-text">
              Address Residences at Dubai Hills Estate
            </div>
            <div
              className="details-text d-flex ps-3"
              style={{ border: "none" }}
            >
              Dubai <br /> Hills Estate <div className="top-border "></div>
            </div>
          </div>
          <div className="img-container">
            <img src="/5.jpg" className="w-100 zoom-img" />
          </div>
          <div className="d-flex py-3">
            <div className="details-text">
              Address Residences at Dubai Hills Estate
            </div>
            <div
              className="details-text d-flex ps-3"
              style={{ border: "none" }}
            >
              Dubai <br /> Hills Estate <div className="top-border "></div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="img-container">
            <img src="/6.jpg" className="w-100 zoom-img" />
          </div>
          <div className="d-flex py-3">
            <div className="details-text">Palmiera 3 at The Oasis</div>
            <div
              className="details-text d-flex ps-3"
              style={{ border: "none" }}
            >
              THE OASIS <div className="top-border "></div>
            </div>
          </div>
          <div className="img-container">
            <img src="/7.jpg" className="w-100 zoom-img" />
          </div>
          <div className="d-flex py-3">
            <div className="details-text">Parkland at Dubai Hills Estate</div>
            <div
              className="details-text d-flex ps-3"
              style={{ border: "none" }}
            >
              Dubai Hills Estate <div className="top-border "></div>
            </div>
          </div>
          <div className="img-container">
            <img src="/8.jpg" className="w-100 zoom-img" />
          </div>
          <div className="d-flex py-3">
            <div className="details-text">Golf Point at Emaar South</div>
            <div
              className="details-text d-flex ps-3"
              style={{ border: "none" }}
            >
              Emaar South <div className="top-border "></div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5 bg-white">
        <div className="new-text py-5 ps-3">
          COMMUNITIES <div className="top-border mt-0"></div>
        </div>
        <h2 className="left-heading ps-3">Featured PROJECTS</h2>
        <Slider {...settingsTwo}>
          <div className="p-3">
            <div className="img-container">
              <img src="/9.jpg" className="w-100 zoom-img" />
            </div>
            <h3 className="mt-4 mb-2 second-slider-title">The Oasis</h3>
            <span class="second-slider-sub-title">Immerse in Pure Luxury</span>
            <span class="second-slider-sub-title">Villas and Mansions</span>
          </div>
          <div className="p-3">
            <div className="img-container">
              <img src="/10.jpg" className="w-100 zoom-img" />
            </div>
            <h3 className="mt-4 mb-2 second-slider-title">Dubai Marina</h3>
            <span class="second-slider-sub-title"></span>
            <span class="second-slider-sub-title">project by Emaar</span>
          </div>
          <div className="p-3">
            <div className="img-container">
              <img src="/12.jpg" className="w-100 zoom-img" />
            </div>
            <h3 className="mt-4 mb-2 second-slider-title">
              Dubai Hills Estate
            </h3>
            <span class="second-slider-sub-title"></span>
            <span class="second-slider-sub-title">3 to 6 BEDROOM VILLAS</span>
          </div>
          <div className="p-3">
            <div className="img-container">
              <img src="/11.jpg" className="w-100 zoom-img" />
            </div>

            <h3 className="mt-4 mb-2 second-slider-title">
              Dubai Creek Harbour
            </h3>
            <span class="second-slider-sub-title">Views to Live for</span>
            <span class="second-slider-sub-title">Apartments and Villas</span>
          </div>

          <div className="p-3">
            <div className="img-container">
              <img src="/13.jpg" className="w-100 zoom-img" />
            </div>
            <h3 className="mt-4 mb-2 second-slider-title">
              Arabian Ranches III
            </h3>
            <span class="second-slider-sub-title">Find your happy </span>
            <span class="second-slider-sub-title">3 & 4 Bedroom Villas</span>
          </div>
        </Slider>
      </div>

      <div className="row mt-5 bg-white">
        <div className="col-md-6 px-4">
          <div className="new-text my-5">
            A DIGITAL EXPERIENCE <div className="top-border mt-0"></div>
          </div>
          <h2 className="left-heading">
            Riveton World App for all what you need. Coming Soon!
          </h2>
          <div
            className="sub-title"
            style={{ fontSize: "18px", textAlign: "start", padding: 0 }}
          >
            Emaar One allows homeowners and tenants to fully manage their
            property from their phone anytime anywhere.
          </div>

          <div className="row mt-5 ">
            <div className="col-md-6 px-4">
              <div className="d-flex align-items-center mb-4">
                <div className="icon-outer">
                  <LuShovel />
                </div>
                <div className="icon-info"> Construction updates</div>
              </div>
              <div className="d-flex align-items-center mb-4">
                <div className="icon-outer">
                  <FaFileSignature />
                </div>
                <div className="icon-info"> Ownership updates</div>
              </div>
              <div className="d-flex align-items-center mb-4">
                <div className="icon-outer">
                  <FaIdCardClip />
                </div>
                <div className="icon-info"> Access card requests</div>
              </div>
              <div className="d-flex align-items-center mb-4">
                <div className="icon-outer">
                  <FaTableTennis />
                </div>
                <div className="icon-info"> Amenities booking</div>
              </div>
            </div>
            <div className="col-md-6 px-4">
              <div className="d-flex align-items-center mb-4">
                <div className="icon-outer">
                  <FaRegShareSquare />
                </div>
                <div className="icon-info"> Property-related transfers</div>
              </div>
              <div className="d-flex align-items-center mb-4">
                <div className="icon-outer">
                  <BsArrowLeftRight />
                </div>
                <div className="icon-info"> Move In/Out requests</div>
              </div>
              <div className="d-flex align-items-center mb-4">
                <div className="icon-outer">
                  <FaRegCreditCard />
                </div>
                <div className="icon-info"> Online payments</div>
              </div>
              <div className="d-flex align-items-center mb-4">
                <div className="icon-outer">
                  <FaHandSparkles />
                </div>
                <div className="icon-info"> ECM & Home services</div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 px-5">
          <img src="/digital-experiance.png" className="w-100" />
        </div>
      </div>
    </div>
  );
};

export default SliderComponent;
