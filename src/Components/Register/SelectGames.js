import React, { useEffect, useState } from "react";
import NavigationBar from "../LandingPage/NavigationBar";
import r6s from "../../Images/r6s.png";
import lol from "../../Images/lol.png";
import dota from "../../Images/dota.png";
import rocketLeague from "../../Images/rocketLeague.png";
import csgo from "../../Images/csgo.png";
import cod from "../../Images/cod.png";
import overwatch from "../../Images/overwatch.png";
import valorant from "../../Images/valorant.png";
import cross from "../../Images/cross.svg";
import RegisterApp from "./RegisterApp";
import useWindowDimensions from "../../ScreenDimensions";

function SelectGames() {
  const { width, height } = useWindowDimensions();
  const isMobile = width <= 1200;
  const gameImgList = [dota, lol, r6s, rocketLeague];
  const nextGameImgList = [csgo, cod, overwatch, valorant];
  const [selectedGames, setSelectedGames] = useState([]);
  const [showRegisterButton, setShowRegisterButton] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  const getGameName = (index) => {
    switch (index) {
      case 0:
        return "Dota";
      case 1:
        return "League Of Legends";
      case 2:
        return "Rainbow Six Siege";
      case 3:
        return "Rocket League";
      case 4:
        return "Counter Strike";
      case 5:
        return "Call Of Duty";
      case 6:
        return "Overwatch";
      case 7:
        return "Valorant";
    }
  };

  const getSelectedGamesAsString = () => {
    var ret = "/";
    selectedGames.map((element) => {
      ret += getGameName(element) + "/";
    });
    return ret;
  };

  if (showRegisterForm) {
    return <RegisterApp selectedGames={getSelectedGamesAsString()} />;
  }

  return (
    <>
      <NavigationBar />
      <div
        style={{
          width: isMobile ? "90%" : "1120px",
          margin: "0 auto",
          paddingTop: "100px",
          maxWidth: isMobile ? "400px" : "",
        }}
      >
        <div className="sub-title">Which games do you like to play?</div>
        <div className="sub-text">
          {isMobile ? (
            selectedGames.length === 0 ? (
              "Don’t worry, you can change your selection later :)"
            ) : (
              <div className="games-pill-wrapper">
                {selectedGames.map((elem) => {
                  return (
                    <div
                      className="game-name-pill"
                      onClick={() => {
                        var temp = selectedGames;
                        temp.splice(temp.indexOf(elem), 1);
                        setSelectedGames([...temp]);
                      }}
                    >
                      <img src={cross} />
                      {getGameName(elem)}
                    </div>
                  );
                })}
              </div>
            )
          ) : "Select all that you’d like to play" + selectedGames.length >
            0 ? (
            " ( " + selectedGames.length + " games selected )"
          ) : (
            ""
          )}
        </div>
        <div className="games-list-wrapper">
          {(showRegisterButton ? nextGameImgList : gameImgList).map(
            (img, idx) => {
              const i = showRegisterButton ? idx + 4 : idx;
              return (
                <img
                  key={i}
                  src={img}
                  className={
                    selectedGames.indexOf(i) > -1 ? "selected-image" : ""
                  }
                  onClick={(e) => {
                    if (selectedGames.indexOf(i) > -1) {
                      e.target.classList.remove("selected-image");
                      var temp = selectedGames;
                      temp.splice(temp.indexOf(i), 1);
                      setSelectedGames([...temp]);
                    } else {
                      e.target.classList.add("selected-image");
                      setSelectedGames([i, ...selectedGames]);
                    }
                  }}
                />
              );
            }
          )}
        </div>
        <div className="bottom-button-wrapper">
          {showRegisterButton ? (
            <div
              className="transparent-button"
              onClick={() => setShowRegisterButton(false)}
              style={isMobile ? { marginBottom: "12px" } : {}}
            >
              Go Back
            </div>
          ) : (
            ""
          )}
          {isMobile ? (
            ""
          ) : (
            <div className="games-pill-wrapper">
              {selectedGames.map((elem) => {
                return (
                  <div
                    className="game-name-pill"
                    onClick={() => {
                      var temp = selectedGames;
                      temp.splice(temp.indexOf(elem), 1);
                      setSelectedGames([...temp]);
                    }}
                  >
                    <img src={cross} />
                    {getGameName(elem)}
                  </div>
                );
              })}
            </div>
          )}
          <div
            className={
              showRegisterButton ? "accent-button" : "transparent-button"
            }
            onClick={() =>
              showRegisterButton
                ? setShowRegisterForm(true)
                : setShowRegisterButton(true)
            }
          >
            {showRegisterButton
              ? "Request Early Passes"
              : selectedGames.length > 0
              ? "Select these games"
              : "None of  these games"}
          </div>
        </div>
      </div>
    </>
  );
}

export default SelectGames;
