import React, {useState, useEffect} from 'react'
import MainWebSiteTemplate from '../Templates/MainWebSiteTemplate'
import whatsappLogo from "../../Images/whatsappLogo.png"
import copyButtonLogo from "../../Images/copyButtonLogo.svg"
import facebookLinkLogo from "../../Images/facebookLinkLogo.png"
import discordLinkLogo from "../../Images/discordLinkLogo.png"
import messengerLogo from "../../Images/messengerLogo.png"
import twitterLinkLogo from "../../Images/twitterLinkLogo.png"
import mailLinkLogo from "../../Images/mailLinkLogo.png"
import { useAuth } from '../../Context'
import { findByAltText } from '@testing-library/dom'
import {EmailShareButton,
    FacebookShareButton,
    TwitterShareButton,
    WhatsappShareButton, 
    FacebookMessengerShareButton,
    } from "react-share";


function VerificationApp(props) {
    const {formSubmitted} = useAuth()
    const gamerId = props.match.params.id;
    const currentShareLink = window.location.origin + "?referral=" + gamerId;
    const shareText = "Hey check this out :\n" + currentShareLink;

    useEffect(() => {
        if(formSubmitted){
            setActive(1)
        }
    }, [formSubmitted])


     const copyToClipboard = () => {
        navigator.clipboard
        .writeText(currentShareLink);
     }

     
    const referralHandler = (referralType) => {
        switch(referralType){
            case "whatsapp":
                var url = "https://api.whatsapp.com/send?text=" + encodeURI(shareText);
                window.open(url, '_blank').focus()
                break;
            case "facebook":
                break;
            case "discord":
                break;
            case "messenger":
                break;
            case "twitter":
                var url ="https://twitter.com/intent/tweet?text=" + encodeURI(shareText);
                window.open(url, "_blank").focus();
                break;
            case "mail":
                var url = `mailto:?subject=` + "Esports" + "&body=" +encodeURI(shareText);
                window.open(url, "_blank").focus();
                break;
        }
    }
    
    
    const verificationContent= () =>(
        <div className="register-form">
            <div>
                <div className="verification-status">Status : <span>Pending</span></div>
                <div className="verification-text-content">
                    <ul>
                        <li>Our team is verifying your details</li>
                        <li>Use this opportunity to create your player page</li>
                        <li>Create your esports squad </li>
                    </ul>
                    <div style={{whiteSpace: "pre-line"}}> 
                    {"Send your invite link to friends so you both can earn\nOasis Coins, which will give you exclusive access and\nearly access to features, events."}
                    </div>
                    
                </div>
                <div className="referral-link-wrapper">
                    <span className="referral-link-box"
                        onClick={() => copyToClipboard()}>
                        {
                            (currentShareLink).slice(0,30)+"..."
                        }
                    </span>
                    <img id="copy-button" src={copyButtonLogo}
                        onClick={() => copyToClipboard()} />
                </div>
                <div className="referral-site-wrapper">
                    <div className="share-button" onClick={() => referralHandler("whatsapp")}>
                        <img src={whatsappLogo} />
                    </div>
                    <FacebookMessengerShareButton url={shareText} className="share-button">
                        <img src={messengerLogo} />
                    </FacebookMessengerShareButton>
                    <FacebookShareButton url={currentShareLink} className="share-button">
                        <img src={facebookLinkLogo} />
                    </FacebookShareButton>
                    <TwitterShareButton url={shareText} className="share-button">
                        <img src={twitterLinkLogo} />
                    </TwitterShareButton>
                    <div className="share-button" onClick={() => referralHandler("discord")}>
                        <img src={discordLinkLogo}/>
                    </div>
                    <EmailShareButton url={shareText} className="share-button">
                        <img src={mailLinkLogo} />
                    </EmailShareButton>
                </div>
            </div>
            <div className="next-form-button-wrapper">
                <button className="next-form-button" onClick={() => setActive(4)}>Player Page</button>
            </div>
        </div>
    )

    const contentsIndex = [
            {text:"Steps", title:true, link:""}, 
            {text:"Verification", title:false, link:""},
    ];
    
    const pageContentList = [
        verificationContent
    ]

    const [activeSection, setActiveSection] = useState(1);
    const setActive = (section) =>{
        if(section === 1){
            if(!formSubmitted){
                return;
            }
        }
        setActiveSection(section);
    }
    return (
        <>
            <MainWebSiteTemplate contentsIndex={contentsIndex} 
                active={activeSection} setActive={setActive} 
                pageContentList={pageContentList}/>
        </>
    )
}

export default VerificationApp
