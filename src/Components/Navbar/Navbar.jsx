"use client";
import React, { useState, useEffect } from "react";
import ebroker from "@/assets/Logo_Color.png";
import { RiUserSmileLine } from "react-icons/ri";
import { IoVideocamOutline } from "react-icons/io5";
import { CloseButton, Dropdown } from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { FiPlusCircle } from "react-icons/fi";
import LoginModal from "../LoginModal/LoginModal";
import AreaConverter from "../AreaConverter/AreaConverter";
import { GiHamburgerMenu } from "react-icons/gi";
import { useSelector } from "react-redux";
import { logoutSuccess, userSignUpData } from "@/store/reducer/authSlice";

import "react-confirm-alert/src/react-confirm-alert.css";
import { toast } from "react-hot-toast";
import { settingsData } from "@/store/reducer/settingsSlice";
import { languageLoaded, setLanguage } from "@/store/reducer/languageSlice";
import { placeholderImage, translate } from "@/utils";
import { store } from "@/store/store";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import Image from "next/image";
import { silderCacheData, sliderLength } from "@/store/reducer/momentSlice";
import FirebaseData from "@/utils/Firebase";
import { GetLimitsApi } from "@/store/actions/campaign";

const Nav = () => {
  const router = useRouter();
  const language = store.getState().Language.languages;
  const { signOut } = FirebaseData();

  const isHomePage = router.pathname === "/";
  const user_register = router.pathname === "/user-register";
  const signupData = useSelector(userSignUpData);
  const sliderdata = useSelector(sliderLength);
  const settingData = useSelector(settingsData);
  const isSubscription = settingData?.subscription;
  const LanguageList = settingData && settingData.languages;
  const systemDefaultLanguageCode = settingData?.default_language;
  const [showModal, setShowModal] = useState(false);
  const [areaconverterModal, setAreaConverterModal] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState();
  const [defaultlang, setDefaultlang] = useState(language.name);
  const [show, setShow] = useState(false);
  const [headerTop, setHeaderTop] = useState(0);
  const [scroll, setScroll] = useState(0);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (language && language.rtl === 1) {
      document.documentElement.dir = "rtl";
    } else {
      document.documentElement.dir = "ltr";
    }
  }, [language]);
  useEffect(() => {
    if (
      signupData?.data?.data.name === "" ||
      signupData?.data?.data.email === "" ||
      (signupData?.data?.data?.mobile === "" && !user_register)
    ) {
      Swal.fire({
        title: "Complete Profile First",
        icon: "info",
        customClass: {
          confirmButton: "Swal-confirm-buttons",
          cancelButton: "Swal-cancel-buttons",
        },
        confirmButtonText: "OK",
        backdrop: "static",
      }).then((result) => {
        if (result.isConfirmed) {
          // If the user clicks "OK," navigate to "/user-register"
          router.push("/user-register");
        }
      });
    }
  }, [signupData]);

  useEffect(() => {
    const header = document.querySelector(".header");
    setHeaderTop(header.offsetTop);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!language || Object.keys(language).length === 0) {
      languageLoaded(
        systemDefaultLanguageCode,
        "1",
        (response) => {
          const currentLang = response && response.data.name;

          // Dispatch the setLanguage action to update the selected language in Redux
          store.dispatch(setLanguage(currentLang));
          setSelectedLanguage(currentLang);
          setDefaultlang(currentLang);
        },
        (error) => {
          console.log(error);
        },
      );
    }
  }, [language]);
  const handleLanguageChange = (languageCode) => {
    languageLoaded(
      languageCode,
      "1",
      (response) => {
        const currentLang = response && response.data.name;
        setSelectedLanguage(currentLang);

        // Dispatch the setLanguage action to update the selected language in Redux
        store.dispatch(setLanguage(currentLang));
      },
      (error) => {
        toast.error(error);
        console.log(error);
      },
    );
  };
  useEffect(() => {}, [selectedLanguage, language, defaultlang]);

  const handleScroll = () => {
    setScroll(window.scrollY);
  };

  const handleOpenModal = () => {
    setShow(false);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleOpenAcModal = () => {
    setShow(false);
    setAreaConverterModal(true);
  };
  const handleCloseAcModal = () => {
    setAreaConverterModal(false);
  };

  const handleShowDashboard = () => {
    if (isSubscription === true) {
      // Corrected the condition
      router.push("/user/dashboard"); // Use an absolute path here
    } else {
      router.push("/user/profile"); // Redirect to the subscription page
    }
  };

  const handleAddProperty = () => {
    if (isSubscription === true) {
      GetLimitsApi(
        "property",
        (response) => {
          if (response.message === "Please Subscribe for Post Property") {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Your Package Limit is Over. Please Purchase Package.",
              allowOutsideClick: false,
              customClass: {
                confirmButton: "Swal-confirm-buttons",
              },
            }).then((result) => {
              if (result.isConfirmed) {
                router.push("/subscription-plan"); // Redirect to the subscription page
              }
            });
          } else {
            router.push("/user/properties");
          }
        },
        (error) => {
          console.log("API Error:", error);
        },
      );
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You have not subscribed. Please subscribe first",
        customClass: {
          confirmButton: "Swal-confirm-buttons",
        },

        // footer: '<a href="">Why do I have this issue?</a>'
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/subscription-plan"); // Redirect to the subscription page
        }
      });
    }
  };
  const handleLogout = () => {
    handleClose();
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      customClass: {
        confirmButton: "Swal-confirm-buttons",
        cancelButton: "Swal-cancel-buttons",
      },
      confirmButtonText: "Yes! Logout",
    }).then((result) => {
      if (result.isConfirmed) {
        // Perform the logout action
        logoutSuccess();
        signOut();

        toast.success(translate("logoutSuccess"));
      } else {
        toast.error(translate("logoutcancel"));
      }
    });
  };

  const CheckActiveUserAccount = () => {
    if (settingData?.is_active === false) {
      Swal.fire({
        title: "Opps!",
        text: "Your account has been deactivated by the admin. Please contact them.",
        icon: "warning",
        allowOutsideClick: false,
        showCancelButton: false,
        customClass: {
          confirmButton: "Swal-confirm-buttons",
          cancelButton: "Swal-cancel-buttons",
        },
        confirmButtonText: "Logout",
      }).then((result) => {
        if (result.isConfirmed) {
          logoutSuccess();
          signOut();
          router.push("/contact-us");
        }
      });
    }
  };
  useEffect(() => {
    CheckActiveUserAccount();
  }, [settingData?.is_active]);

  return (
    <>
      <header>
        <nav
          className={`navbar header navbar-expand-lg navbar-light ${scroll > headerTop || (isHomePage && (!sliderdata || sliderdata.length === 0)) ? "is-sticky" : ""}`}
        >
          <div className="container">
            <div className="d-flex align-items-center">
              <div className="left-side">
                <Link className="navbar-brand" href="/">
                  <Image
                    loading="lazy"
                    src={
                      settingData?.web_logo ? settingData?.web_logo : ebroker
                    }
                    alt="no_img"
                    className="logo"
                    width={0}
                    height={76}
                    style={{ width: "auto" }}
                    onError={placeholderImage}
                  />
                </Link>
                <span onClick={handleShow} id="hamburg">
                  <GiHamburgerMenu size={36} />
                </span>
              </div>

              <div className="center-side ms-5">
                <div
                  className="collapse navbar-collapse"
                  id="navbarSupportedContent"
                >
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item-customize">
                      <Link
                        className="nav-link active"
                        aria-current="page"
                        href="/"
                      >
                        {translate("home")}
                      </Link>
                    </li>
                    <li className="nav-item-customize">
                      <Link
                        className="nav-link active"
                        aria-current="page"
                        href="/"
                      >
                        {translate("aboutUs")}
                      </Link>
                    </li>
                    <li className="nav-item-customize">
                      <Link
                        className="nav-link active"
                        aria-current="page"
                        href="/"
                      >
                        {translate("ourProject")}
                      </Link>
                    </li>
                    <li className="nav-item-customize">
                      <Link
                        className="nav-link active"
                        aria-current="page"
                        href="/"
                      >
                        {translate("media")}
                      </Link>
                    </li>

                    <li className="nav-item-customize">
                      <Link
                        className="nav-link active"
                        aria-current="page"
                        href="/"
                      >
                        {translate("realtorSpace")}
                      </Link>
                    </li>
                    <li className="nav-item-customize">
                      <Link
                        className="nav-link active"
                        aria-current="page"
                        href="/"
                      >
                        {translate("careers")}
                      </Link>
                    </li>
                    <li className="nav-item-customize">
                      <Link
                        className="nav-link active"
                        aria-current="page"
                        href="/"
                      >
                        {translate("contactUs")}
                      </Link>
                    </li>

                    {/* <Dropdown>
                                            <Dropdown.Toggle id="dropdown-basic">{translate("properties")}</Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                <Dropdown.Item>
                                                    <Link href="/properties/all-properties/">
                                                        <span className="links">
                                                            {translate("allProperties")}
                                                        </span>
                                                    </Link>
                                                </Dropdown.Item>
                                                <Dropdown.Item>
                                                    <Link href="/featured-properties">
                                                        <span className="links">
                                                            {translate("featuredProp")}
                                                        </span>
                                                    </Link>
                                                </Dropdown.Item>
                                                <Dropdown.Item>
                                                    {" "}
                                                    <Link href="/most-viewed-properties">
                                                        <span className="links">
                                                            {translate("mostViewedProp")}
                                                        </span>
                                                    </Link>
                                                </Dropdown.Item>
                                                <Dropdown.Item>
                                                    {" "}
                                                    <Link href="/properties-nearby-city">
                                                        <span className="links">
                                                            {translate("nearbyCities")}
                                                        </span>
                                                    </Link>
                                                </Dropdown.Item>
                                                <Dropdown.Item>
                                                    <Link href="/most-favorite-properties">
                                                        <span className="links">
                                                            {translate("mostFavProp")}
                                                        </span>
                                                    </Link>
                                                </Dropdown.Item>
                                                <Dropdown.Item><Link href="/listby-agents"></Link>{translate("listByAgents")}</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                        <Dropdown>
                                            <Dropdown.Toggle id="dropdown-basic">{translate("pages")}</Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                <Dropdown.Item>
                                                    <Link href="/subscription-plan">
                                                        <span className="links">
                                                            {translate("subscriptionPlan")}
                                                        </span>
                                                    </Link>
                                                </Dropdown.Item>
                                                <Dropdown.Item>
                                                    {" "}
                                                    <Link href="/articles">
                                                        <span className="links">
                                                            {translate("articles")}
                                                        </span>
                                                    </Link>
                                                </Dropdown.Item>
                                                <Dropdown.Item onClick={handleOpenAcModal}>
                                                    <span className="perent_link">
                                                        <span className="links">
                                                            {translate("areaConverter")}
                                                        </span>
                                                    </span>
                                                </Dropdown.Item>
                                                <Dropdown.Item>
                                                    <Link href="/terms-and-condition">
                                                        <span className="links">
                                                            {translate("terms&condition")}
                                                        </span>
                                                    </Link>
                                                </Dropdown.Item>
                                                <Dropdown.Item>
                                                    {" "}
                                                    <Link href="/privacy-policy">
                                                        <span className="links">
                                                            {translate("privacyPolicy")}
                                                        </span>
                                                    </Link>
                                                </Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown> */}

                    {/* <li className="nav-item-customize">
                                            <Link className="nav-link active" aria-current="page" href="/">
                                                {translate("rivetonWorld")}
                                            </Link>
                                        </li>
                                        <li className="nav-item-customize">
                                            <Link className="nav-link active" aria-current="page" href="/">
                                                {translate("projects")}
                                            </Link>
                                        </li> */}

                    {/* <li className="nav-item-customize">
                                            <Link className="nav-link active" aria-current="page" href="/">
                                                {translate("Gallry")}
                                            </Link>
                                        </li> */}
                    {/* <li className="nav-item-customize">
                                            <Link className="nav-link active" aria-current="page" href="/">
                                                {translate("investment")}
                                            </Link>
                                        </li>
                                        <li className="nav-item-customize">
                                            <Link className="nav-link active" aria-current="page" href="/">
                                                {translate("joinUs")}
                                            </Link>
                                        </li> */}
                  </ul>
                </div>
              </div>
            </div>
            <div className="right-side">
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav ml-auto d-flex align-items-center">
                  <Dropdown className="d-flex">
                    <Dropdown.Toggle id="dropdown-basic">
                      {" "}
                      {selectedLanguage ? selectedLanguage : defaultlang}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {LanguageList &&
                        LanguageList.map((ele, index) => (
                          <Dropdown.Item
                            key={index}
                            onClick={() => handleLanguageChange(ele.code)}
                          >
                            <span className="perent_link">
                              <span className="links">{ele.name}</span>
                            </span>
                          </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                  </Dropdown>
                  <IoVideocamOutline color="#fff" size={20} className="ms-3" />{" "}
                  <span className="text-white nav-link">
                    Instant Video Call
                  </span>
                  <FaWhatsapp color="#fff" size={20} className="ms-3" />
                  <span className="text-white nav-link">WhatsApp</span>
                  <li
                    style={{
                      padding: "10px 20px 12px",
                      borderRadius: "2px",
                      letterSpacing: "2px",
                    }}
                    className={` ${scroll > headerTop || (isHomePage && (!sliderdata || sliderdata.length === 0)) ? "bg-dark text-white" : "btn-bg-blue text-dark"}   d-flex align-items-center`}
                  >
                    {
                      // Check if signupData.data is null
                      signupData?.data === null ? (
                        <a
                          className={`font-size-12 ${scroll > headerTop || (isHomePage && (!sliderdata || sliderdata.length === 0)) ? " text-white" : "text-dark"} text-uppercase`}
                          to="/"
                          onClick={handleOpenModal}
                        >
                          {/* <RiUserSmileLine size={20} className="icon" /> */}
                          {translate("getInTouch")}
                        </a>
                      ) : // Check if mobile and firebase_id are present
                      signupData?.data?.data.mobile &&
                        signupData?.data?.data.firebase_id &&
                        signupData?.data?.data.name === "" ? (
                        <>
                          <span className="nav-link">
                            {translate("welcmGuest")}
                          </span>
                        </>
                      ) : signupData?.data?.data.name ? (
                        <Dropdown>
                          <Dropdown.Toggle id="dropdown-basic01">
                            <RiUserSmileLine size={20} className="icon01" />
                            {signupData.data.data.name}
                          </Dropdown.Toggle>

                          <Dropdown.Menu id="language">
                            <Dropdown.Item onClick={handleShowDashboard}>
                              <span className="perent_link">
                                <span className="links">
                                  {translate("dashboard")}
                                </span>
                              </span>
                            </Dropdown.Item>
                            <Dropdown.Item onClick={handleLogout}>
                              <span className="perent_link">
                                <span className="links">
                                  {translate("logout")}
                                </span>
                              </span>
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      ) : null
                    }
                  </li>
                  {signupData?.data?.data.name && settingData && (
                    <li className="nav-item">
                      <button
                        className="btn"
                        id="addbutton"
                        onClick={handleAddProperty}
                      >
                        <FiPlusCircle
                          size={20}
                          className="mx-2 add-nav-button"
                        />
                        {translate("addProp")}
                      </button>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <div>
        <Offcanvas
          show={show}
          onHide={handleClose}
          placement="end"
          scroll={false}
          backdrop={true}
          style={{
            width: "90%",
          }}
        >
          <Offcanvas.Header>
            <Offcanvas.Title>
              <span className="title-name">{settingData?.company_name}</span>
            </Offcanvas.Title>
            <Offcanvas.Title>
              <CloseButton onClick={handleClose} />
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <div className="mobile_nav">
              <ul className="navbar-nav" id="mobile-ul">
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    href="/"
                    onClick={handleClose}
                  >
                    {translate("home")}
                  </Link>
                </li>
                <Dropdown>
                  <Dropdown.Toggle id="dropdown-basic">
                    {translate("properties")}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item>
                      <Link
                        href="/properties/all-properties/"
                        onClick={handleClose}
                      >
                        {translate("allProperties")}
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <Link href="/featured-properties" onClick={handleClose}>
                        {translate("featuredProp")}
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      {" "}
                      <Link
                        href="/most-viewed-properties"
                        onClick={handleClose}
                      >
                        {translate("mostViewedProp")}
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      {" "}
                      <Link
                        href="/properties-nearby-city"
                        onClick={handleClose}
                      >
                        {translate("nearbyCities")}
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <Link
                        href="/most-favorite-properties"
                        onClick={handleClose}
                      >
                        {translate("mostFavProp")}
                      </Link>
                    </Dropdown.Item>
                    {/* <Dropdown.Item><Link href="/listby-agents" onClick={handleClose}></Link>{translate("listByAgents")}</Dropdown.Item> */}
                  </Dropdown.Menu>
                </Dropdown>
                <Dropdown>
                  <Dropdown.Toggle id="dropdown-basic">
                    {translate("pages")}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item>
                      <Link href="/subscription-plan" onClick={handleClose}>
                        {translate("subscriptionPlan")}
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      {" "}
                      <Link href="/articles" onClick={handleClose}>
                        {translate("articles")}
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item onClick={handleOpenAcModal}>
                      <span className="perent_link">
                        <span className="links">
                          {translate("areaConverter")}
                        </span>
                      </span>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <Link href="/terms-and-condition" onClick={handleClose}>
                        {translate("terms&condition")}
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      {" "}
                      <Link href="/privacy-policy" onClick={handleClose}>
                        {translate("privacyPolicy")}
                      </Link>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    href="/contact-us"
                    onClick={handleClose}
                  >
                    {translate("contactUs")}
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    className="nav-link"
                    href="/about-us"
                    onClick={handleClose}
                  >
                    {translate("aboutUs")}
                  </Link>
                </li>

                <Dropdown className="d-flex">
                  <Dropdown.Toggle id="dropdown-basic">
                    {" "}
                    {selectedLanguage ? selectedLanguage : defaultlang}
                  </Dropdown.Toggle>

                  <Dropdown.Menu id="language">
                    {LanguageList &&
                      LanguageList.map((ele, index) => (
                        <Dropdown.Item
                          key={index}
                          onClick={() => handleLanguageChange(ele.code)}
                        >
                          <span className="perent_link">
                            <span className="links">{ele.name}</span>
                          </span>
                        </Dropdown.Item>
                      ))}
                  </Dropdown.Menu>
                </Dropdown>
                <IoVideocamOutline color="#fff" size={20} className="mx-3" />
                <FaWhatsapp color="#fff" size={20} className="mx-3" />

                <li
                  style={{
                    padding: "10px 20px 12px",
                    borderRadius: "2px",
                    letterSpacing: "2px",
                  }}
                  className="bg-dark text-white d-flex align-items-center "
                >
                  {
                    // Check if signupData.data is null
                    signupData?.data === null ? (
                      <a
                        cclassName=" font-size-12 text-uppercase text-dark"
                        to="/"
                        onClick={handleOpenModal}
                      >
                        {/* <RiUserSmileLine size={20} className="icon" /> */}
                        {translate("getInTouch")}
                      </a>
                    ) : // Check if mobile and firebase_id are present
                    signupData?.data?.data.mobile &&
                      signupData?.data?.data.firebase_id &&
                      signupData?.data?.data.name === "" ? (
                      <span className="nav-link">
                        {translate("welcmGuest")}
                      </span>
                    ) : // If name is present, show "Welcome, {name}"
                    signupData?.data?.data.name ? (
                      <Dropdown>
                        <Dropdown.Toggle id="dropdown-basic01">
                          <RiUserSmileLine size={20} className="icon01" />
                          {/* <Avatar size={16} src={signupData.data.data.profile}/> */}
                          {signupData.data.data.name}
                        </Dropdown.Toggle>

                        <Dropdown.Menu id="language">
                          <Dropdown.Item onClick={handleShowDashboard}>
                            <span className="perent_link">
                              <span className="links">
                                {translate("dashboard")}
                              </span>
                            </span>
                          </Dropdown.Item>
                          <Dropdown.Item onClick={handleLogout}>
                            <span className="perent_link">
                              <span className="links">
                                {translate("logout")}
                              </span>
                            </span>
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    ) : null // Handle any other cases or conditions here
                  }
                </li>

                {signupData?.data?.data.name && settingData && (
                  <li className="nav-item">
                    <button
                      className="btn"
                      id="addbutton-mobile"
                      onClick={handleAddProperty}
                    >
                      <FiPlusCircle size={20} className="mx-2 add-nav-button" />
                      {translate("addProp")}
                    </button>
                  </li>
                )}
              </ul>
            </div>
          </Offcanvas.Body>
        </Offcanvas>
      </div>
      <LoginModal isOpen={showModal} onClose={handleCloseModal} />

      <AreaConverter isOpen={areaconverterModal} onClose={handleCloseAcModal} />
    </>
  );
};

export default Nav;
