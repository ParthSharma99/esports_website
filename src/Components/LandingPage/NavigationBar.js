import React, { useState } from "react";
import { Dock } from "react-dock";
import useWindowDimensions from "../../ScreenDimensions";
import logo from "../../Images/logo.png";

function NavigationBar(props) {
  const { width, height } = useWindowDimensions();
  const isMobile = width <= 1024;
  const [isVisible, _setIsVisible] = useState(false);

  const setIsVisible = (val) => {
    _setIsVisible(val);
  };

  const landingPageSwitch = (url) => {
    // window.history.pushState((url = url));
    window.location.href = url;
  };

  const getNavigationBarLinks = () => {
    return (
      <>
        <li
          style={isMobile ? { display: "none" } : {}}
          onClick={() => {
            landingPageSwitch("/register");
          }}
        >
          <div style={{ color: "#50FFCA" }}>
            <span className="menu-options-title">Register Team</span>
          </div>
        </li>
      </>
    );
  };

  if (!isMobile) {
    return (
      <div className="top-bar-wrapper" id="front-page-top-bar">
        <div className="top-bar-sub-container">
          <div className="website-title" onClick={() => landingPageSwitch("/")}>
            <img src={logo} />
          </div>
          <ul className="top-bar-links">{getNavigationBarLinks()}</ul>
        </div>
      </div>
    );
  } else {
    return (
      <>
        <Dock
          position="right"
          fluid={true}
          isVisible={isVisible}
          size={1}
          zIndex={1}
          dimStyle={{ background: "rgba(19, 20, 21, 0.9)" }}
          dockStyle={{ background: "rgba(19, 20, 21, 0.8)" }}
        >
          <ul className="side-navbar-links">
            {getNavigationBarLinks()}
            <div
              onClick={() => landingPageSwitch("/register")}
              className="accent-button"
              style={{
                width: "-webkit-fill-available",
                margin: "0 10px",
                position: "fixed",
                bottom: "24px",
              }}
            >
              Let's Go
            </div>
          </ul>
        </Dock>
        <div className="top-bar-wrapper" id="front-page-top-bar">
          <div className="website-title" onClick={() => landingPageSwitch("/")}>
            <img src={logo} />
          </div>
          <div
            className={
              "bar-container menu-button" + (isVisible ? " change" : "")
            }
            style={{ color: "white", cursor: "pointer" }}
            onClick={() => {
              setIsVisible(!isVisible);
            }}
          >
            <div className="bar1"></div>
            <div className="bar2"></div>
            <div className="bar3"></div>
          </div>
        </div>
      </>
    );
  }
}

NavigationBar.propTypes = {};

export default NavigationBar;
