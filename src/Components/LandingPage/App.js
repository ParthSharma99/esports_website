import React from 'react'
import LandingPageSection from './LandingPageSection'
import mainPageImage1 from "../../Images/mainPageImage.png"
import NavigationBar from './NavigationBar'
import Footer from './Footer'


function LandingPageApp() {
    return (
        <>
            <NavigationBar / >
            <section>
                <LandingPageSection leftSidedText={true} 
                    imgSrc={mainPageImage1} 
                    subText = {"Participate in the official inter college\ne-sports championship across multiple\ngames and multiple seasons"}
                    titleText = {"India’s biggest college\nE-sports championship"}
                    buttonText = {"Participate"}
                />
            </section>
            <Footer / >
        </>
    )
}

export default LandingPageApp
