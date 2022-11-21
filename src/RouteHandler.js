import "./Stylesheets/style.css";
import { ReactChild, Suspense } from "react";
import { BrowserRouter as Router, Route, useHistory } from "react-router-dom";
import LandingPageApp from "./Components/LandingPage/App";
import MainWebSiteTemplate from "./Components/Templates/MainWebSiteTemplate";
import TournamentStructureApp from "./Components/TournamentStructure/TournamentStructureApp";
import RankingsApp from "./Components/Rankings/RankingsApp";
import GuidelinesApp from "./Components/Guidelines/GuidelinesApp";
import RegisterApp from "./Components/Register/RegisterApp";
import ReferralPage from "./Components/ReferralPage";
import { Context } from "./Context";
import VerificationApp from "./Components/Verification/VerificationApp";
import SelectGames from "./Components/Register/SelectGames";

function RouteHandler() {
  return (
    <Context>
      <Router history={useHistory()}>
        <Route path="/" exact component={LandingPageApp} />
        <Route
          path="/tournament-structure"
          component={TournamentStructureApp}
        />
        <Route path="/rankings" component={RankingsApp} />
        <Route path="/guidelines" component={GuidelinesApp} />
        <Route path="/register" component={SelectGames} />
        <Route path="/verification/:id" component={VerificationApp} />
        <Route
          path="/referral"
          component={(props) => (
            <Suspense fallback={<></>}>
              <ReferralPage {...props} />
            </Suspense>
          )}
        />
      </Router>
    </Context>
  );
}

export default RouteHandler;
