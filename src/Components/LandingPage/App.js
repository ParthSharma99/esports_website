import React from "react";
import LandingPageSection from "./LandingPageSection";
import mainPageImage1 from "../../Images/mainPageImage.png";
import NavigationBar from "./NavigationBar";
import Footer from "./Footer";

function LandingPageApp() {
  return (
    <>
      <NavigationBar />
      <section className="landing-page-section">
        <LandingPageSection
          leftSidedText={true}
          imgSrc={mainPageImage1}
          subText={
            "Put your gaming skils to test with the\nbest in the country, and EARN money "
          }
          titleText={"Join India’s biggest\nEsports revolution"}
          buttonText={"Lets go!"}
        />
      </section>
      <Footer />
    </>
  );
}

export default LandingPageApp;
