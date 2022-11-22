import React, { useState } from "react";
import { Redirect, useHistory } from "react-router";
import logo from "../../Images/logo.png";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import useWindowDimensions from "../../ScreenDimensions";

function NavigationBar() {
  const { width, height } = useWindowDimensions();
  const deltaWidth = 1050;
  const [colorChange, setColorchange] = useState(false);
  const [redirect, setRedirect] = useState({
    redirect: false,
    path: "",
    state: "",
  });
  const history = useHistory();
  const changeNavbarColor = () => {
    if (window.scrollY >= 80) {
      setColorchange(true);
    } else {
      setColorchange(false);
    }
  };
  window.addEventListener("scroll", changeNavbarColor);

  const navLinksData = [
    // {id: "link0", title: "Tournament structure",
    //     linkPath: "/tournament-structure",
    //     moreLinksData: ["Overview", "College Esports Champion", "Open Tournament"]},
    // {id: "link1", title: "Rankings",
    //     linkPath: "/rankings",
    //     moreLinksData: ["Overall Rankings", "CS:GO Rankings", "Rocket League Rankings", "Valorant Rankings"]},
    // {id: "link2", title: "Guidelines",
    //     linkPath: "/guidelines",
    //     moreLinksData: ["Code Of Conduct", "CS:GO Rules", "Rocket League Rules", "Valorant Rules"]},
  ];

  const [toggleLinks, setToggleLinks] = useState({
    link0: false,
    link1: false,
    link2: false,
  });

  const toggleArrowOfLink = (idx) => {
    setToggleLinks({
      ...toggleLinks,
      ["link" + idx]: !toggleLinks["link" + idx],
    });
  };

  if (redirect.redirect) {
    if (redirect.path !== window.location.pathname) {
      return (
        <Redirect
          to={{
            pathname: redirect.path,
            state: redirect.state,
          }}
        />
      );
    }
  }
  const handleClick = () => {
    if (window.scrollY < 80) {
      if (
        document
          .getElementById("navbar-container")
          .classList.contains("navbar-color")
      ) {
        setTimeout(() => {
          document
            .getElementById("navbar-container")
            .classList.remove("navbar-color");
        }, 300);
      } else {
        document
          .getElementById("navbar-container")
          .classList.add("navbar-color");
      }
    }
  };
  if (width < deltaWidth) {
    return (
      <Navbar bg="none" expand="lg" variant="dark" onToggle={handleClick}>
        <Container
          className={
            colorChange ? "mobile-navbar navbar-color" : "mobile-navbar"
          }
          id="navbar-container"
        >
          <Navbar.Brand href="/">
            <img style={{ width: "10px" }} src={logo} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="justify-content-around align-items-center vh-100 w-100 pb-5">
              {navLinksData.map((navLink, idx) => {
                return (
                  <NavDropdown
                    style={{
                      alignItems: "center",
                      textAlign: "center",
                      marginTop: "24px",
                    }}
                    title={navLink.title}
                    key={idx}
                  >
                    {navLink.moreLinksData.map((moreLink, key) => {
                      return (
                        <NavDropdown.Item
                          style={{ color: "white" }}
                          onClick={() =>
                            setRedirect({
                              redirect: true,
                              path: navLink.linkPath,
                              state: key + 1,
                            })
                          }
                          key={key}
                        >
                          {moreLink}
                        </NavDropdown.Item>
                      );
                    })}
                  </NavDropdown>
                );
              })}
              <Nav.Link
                href="/register"
                style={{
                  marginTop: "auto",
                  marginBottom: "24px",
                }}
              >
                <div className="button-wrapper">
                  <button>Participate</button>
                </div>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
  return (
    <nav className="landing-page-navbar">
      <ul className={colorChange ? "navbar navbar-color" : "navbar"}>
        <li className="navbar-items" id="logo">
          <img
            onClick={() => history.push("/")}
            style={{ width: "10px" }}
            src={logo}
          />
        </li>
        {navLinksData.map(({ title, linkPath, moreLinksData }, key) => {
          return (
            <li className="navbar-items">
              <div onClick={() => toggleArrowOfLink(key)}>
                <Dropdown className="nav-dropdown">
                  <Dropdown.Toggle variant="none">
                    {title}
                    {/* <span className={
                                        toggleLinks["link" + key] ? "arrow active" : "arrow"
                                    }>
                                        <span></span>
                                        <span></span>
                                    </span> */}
                  </Dropdown.Toggle>

                  <Dropdown.Menu variant="dark">
                    {moreLinksData.map((moreLink, key) => (
                      <Dropdown.Item
                        onClick={() =>
                          setRedirect({
                            redirect: true,
                            path: linkPath,
                            state: key + 1,
                          })
                        }
                      >
                        {moreLink}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </li>
          );
        })}
        <li
          className="navbar-items"
          onClick={() =>
            setRedirect({
              redirect: true,
              path: "/register",
            })
          }
        >
          Register Team
        </li>
      </ul>
    </nav>
  );
}

export default NavigationBar;
