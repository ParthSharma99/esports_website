import React, { useState, useEffect, useRef } from "react";
import MainWebSiteTemplate from "../Templates/MainWebSiteTemplate";
import gamerCardSample from "../../Images/gamerCardSample.png";
import whatsappLogo from "../../Images/whatsappLogo.png";
import copyButtonLogo from "../../Images/copyButtonLogo.svg";
import { useAuth } from "../../Context";
import { v4 as uuidv4 } from "uuid";
import useWindowDimensions from "../../ScreenDimensions";

function RegisterApp(props) {
  const {
    checkGamerTag,
    gamerTagAvailable,
    submitForm,
    uploadImages,
    formSubmitted,
  } = useAuth();
  const { selectedGames } = props;
  const { width, height } = useWindowDimensions();
  const deltaWidth = 850;
  const [currentShareLink, setCurrentShareLink] = useState("");
  const [shareText, setShareText] = useState("");

  useEffect(() => {
    setActive(1);
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
    console.log(formSubmitted);
    if (formSubmitted) {
      setCurrentShareLink(
        window.location.origin + "/referral/" + allFieldValues.uniqueGamerId
      );
      setActive(4);
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
    changeStateOfBtns(true);
  }, [gamerTagAvailable]);

  const [allFieldValues, setAllFieldValues] = useState({
    uniqueGamerId: "XXX-XXX-XXX",
    uniqueGamerTag: "",
    fullName: "",
    personalEmail: "",
    phoneNumber: "",
    haveSquad: "",
    selectedGames: selectedGames,
  });

  const changeStateOfBtns = (show) => {
    var btns = document.getElementsByClassName("btn");
    for (let i = 0; i < btns.length; i++) {
      if (show) btns[i].classList.remove("disabled-button");
      else btns[i].classList.add("disabled-button");
    }
  };

  const submitFormclicked = async (e) => {
    e.target.disabled = true;
    if (ifEmptyAllFields()) {
      alert("Please fill all the fields");
      changeStateOfBtns(true);
      return;
    } else await checkGamerTag(allFieldValues.uniqueGamerTag);

    // if (
    //   allFieldValues.attachedFileFRONT === "" ||
    //   allFieldValues.attachedFileBACK == ""
    // ) {
    //   return;
    // }
    // await uploadImages(
    //   allFieldValues.attachedFileFRONT,
    //   allFieldValues.uniqueGamerId +
    //     "__FRONT__" +
    //     allFieldValues.attachedFileFRONT.name
    // );

    // await uploadImages(
    //   allFieldValues.attachedFileBACK,
    //   allFieldValues.uniqueGamerId +
    //     "__BACK__" +
    //     allFieldValues.attachedFileBACK.name
    // );

    submitForm(allFieldValues);
  };

  const changeHandler = (e) => {
    setAllFieldValues({ ...allFieldValues, [e.target.name]: e.target.value });
  };

  const ifEmptyAllFields = () => {
    let flag = false;
    console.log(allFieldValues);
    for (let key in allFieldValues) {
      if (allFieldValues[key] === "") {
        flag = true;
        break;
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
        <div
          className="accent-button btn"
          onClick={() => {
            checkGamerTag(allFieldValues.uniqueGamerTag);
            changeStateOfBtns(false);
          }}
        >
          Enter Player Details
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
        <div
          className="transparent-button btn"
          onClick={() => {
            setActive(1);
            changeStateOfBtns(false);
          }}
        >
          Back to ‘Gamer Tag’
        </div>
        <div
          className="accent-button btn"
          style={{ marginTop: "16px" }}
          onClick={() => {
            setActive(3);
            changeStateOfBtns(false);
          }}
        >
          Enter Player Details
        </div>
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
          onClick={async (e) => {
            submitFormclicked(e);
          }}
        >
          Complete
        </button>
      </div>
    </div>
  );

  const verificationContent = () => (
    <div className="register-form">
      <div
        style={{ whiteSpace: "pre-wrap", width: "100% " }}
        className="form-sub-text"
      >
        {
          "We've recieved your early access pass request.\nWe will get in touch with you shortly."
        }
      </div>
      <div className="next-form-button-wrapper">
        <div className="referral-link-wrapper">
          <div style={{ whiteSpace: "pre-wrap" }} className="form-sub-text">
            {
              "Send your invite link to friends so we can prioritise\nyour squad during early access pass distribution"
            }
          </div>
          <span
            style={{ marginTop: "24px" }}
            className="referral-link-box"
            onClick={() => copyToClipboard()}
          >
            {currentShareLink.slice(0, 30) + "..."}
          </span>
          <img
            id="copy-button"
            src={copyButtonLogo}
            style={{ marginTop: "25px" }}
            onClick={() => copyToClipboard()}
          />
        </div>
        <div
          className="accent-button"
          style={{
            marginTop: "24px",
            height: "40px",
            background: "#25D366",
            color: "white",
            width: "100%",
            position: "relative",
          }}
          onClick={() => referralHandler("whatsapp")}
        >
          <img
            src={whatsappLogo}
            style={{ height: "40px", position: "absolute", left: "8px" }}
          />
          Share using whatsapp
        </div>
      </div>
    </div>
  );

  const squadDetails = () => (
    <div className="register-form">
      <div
        className="form-sub-text"
        style={{ whiteSpace: "pre-wrap", width: "100% " }}
      >
        Do you have a squad you play with?
      </div>
      <div className="next-form-button-wrapper">
        <div
          className="transparent-button btn"
          onClick={() => {
            setActive(2);
            changeStateOfBtns(false);
          }}
        >
          Back to 'Player Details'
        </div>
        <div
          className="transparent-button btn"
          style={{
            borderColor: "#50FFCA",
            color: "#50FFCA",
            marginTop: "40px",
          }}
          onClick={async (e) => {
            changeStateOfBtns(false);
            setAllFieldValues({
              ...allFieldValues,
              haveSquad: "false",
            });
            setTimeout(() => submitFormclicked(e), 1000);
          }}
        >
          I DO NOT have a squad
        </div>
        <div
          className="accent-button btn"
          style={{ marginTop: "16px" }}
          onClick={async (e) => {
            changeStateOfBtns(false);
            setAllFieldValues({
              ...allFieldValues,
              haveSquad: "true",
            });
            setTimeout(() => submitFormclicked(e), 1000);
          }}
        >
          I play with a squad
        </div>
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
      text: "Player registration",
      title: false,
      link: "",
      titleText: "Player registration",
    },
    { text: "Squad Details", title: false, link: "" },
    { text: "Finished", title: false, link: "" },
  ];

  const pageContentList = [
    gamerTagContent,
    playerRegistrationContent,
    squadDetails,
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
    changeStateOfBtns(true);
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
