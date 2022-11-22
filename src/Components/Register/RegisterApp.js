import React, { useState, useEffect, useRef } from "react";
import MainWebSiteTemplate from "../Templates/MainWebSiteTemplate";
import gamerCardSample from "../../Images/gamerCardSample.png";
import gamerAvatarSample from "../../Images/gamerAvatarSample.png";
import whatsappLogo from "../../Images/whatsappLogo.png";
import copyButtonLogo from "../../Images/copyButtonLogo.svg";
import facebookLinkLogo from "../../Images/facebookLinkLogo.png";
import discordLinkLogo from "../../Images/discordLinkLogo.png";
import messengerLogo from "../../Images/messengerLogo.png";
import twitterLinkLogo from "../../Images/twitterLinkLogo.png";
import mailLinkLogo from "../../Images/mailLinkLogo.png";
import { Redirect, useHistory } from "react-router";
import { backend_url } from "../../constants";
import { useAuth } from "../../Context";
import { v4 as uuidv4 } from "uuid";
import useWindowDimensions from "../../ScreenDimensions";
import {
  EmailShareButton,
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookMessengerShareButton,
} from "react-share";

function RegisterApp() {
  const {
    checkGamerTag,
    gamerTagAvailable,
    submitForm,
    uploadImages,
    formSubmitted,
  } = useAuth();
  const { width, height } = useWindowDimensions();
  const deltaWidth = 850;
  const [currentShareLink, setCurrentShareLink] = useState("");
  const [shareText, setShareText] = useState("");

  useEffect(() => {
    let uid = sessionStorage.getItem("uniqueGamerId");
    if (uid) {
      setAllFieldValues({ ...allFieldValues, ["uniqueGamerId"]: uid });
    } else {
      let tempId = uuidv4();
      sessionStorage.setItem("uniqueGamerId", tempId);
      setAllFieldValues({ ...allFieldValues, ["uniqueGamerId"]: tempId });
    }
  }, []);

  useEffect(() => {
    if (formSubmitted) {
      setCurrentShareLink(
        window.location.origin + "referral/" + allFieldValues.uniqueGamerId
      );
      if (width < deltaWidth) {
        return (
          <Redirect to={"/verification/" + allFieldValues.uniqueGamerId} />
        );
      } else {
        setActive(4);
      }
    }
  }, [formSubmitted]);

  useEffect(() => {
    if (gamerTagAvailable === -1) {
      try {
        if (document.getElementById("uniqueGamerTag")) {
          document.getElementById("uniqueGamerTag").style.border =
            "1px solid red";
        } else {
          alert("Gamer Tag Already Taken");
        }
      } catch (error) {
        console.log(error);
      }
    } else if (gamerTagAvailable === 1) {
      if (document.getElementById("uniqueGamerTag")) {
        document.getElementById("uniqueGamerTag").style.border =
          "1px solid #fff";
      }
      setActive(2);
    }
  }, [gamerTagAvailable]);
  const [allFieldValues, setAllFieldValues] = useState({
    uniqueGamerId: "XXX-XXX-XXX",
    uniqueGamerTag: "",
    fullName: "",
    collegeName: "",
    collegeEmail: "",
    personalEmail: "",
    phoneNumber: "",
    attachedFileFRONT: "",
    attachedFileBACK: "",
  });
  console.log(allFieldValues);

  const changeHandler = (e) => {
    setAllFieldValues({ ...allFieldValues, [e.target.name]: e.target.value });
  };

  const ifEmptyAllFields = () => {
    let flag = false;
    for (let key in allFieldValues) {
      if (allFieldValues[key] === "") {
        flag = true;
      }
    }
    return flag;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentShareLink);
  };

  const inputFieldWrapper = (
    labelText,
    subLabelText,
    fieldName,
    placeholder,
    marginTop = 0
  ) => {
    return (
      <div style={{ marginTop: marginTop }}>
        <div className="label-text">
          {labelText} <span className="label-subText">{subLabelText}</span>
        </div>
        <div className="input-field">
          <input
            type="text"
            value={allFieldValues[fieldName]}
            id={fieldName}
            name={fieldName}
            onChange={changeHandler}
            placeholder={placeholder}
          />
        </div>
      </div>
    );
  };

  const attachFileWrapper = (labelText, subLabelText) => {
    return (
      <div>
        <div className="label-text">
          {labelText} <span className="label-subText">({subLabelText})</span>
        </div>
        <div className="attach-file-button">
          <label for={subLabelText + "fileInput"}>ATTACH FILE</label>
          <input
            type="file"
            id={subLabelText + "fileInput"}
            style={{ visibility: "hidden", display: "none" }}
            accept="image/*"
            onChange={() => {
              var oFReader = new FileReader();
              var attachedFile = document.getElementById(
                subLabelText + "fileInput"
              ).files[0];
              oFReader.readAsDataURL(attachedFile);
              setAllFieldValues({
                ...allFieldValues,
                ["attachedFile" + subLabelText]: attachedFile,
              });

              oFReader.onload = function (oFREvent) {
                document.getElementById(subLabelText + "preview").src =
                  oFREvent.target.result;
              };
            }}
          />
        </div>
        <img
          id={subLabelText + "preview"}
          src={""}
          className="preview-attached-image"
        />
      </div>
    );
  };

  const referralHandler = (referralType) => {
    switch (referralType) {
      case "whatsapp":
        var url = "https://api.whatsapp.com/send?text=" + encodeURI(shareText);
        window.open(url, "_blank").focus();
        break;
      case "facebook":
        break;
      case "discord":
        break;
      case "messenger":
        break;
      case "twitter":
        var url =
          "https://twitter.com/intent/tweet?text=" + encodeURI(shareText);
        window.open(url, "_blank").focus();
        break;
      case "mail":
        var url =
          `mailto:?subject=` + "Esports" + "&body=" + encodeURI(shareText);
        window.open(url, "_blank").focus();
        break;
    }
  };

  const gamerTagContent = () => {
    return (
      <div className="register-form">
        <div className="content-wrapper">
          <div>
            <div className="label-text">Unique GamerID</div>
            <div className="text-field">{allFieldValues.uniqueGamerId}</div>
          </div>
          {inputFieldWrapper(
            "Unique Gamer Tag",
            "(keep it simple and classy)",
            "uniqueGamerTag",
            "Xx_catDestroyer96_xX",
            "24px"
          )}
          <div style={{ marginTop: "36px" }}>
            <div className="form-headings">Coming Soon</div>
            <div id="gamer-avatar-cards-wrapper">
              <div style={{ marginTop: "24px" }}>
                <div className="image-title">Exclusive Gamer Card</div>
                <img
                  src={gamerCardSample}
                  style={{
                    width: "200px",
                    height: "122px",
                    filter: "drop-shadow(0px 8px 16px rgba(80, 83, 209, 0.53))",
                    borderRadius: "8px",
                  }}
                />
              </div>
              {/* <div>
                                <div className="image-title">Gamer Avatar</div>
                                <img src={gamerAvatarSample} style={{
                                    width: "164.67px",
                                    height: "129.35px"
                                }}/>
                            </div> */}
            </div>
          </div>
        </div>
        <div className="next-form-button-wrapper">
          <button
            className="next-form-button"
            onClick={() => {
              checkGamerTag(allFieldValues.uniqueGamerTag);
            }}
          >
            Enter Player Details
          </button>
        </div>
      </div>
    );
  };

  const playerRegistrationContent = () => (
    <div className="register-form">
      <div className="content-wrapper">
        {inputFieldWrapper("Full Name", "", "fullName", "Jenny Talia")}
        {/* {inputFieldWrapper(
          "College Name",
          "(include the campus name)",
          "collegeName",
          "Indian Institute of Technology Bombay"
        )}
        {inputFieldWrapper(
          "College Email",
          "(this email will be used for verification)",
          "collegeEmail",
          "jennytalia@iitb.ac.in"
        )} */}
        {inputFieldWrapper(
          "Personal Email",
          "(this email will be used for registration)",
          "personalEmail",
          "jennytalia@gmail.com",
          "24px"
        )}
        {inputFieldWrapper(
          "Phone Number",
          "(For important alerts and prize distribution)",
          "phoneNumber",
          "696-969-6969",
          "24px"
        )}
      </div>
      <div className="next-form-button-wrapper">
        {width < deltaWidth ? (
          <button className="back-form-button" onClick={() => setActive(1)}>
            Back to ‘Gamer Tag’
          </button>
        ) : (
          <button className="next-form-button" onClick={() => setActive(3)}>
            Attach college photo ID
          </button>
        )}
      </div>
    </div>
  );

  const attachFilesContent = () => (
    <div className="register-form">
      <div className="attach-file-buttons-wrapper">
        {attachFileWrapper("Attach College Photo ID", "FRONT")}
        {attachFileWrapper("Attach College Photo ID", "BACK")}
      </div>
      <div className="next-form-button-wrapper">
        <button className="back-form-button" onClick={() => setActive(2)}>
          {width < deltaWidth ? "Back to ‘Player Details’" : "Go Back"}
        </button>
        <button
          id="complete-form-button"
          onClick={async () => {
            if (ifEmptyAllFields()) {
              alert("Please fill all the fields");
              return;
            } else await checkGamerTag(allFieldValues.uniqueGamerTag);
            document.getElementById("complete-form-button").disabled = true;
            if (
              allFieldValues.attachedFileFRONT === "" ||
              allFieldValues.attachedFileBACK == ""
            ) {
              return;
            }
            console.log(allFieldValues.attachedFileFRONT.name);

            await uploadImages(
              allFieldValues.attachedFileFRONT,
              allFieldValues.uniqueGamerId +
                "__FRONT__" +
                allFieldValues.attachedFileFRONT.name
            );

            await uploadImages(
              allFieldValues.attachedFileBACK,
              allFieldValues.uniqueGamerId +
                "__BACK__" +
                allFieldValues.attachedFileBACK.name
            );

            submitForm(allFieldValues);
          }}
        >
          Complete
        </button>
      </div>
    </div>
  );

  const verificationContent = () => (
    <div className="register-form">
      <div>
        <div className="verification-status">
          Status : <span>Pending</span>
        </div>
        <div className="verification-text-content">
          <ul>
            <li>Our team is verifying your details</li>
            <li>Use this opportunity to create your player page</li>
            <li>Create your esports squad </li>
          </ul>
          <div style={{ whiteSpace: "pre-line" }}>
            {
              "Send your invite link to friends so you both can earn\nOasis Coins, which will give you exclusive access and\nearly access to features, events."
            }
          </div>
        </div>
        <div className="referral-link-wrapper">
          <span className="referral-link-box" onClick={() => copyToClipboard()}>
            {currentShareLink.slice(0, 30) + "..."}
          </span>
          <img
            id="copy-button"
            src={copyButtonLogo}
            onClick={() => copyToClipboard()}
          />
        </div>
        <div className="referral-site-wrapper">
          <div
            className="share-button"
            onClick={() => referralHandler("whatsapp")}
          >
            <img src={whatsappLogo} />
          </div>
          <FacebookMessengerShareButton
            url={shareText}
            className="share-button"
          >
            <img src={messengerLogo} />
          </FacebookMessengerShareButton>
          <FacebookShareButton url={currentShareLink} className="share-button">
            <img src={facebookLinkLogo} />
          </FacebookShareButton>
          <TwitterShareButton url={shareText} className="share-button">
            <img src={twitterLinkLogo} />
          </TwitterShareButton>
          <div
            className="share-button"
            onClick={() => referralHandler("discord")}
          >
            <img src={discordLinkLogo} />
          </div>
          <EmailShareButton url={shareText} className="share-button">
            <img src={mailLinkLogo} />
          </EmailShareButton>
        </div>
      </div>
      <div className="next-form-button-wrapper">
        <button className="next-form-button" onClick={() => setActive(4)}>
          Player Page
        </button>
      </div>
    </div>
  );

  const contentsIndex = [
    { text: "Steps", title: true, link: "" },
    {
      text: "Gamer Tag",
      title: false,
      link: "",
      titleText: "Reserve your Unique Gamer Tag",
    },
    {
      text: "Player Details",
      title: false,
      link: "",
      titleText: "Player registration",
    },
    { text: "Attach Files", title: false, link: "" },
    { text: "Verification", title: false, link: "" },
  ];

  const pageContentList = [
    gamerTagContent,
    playerRegistrationContent,
    attachFilesContent,
    verificationContent,
  ];

  const [activeSection, setActiveSection] = useState(1);
  const setActive = (section) => {
    if (section === 4) {
      if (!formSubmitted) {
        return;
      }
    }
    setActiveSection(section);
  };
  return (
    <>
      <MainWebSiteTemplate
        contentsIndex={contentsIndex}
        active={activeSection}
        setActive={setActive}
        pageContentList={pageContentList}
      />
    </>
  );
}

export default RegisterApp;
