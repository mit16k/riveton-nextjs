import React, { useState, useEffect } from "react";
import Image from "next/image";
import ebroker from "@/assets/Logo_Color.png";

import { useSelector } from "react-redux";
import { settingsData } from "@/store/reducer/settingsSlice";

import { placeholderImage } from "@/utils";
// const settingData = useSelector(settingsData);

const Loader = () => {
  //   useEffect(() => {
  //     CheckActiveUserAccount();
  //   }, [settingData?.is_active]);

  return (
    <>
      <div
        className="loader-container"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div className="logo-container" style={{ marginBottom: "20px" }}>
          <Image
            loading="lazy"
            // src={settingData?.web_logo ? settingData?.web_logo : ebroker}
            src={ebroker}
            alt="no_img"
            className="logo"
            width={0}
            height={76}
            style={{ width: "auto" }}
            onError={placeholderImage}
          />
        </div>
        <div className="loader"></div>
      </div>
    </>
  );
};

export default Loader;
