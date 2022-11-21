import React from "react";
import youtubeLogo from "../../Images/youtubeLogo.png";
import discordLogo from "../../Images/discordLogo.png";
import twitterLogo from "../../Images/twitterLogo.png";
import twitchLogo from "../../Images/twitchLogo.png";
import facebookLogo from "../../Images/facebookLogo.png";
import instagramLogo from "../../Images/instagramLogo.png";

function Footer() {
  const footerData = [
    [
      { text: "Media", title: true, link: "" },
      { text: "Brand Assets", title: false, link: "" },
      { text: "Join the team", title: false, link: "" },
    ],
    [
      { text: "Partners", title: true, link: "" },
      { text: "Ubisoft", title: false, link: "" },
      { text: "Asus : ROG", title: false, link: "" },
    ],
    [
      { text: "Community", title: true, link: "" },
      { text: "Forum", title: false, link: "" },
      { text: "Ambassadors", title: false, link: "" },
      { text: "Blog", title: false, link: "" },
      { text: "Code of Conduct", title: false, link: "" },
    ],
    [
      { text: "Support", title: true, link: "" },
      { text: "Contact Us", title: false, link: "" },
    ],
    [{ text: "Privacy Policy", title: true, link: "" }],
    [{ text: "Terms and conditions", title: true, link: "" }],
    [],
    [
      { text: "By GreySeed Studio", title: false, link: "" },
      { text: "All rights reserved", title: false, link: "" },
    ],
  ];

  return (
    <footer>
      <div className="footer-social-links-wrapper">
        <div className="footer-social-links-heading">Get invloved</div>
        <div className="footer-social-links">
          <img style={{ width: "22px", height: "16px" }} src={youtubeLogo} />
          <img style={{ width: "11px", height: "20px" }} src={facebookLogo} />
          <img style={{ width: "21px", height: "16px" }} src={discordLogo} />
          <img style={{ width: "20px", height: "16px" }} src={twitterLogo} />
          <img style={{ width: "20px", height: "20px" }} src={twitchLogo} />
          <img style={{ width: "20px", height: "20px" }} src={instagramLogo} />
        </div>
      </div>
      <div className="footer-text-links-wrapper">
        {footerData.map((column, key) => (
          <div className="footer-text-links-columns" key={key}>
            {column.map((element, key) => {
              if (element.title) {
                return (
                  <span className="footer-text-links-title">
                    {element.text}
                  </span>
                );
              } else {
                return <a href={element.link}>{element.text}</a>;
              }
            })}
          </div>
        ))}
      </div>
    </footer>
  );
}

export default Footer;
