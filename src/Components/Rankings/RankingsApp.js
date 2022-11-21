import React, { useEffect, useState } from 'react'
import MainWebSiteTemplate from '../Templates/MainWebSiteTemplate'

function RankingsApp(props) {
    const contentsIndex = [
        {text:"Rankings", title:true, link:""},  
            {text:"Overall Rankings", title:false, link:""}, 
            {text:"CS:GO Rankings", title:false, link:""},
            {text:"Rocket League Rankings", title:false, link:""},
            {text:"Valorant Rankings", title:false, link:""},
    ]
    const [activeSection, setActiveSection] = useState(props.location.state ? props.location.state: 1);
    const setActive = (section) =>{
        setActiveSection(section);
    }

    useEffect(() => {
        setActiveSection(activeSection);
    }, []);

    const pageContentList = [() => {}, 
        () => {},
         () => {}, 
         () => {}];
    
    return (
        <MainWebSiteTemplate pageContentList={pageContentList} contentsIndex={contentsIndex} active={activeSection} setActive={setActive}/>
    )
}

export default RankingsApp
