import React from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router'

function LandingPageSection(props) {
    const {
        leftSidedText,
        imgSrc,
        titleText,
        subText,    
        buttonText
    } = props
    const history = useHistory();
    const redirectTo = (path) =>{
        history.push(path)
     }

    return (
        <div className="landing-page-section-wrapper" style={leftSidedText ? {flexDirection: "row-reverse"} : {flexDirection: "row"}}>
            <div className="image-wrapper"><img src={imgSrc} /></div>
            <div className="all-text-wrapper">
                <div className="title-text-wrapper">{titleText}</div>
                <div className="sub-text-wrapper">{subText}</div>
                <div className="button-wrapper">
                    <button onClick={() => redirectTo("/register")}>
                        {buttonText}
                    </button>
                </div>
            </div>
            
        </div>
    )
}

LandingPageSection.propTypes = {

}

export default LandingPageSection
