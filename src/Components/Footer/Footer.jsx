import React from "react";
import { FiMail, FiPhone } from "react-icons/fi";
import { AiOutlineInstagram } from "react-icons/ai";
import { FaFacebookSquare } from "react-icons/fa";
import playstore from "../../assets/playStore.png";
import appstore from "../../assets/appStore.png";
import Link from "next/link";
import { useSelector } from "react-redux";
import { settingsData } from "@/store/reducer/settingsSlice";
import { placeholderImage, translate } from "@/utils";
import Image from "next/image";
import { FaXTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
  const systemData = useSelector(settingsData);
  const webdata = systemData && systemData;
  const currentYear = new Date().getFullYear();
  return (
    <section id="footer">
      <div className="container">
        {(webdata?.web_footer_logo ||
          webdata?.company_email ||
          webdata?.company_tel1 ||
          webdata?.company_tel2) && (
          <div className="">
            <div id="footer_logo_section">
              <div className="d-flex align-items-center">
                {webdata?.web_footer_logo && (
                  <div className="border-right">
                    <Link href="/">
                      <img
                        src={webdata?.web_footer_logo}
                        alt="eBroker_logo"
                        className="footer_logo"
                        onError={placeholderImage}
                      />
                    </Link>
                  </div>
                )}
                {webdata && webdata.company_email && (
                  <div className="footer_contact_us">
                    <div>
                      <FiMail size={18} />
                    </div>
                    <div className="footer_contactus_deatils">
                      <span className="footer_span">{translate("email")}</span>
                      <a href={`mailto:${webdata && webdata.company_email}`}>
                        <span className="footer_span_value">
                          {webdata && webdata.company_email}
                        </span>
                      </a>
                    </div>
                  </div>
                )}
                {webdata && webdata.company_tel1 && (
                  <div className="footer_contact_us">
                    <div>
                      <FiPhone size={18} />
                    </div>
                    <div className="footer_contactus_deatils">
                      <span className="footer_span">
                        {translate("contactOne")}
                      </span>
                      <a href={`tel:${webdata && webdata.company_tel1}`}>
                        <span className="footer_span_value">
                          {webdata && webdata.company_tel1}
                        </span>
                      </a>
                    </div>
                  </div>
                )}
                {webdata && webdata.company_tel2 && (
                  <div className="footer_contact_us">
                    <div>
                      <FiPhone size={18} />
                    </div>
                    <div className="footer_contactus_deatils">
                      <span className="footer_span">
                        {translate("contactTwo")}
                      </span>
                      <a href={`tel:${webdata && webdata.company_tel2}`}>
                        <span className="footer_span_value">
                          {webdata && webdata.company_tel2}
                        </span>
                      </a>
                    </div>
                  </div>
                )}
                {webdata?.facebook_id ||
                webdata?.instagram_id ||
                webdata?.youtube_id ||
                webdata?.twitter_id ? (
                  <div className="d-flex ps-5">
                    <div id="follow_us">
                      {webdata?.facebook_id ? (
                        <a href={webdata?.facebook_id} target="_blank">
                          <FaFacebookSquare size={20} />
                        </a>
                      ) : null}
                      {webdata?.facebook_id ? (
                        <a href={webdata?.facebook_id} target="_blank">
                          <FaXTwitter size={20} />
                        </a>
                      ) : null}
                      {webdata?.instagram_id ? (
                        <a href={webdata?.instagram_id} target="_blank">
                          <AiOutlineInstagram size={20} />
                        </a>
                      ) : null}
                      <a href={webdata?.youtube_id}>
                        <FaYoutube size={20} />
                      </a>
                      <a href={webdata?.twitter_id} target="_blank">
                        <FaLinkedin size={20} />
                      </a>
                    </div>
                  </div>
                ) : null}
              </div>
              <div className="d-flex align-items-center prop-search-bar-items customize-width">
                <input className="input-section" placeholder="Enter email" />{" "}
                <div className="w-50">
                  <div className="serach-btn w-100">Newsletter</div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="row py-5 px-3" id="footer_deatils">
          <div className="col-12 col-md-6 col-lg-3">
            <div id="footer_page_section">
              <div id="footer_headlines">
                <span>{translate("pages")}</span>
              </div>
              <div className="page_links">
                <Link href="/subscription-plan">
                  {translate("subscriptionPlan")}
                </Link>
              </div>
              <div className="page_links">
                <Link href="/articles">{translate("articles")}</Link>
              </div>
              <div className="page_links">
                <Link href="/terms-and-condition">
                  {translate("terms&condition")}
                </Link>
              </div>

              <div className="page_links">
                <Link href="/privacy-policy">{translate("privacyPolicy")}</Link>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-3">
            <div id="footer_prop_section">
              <div id="footer_headlines">
                <span>{translate("properties")}</span>
              </div>
              <div className="prop_links">
                <Link href="/properties/all-properties">
                  {translate("allProperties")}
                </Link>
              </div>
              <div className="prop_links">
                <Link href="/featured-properties">
                  {translate("featuredProp")}
                </Link>
              </div>

              <div className="prop_links">
                <Link href="/most-viewed-properties">
                  {translate("mostViewedProp")}
                </Link>
              </div>

              <div className="prop_links">
                <Link href="/properties-nearby-city">
                  {translate("nearbyCities")}
                </Link>
              </div>

              <div className="prop_links">
                <Link href="/most-favorite-properties">
                  {translate("mostFavProp")}
                </Link>
              </div>

              {/* <div className='prop_links'>
                                <Link href="/listby-agents">
                                    List by Agents Properties
                                </Link>
                            </div> */}
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-3">
            <div id="footer_page_section">
              <div id="footer_headlines">
                <span>{translate("project")}</span>
              </div>
              <div className="page_links">
                <Link href="/seeAllProjects">
                  {translate("seeAllProjects")}
                </Link>
              </div>
              <div className="page_links">
                <Link href="/featuredprojects">
                  {translate("featuredprojects")}
                </Link>
              </div>

              <div className="page_links">
                <Link href="/mostviewedprojects">
                  {translate("mostviewedprojects")}
                </Link>
              </div>
              <div className="page_links">
                <Link href="/nearbycitiesprojects">
                  {translate("nearbycitiesprojects")}
                </Link>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-3">
            <div id="footer_download_section">
              <div id="footer_headlines">
                <span>{translate("downloadApps")}</span>
              </div>
              <div className="download_app_desc">
                <span>
                  {translate("Getthelatest")} {webdata?.company_name}{" "}
                  {translate("Selectyourdevice")}
                </span>
              </div>

              <div className="row a-dialogdownload_app_platforms">
                {!webdata?.playstore_id ? (
                  <div
                    className="col-6 d-flex justify-content-center"
                    id="playstore_logo"
                  >
                    <a href={webdata?.playstore_id} target="_blank">
                      <Image
                        loading="lazy"
                        src={playstore?.src}
                        alt="no_img"
                        className="platforms_imgs clickable-effect"
                        width={50}
                        height={0}
                        style={{ width: "100%", height: "100%" }}
                        onError={placeholderImage}
                      />
                    </a>
                  </div>
                ) : null}
                {!webdata?.appstore_id ? (
                  <div
                    className="col-6 d-flex justify-content-center"
                    id="appstore_logo"
                  >
                    <a href={webdata?.appstore_id} target="_blank">
                      <Image
                        loading="lazy"
                        src={appstore?.src}
                        alt="no_img"
                        className="platforms_imgs clickable-effect"
                        width={40}
                        height={20}
                        style={{ width: "100%", height: "100%" }}
                        onError={placeholderImage}
                      />
                    </a>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="rights_footer">
        <hr />
        <div>
          <h6>
            {translate("Copyright")} {currentYear} {webdata?.company_name}{" "}
            {translate("All Rights Reserved")}
          </h6>
        </div>
      </div>
    </section>
  );
};

export default Footer;
