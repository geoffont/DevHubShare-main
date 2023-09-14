import * as React from "react";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useMediaQuery } from "@mui/material";
import { Icon } from "@iconify/react";
import { NavLink, useNavigate } from "react-router-dom";
import SelectedLanguageContext from "../../services/context/SelectedLanguageContext";

export default function Sidebar() {
  const { selectedLanguage, setSelectedLanguage } = useContext(
    SelectedLanguageContext
  );
  const isMobile = useMediaQuery("(max-width: 600px)");
  const [showSidebar, setShowSidebar] = useState(true);
  const [showButton, setShowButton] = useState(false);

  const [sideLanguages, setSideLanguages] = useState([]);

  const navigate = useNavigate();

  function useLoggedIn() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    }, []);

    return isLoggedIn;
  }

  const isLoggedIn = useLoggedIn();

  const getLanguages = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/languages");
      setSideLanguages(data);
    } catch (error) {
      console.error(error);
      navigate("/erreur400");
    }
  };
  useEffect(() => {
    getLanguages();
  }, []);

  useEffect(() => {
    if (isMobile) {
      setShowButton(true);
      setShowSidebar(false);
    } else {
      setShowButton(false);
      setShowSidebar(true);
    }
  }, [isMobile]);

  const clickButton = () => {
    setShowSidebar(!showSidebar);
  };

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
    navigate("/fil-de-discussion");
  };
  setSelectedLanguage(selectedLanguage);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
  };

  return (
    <div
      className="containerSide"
      style={{ display: "flex", height: "100%", margin: 0, padding: 0 }}
    >
      <nav
        className="sidebar"
        role="navigation"
        style={{
          display: showSidebar ? "flex" : "none",
          backgroundColor: "#009aa6",
          color: "#ffff",
          height: "100%",
        }}
      >
        <div
          className="topSection"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-around",
            padding: "2vw 2vw",
            fontSize: "1.4rem",
          }}
        >
          <NavLink
            to="/"
            className="link"
            style={{
              display: "flex",
              color: "#ffff",
              padding: "1rem 2rem",
              textDecoration: "none",
            }}
          >
            <div className="link_text">Accueil</div>
          </NavLink>
          <NavLink
            to="/creer-post"
            className="link"
            style={{
              display: "flex",
              color: isLoggedIn ? "#ffff" : "rgb(120 111 111)",
              padding: "1rem 2rem",
              textDecoration: "none",
            }}
          >
            <div className="link_text">Créer un post</div>
          </NavLink>
          <div
            className="sideFil"
            style={{
              textAlign: "center",
            }}
          >
            <NavLink
              to="/fil-de-discussion"
              onClick={() => {
                setSelectedLanguage(undefined);
              }}
              className="link"
              style={{
                display: "flex",
                color: isLoggedIn ? "#ffff" : "rgb(120 111 111)",
                padding: "1rem 2rem",
                textDecoration: "none",
                fontSize: "0.9rem",
              }}
            >
              <div className="link_text">Fil de discussion</div>
            </NavLink>
            <select
              value={selectedLanguage}
              onChange={handleLanguageChange}
              style={{
                color: isLoggedIn ? "#009AA6" : "rgb(120 111 111)",
                height: 30,
                borderRadius: 4,
                fontSize: 14,
                backgroundColor: "white",
              }}
            >
              <option value="">Sélection du langage</option>
              {sideLanguages.map((langage) => (
                <option
                  key={langage.id}
                  value={langage.langage_name}
                  style={{ color: "#009AA6" }}
                >
                  {langage.language_name}
                </option>
              ))}
            </select>
          </div>
          <NavLink
            to="/profil-membres"
            className="link"
            style={{
              display: "flex",
              color: isLoggedIn ? "#ffff" : "rgb(120 111 111)",
              padding: "1rem 2rem",
              textDecoration: "none",
            }}
          >
            <div className="link_text">Membres</div>
          </NavLink>
          <NavLink
            to="/ressources"
            className="link"
            style={{
              display: "flex",
              color: "#ffff",
              padding: "1rem 2rem",
              textDecoration: "none",
            }}
          >
            <div className="link_text">Ressources</div>
          </NavLink>
          <NavLink
            to="/mes-posts"
            className="link"
            style={{
              display: "flex",
              color: isLoggedIn ? "#ffff" : "rgb(120 111 111)",
              padding: "1rem 2rem",
              textDecoration: "none",
            }}
          >
            <div className="link_text">Mes Posts</div>
          </NavLink>
          <NavLink
            to="/connexion"
            className="link"
            style={{
              display: "flex",
              color: isLoggedIn ? "#ffff" : "rgb(120 111 111)",
              padding: "1rem 2rem",
              textDecoration: "none",
              fontSize: "0.9rem",
            }}
            onClick={handleLogout}
          >
            <div className="link_text">Déconnexion</div>
          </NavLink>
        </div>
      </nav>
      <div
        className="button-wrapper"
        style={{
          display: showButton ? "block" : "none",
          position: "fixed",
          top: "45%",
        }}
      >
        <button
          type="button"
          onClick={clickButton}
          aria-label="Afficher la barre latérale"
          style={{
            backgroundColor: "transparent",
            border: "none",
            cursor: "pointer",
          }}
        >
          <Icon icon="eva:arrow-ios-forward-outline" color="#333" width="35" />
        </button>
      </div>
    </div>
  );
}
