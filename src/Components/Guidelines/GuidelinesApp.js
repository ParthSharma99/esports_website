import React, { useEffect, useState } from "react";
import MainWebSiteTemplate from "../Templates/MainWebSiteTemplate";

function GuidelinesApp(props) {
  const contentsIndex = [
    { text: "Guidelines", title: true, link: "" },
    { text: "Code Of Conduct", title: false, link: "" },
    { text: "CS:GO Rules", title: false, link: "" },
    { text: "Rocket League Rules", title: false, link: "" },
    { text: "Valorant Rules", title: false, link: "" },
  ];
  const [activeSection, setActiveSection] = useState(
    props.location.state ? props.location.state : 1
  );
  const setActive = (section) => {
    setActiveSection(section);
  };

  useEffect(() => {
    setActiveSection(activeSection);
  }, []);

  const rulesTemplate = (data) => {
    return () => {
      return (
        <div className="text-content-wrapper">
          {data.map((item, index) => {
            return (
              <>
                <div
                  className="collapsible"
                  onClick={(event) => {
                    event.target.nextElementSibling.classList.toggle(
                      "show-collapsible"
                    );
                    var arr = document.getElementById("arrow-" + item.heading);
                    arr.classList.toggle("down");
                  }}
                >
                  {item.heading}
                  <div class="arrow" id={"arrow-" + item.heading}></div>
                </div>
                <div className="hidden-content">
                  <p>{item.detail}</p>
                  <p>
                    {item.subHeading}
                    <ul className="text-content-list">
                      {item.listItems.map((listItem, index) => {
                        return <li>{listItem}</li>;
                      })}
                    </ul>
                  </p>
                </div>
              </>
            );
          })}
        </div>
      );
    };
  };

  const codeOfConduct = () => (
    <div className="text-content-wrapper">
      <p>
        All Teams and Players agree to behave in a sportsmanlike and respectful
        manner towards other Teams and Players, spectators, the press, the
        broadcast team, Tournament Referees and officials and the Executive
        Board, including without limitation in accordance with the provisions
        set out in the Code of Conduct. Being role models is the occupational
        hazard of a Team or a Player and each Team and Player shall behave
        accordingly.
      </p>
      <p>
        They agree to abide by the following rules
        <ul>
          <li>
            {" "}
            I will not use any profane language, nicknames or other expressions
            that would insult another player.
          </li>
          <li>
            I will not use language that refers to sexual violence or other
            violence.
          </li>
          <li>
            I will not taunt the other player and I will show good sportsmanship
            before, during, and after the game.
          </li>
          <li>I will respect the game being played and control my temper.</li>
        </ul>
      </p>
    </div>
  );

  const csGoRulesData = [
    {
      heading: "Map Pool",
      listItems: [
        "Vertigo (de_vertigo)",
        "Dust2 (de_dust2)",
        "Inferno (de_inferno)",
        "Mirage (de_mirage)",
        "Nuke (de_nuke)",
        "Overpass (de_overpass)",
        "Ancient (de_ancient)",
      ],
      subHeading: "The Current Map Pool (as of 8th November 2021)",
      detail:
        "The Current Active Duty Map pool will be used for any competitive game played under our banner. The client will be the latest available CSGO client.",
    },
    {
      heading: "OTHER GUIDELINES",
      listItems: [
        "Rounds: Best out of 30 (mp_maxrounds 30)",
        "Round time: 1 minute 55 seconds (mp_roundtime 1.92)",
        "Start money: $800 (mp_startmoney 800)",
        "Freeze time: 20 seconds (mp_freezetime 20)",
        "Buy time: 20 seconds (mp_buytime 20)",
        "Bomb timer: 40 seconds (mp_c4timer 40)",
        "Overtime rounds: Best out of 6 (mp_overtime_maxrounds 6)",
        "Overtime start money: $16,000 (mp_overtime_startmoney 16000)",
        "Round restart delay: 5 seconds (mp_round_restart_delay 5)",
        "Break during half time: 2 minutes 30 seconds (mp_halftime_duration 150)",
      ],
      subHeading:
        "The following Match Settings will be used (General Competitive Settings):",
      detail:
        "The matches can be played in either Bo1 or Bo3 formats. Detailed descriptions of how pick/ban for the same can be found in our main guidelines sheet linked here. \nAny player playing must have a PRIME ENABLED ACCOUNT to join the tournament / any official matches.",
    },
  ];
  const csGoRules = rulesTemplate(csGoRulesData);

  const rocketLeagueRulesData = [
    {
      heading: "Map Pool",
      listItems: [
        "Mannfield",
        "Urban Central Nights",
        "Underpass",
        "Champions Field  / Cosmic",
      ],
      subHeading:
        " In case of any issues, matches will be played on DFH Stadium (Default Map Pick)",
      detail: `The Given Competitive Map pool will be used for any competitive game played under our banner. The client will be the latest available Rocket League client.
        In all major stages of the Tournament, the map rotation will be chosen from the eligible arenas, chosen by Tournament Administrators at their sole discretion.
        `,
    },
    {
      heading: "OTHER GUIDELINES",
      listItems: [
        "Team Size: 3v3",
        "Bot Difficulty: No Bots",
        "Mutators: None",
        "Match Time: 5 Minutes",
        "Joinable By: Name/Password",
        "Platform: Epic Games Store, PlayStation, Nintendo Switch, Steam, or Xbox",
        "Server: US-East/US-West (NA League), Europe (EU League), South America (SAM League), Oceania (OCE League), Middle-East (MENA League), Asia-East (APAC N League), Asia-SE Maritime (APAC S League), and South Africa (SSA League)",
      ],
      subHeading:
        "The following Match Settings will be used (General Competitive Settings):",
      detail:
        "The matches can be played in either Bo1 or Bo3 formats. Detailed descriptions of how pick/ban for the same can be found in our main guidelines sheet linked here.",
    },
  ];
  const rocketLeagueRules = rulesTemplate(rocketLeagueRulesData);

  const valorantRulesData = [
    {
      heading: "Map Pool",
      listItems: [
        "Bind",
        "Haven",
        "Split",
        "Ascent",
        "Icebox",
        "Breeze",
        "Fracture",
      ],
      subHeading: "The Current Map Pool (as of 8th November 2021)",
      detail:
        "The Current Active Duty Map pool will be used for any competitive game played under our banner. The client will be the latest available Valorant client. Both Epic / Direct Riot Games clients can work.",
    },
    {
      heading: "OTHER GUIDELINES",
      listItems: [
        "Tournament Mode Enabled",
        "Rest 3 disabled",
        "Map Pick and Ban",
        "Server – Mumbai",
        "Cheats: Off",
        "Blood Spill: Off",
        "All other major settings – DEFAULT (Any changes will be communicated)",
      ],
      subHeading:
        "The following Match Settings will be used (General Competitive Settings):",
      detail:
        "The matches can be played in either Bo1 or Bo3 formats. Detailed descriptions of how pick/ban for the same can be found in our main guidelines sheet linked here.",
    },
  ];
  const valorantRules = rulesTemplate(valorantRulesData);

  const pageContentList = [
    codeOfConduct,
    csGoRules,
    rocketLeagueRules,
    valorantRules,
  ];

  return (
    <MainWebSiteTemplate
      pageContentList={pageContentList}
      contentsIndex={contentsIndex}
      active={activeSection}
      setActive={setActive}
    />
  );
}

export default GuidelinesApp;
