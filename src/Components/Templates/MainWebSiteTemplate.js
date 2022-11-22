import React, { useState, useEffect, useRef } from "react";
import NavigationBar from "../LandingPage/NavigationBar";
import useWindowDimensions from "../../ScreenDimensions";

function MainWebSiteTemplate(props) {
  const { contentsIndex, active, setActive, pageContentList } = props;
  const { width, height } = useWindowDimensions();
  const deltaWidth = 850;
  const sectionsRef = useRef([]);
  const [selectedHeading, setSelectedHeading] = useState(contentsIndex[1]);

  const focusOnItem = (e, key) => {
    if (!e) return;
    var marker = document.querySelector("#marker");
    marker.style.top = e.offsetTop + "px";
    marker.style.height = e.offsetHeight + "px";
    setActive(key);
  };

  useEffect(() => {
    if (width < deltaWidth) {
      console.log(sectionsRef.current[active - 1]);
      sectionsRef.current[active - 1].scrollIntoView(false);
      // sectionsRef.current[active-1].scrollIntoView({behavior: "smooth", block: "start"});
    } else {
      setSelectedHeading(contentsIndex[active]);
      focusOnItem(document.querySelector("#index-items-" + active), active);
    }
  }, [active]);

  useEffect(() => {
    sectionsRef.current = sectionsRef.current.slice(0, pageContentList.length);
  }, [pageContentList]);

  if (width < deltaWidth) {
    return (
      <>
        <NavigationBar />
        <div className="main-template-wrapper">
          <div className="main-right-side-wrapper">
            {pageContentList.map((item, index) => {
              if (window.location.pathname === "/register" && index === 3) {
                return "";
              }
              return (
                <section
                  className="main-content-wrapper"
                  ref={(el) => (sectionsRef.current[index] = el)}
                >
                  <div className="right-side-heading">
                    {"titleText" in contentsIndex[index + 1]
                      ? contentsIndex[index + 1].titleText
                      : contentsIndex[index + 1].text}
                  </div>
                  <>{pageContentList[index]()}</>
                </section>
              );
            })}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <NavigationBar />
      <div className="main-template-wrapper">
        <div className="main-left-side-wrapper">
          <div id="marker"></div>
          {contentsIndex.map((element, key) => {
            return (
              <div
                onClick={(e) =>
                  element.title ? "" : focusOnItem(e.target, key)
                }
                className={element.title ? "main-index-title" : "index-items"}
                id={"index-items-" + key}
              >
                {element.text}
              </div>
            );
          })}
        </div>
        <div className="main-right-side-wrapper">
          <div className="right-side-heading">
            {"titleText" in selectedHeading
              ? selectedHeading.titleText
              : selectedHeading.text}
          </div>
          <>{pageContentList ? pageContentList[active - 1]() : ""}</>
        </div>
      </div>
    </>
  );
}

MainWebSiteTemplate.propTypes = {};

export default MainWebSiteTemplate;
