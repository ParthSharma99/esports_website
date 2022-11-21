import React, {useEffect, useState} from 'react'
import MainWebSiteTemplate from '../Templates/MainWebSiteTemplate'

function TournamentStructureApp(props) {
    const contentsIndex = [
        {text:"TOURNAMENT STRUCTURE", title:true, link:""}, 
        {text:"Overview", title:false, link:""}, 
        {text:"College Esports Champion", title:false, link:""}, 
        {text:"Open Tournament", title:false, link:""}
    ]
    const [activeSection, setActiveSection] = useState(props.location.state ? props.location.state: 1);
    const setActive = (section) =>{
        setActiveSection(section);
    }

    useEffect(() => {
        setActiveSection(activeSection);
    }, []);

    const overview = () => (
    <div className="text-content-wrapper">
        <span>There are two main tournament that we hold every year. 
            <ul>
                <li>Summer Major Championship (June)</li>
                <li>Winter Major Championship (December)</li>
            </ul> 
        </span>
        <p>These two championships form the backbone for our Inter College 
            Championship with the cumulative winner crowned the Champion of 
            the Circuit and the College and participants winning Rewards and 
            Glory to show off! </p>

        <p>The Winter Championship will be the first of the two, 
            providing the first taste of preparation and competition 
            in the early hours of the new year.</p> 
        <p>The Summer championship 
            will be a celebration of skill, culminating in the crowning 
            of the College Champion across various disciplines.  </p>
    </div>);

    const collegeEsportsChamion = () => (
    <div className="text-content-wrapper">
        <p>Across the Summer and Winter Championships, multiple 
            RMR rounds would be played across a variety of games 
            and across a variety of mediums (PC/Console/Mobile). 
            A college can register a contingent of members to 
            participate across all disciplines, or simply send a 
            smaller team to fight across a few choice games.</p>

        <p>The finishing positions of each single team from a college
            contributes not just to rewards for individual participants
            but also to the final position of their college. So its
            not just individual or team awards you are fighting for,
            the stakes are higher to perform for your college and
            the final glory.</p> 
    </div>);

    const openTournament = () => (
    <div className="text-content-wrapper">
        <p>Apart from our Summer and Winter Major Championships, 
            smaller tournaments both inter and intra college, will 
            continue to be held across the year, giving colleges 
            and teams a chance to hone their skills against one 
            another, and cement their lineups for the Major Championships.</p>
    </div>);

    const pageContentList = [overview, collegeEsportsChamion, openTournament]
    
    return (
        <MainWebSiteTemplate pageContentList={pageContentList} 
            contentsIndex={contentsIndex} active={activeSection} 
            setActive={setActive}/>
    )
}

export default TournamentStructureApp
