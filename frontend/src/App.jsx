/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { PropTypes } from "prop-types";
import BadRequestPage from "./pages/BadRequestPage";
import SelectedLanguageContext from "./services/context/SelectedLanguageContext";
import Home from "./pages/Home";
import SignUpPage from "./pages/SignUpPage";
import HomeAfterSignIn from "./pages/HomeAfterSignIn";
import ProfileUserPage from "./pages/ProfileUserPage";
import ProfilePersoPage from "./pages/ProfilePersoPage";
import ProfileUserRegistered from "./pages/ProfileUserRegisteredPage";
import ProfileMembersPage from "./pages/ProfileMembersPage";
import LanguageSelectFeed from "./pages/LanguageSelectFeed";
import Resources from "./pages/Resources";
import MyPostsPage from "./pages/MyPostsPage";
import SignInPage from "./pages/SignInPage";
import NotFoundPage from "./pages/NotFoundPage";
import PrivateRoutes from "./services/PrivateRoutes";
import "./App.css";

function App() {
  const [selectedLanguage, setSelectedLanguage] = useState();
  return (
    <div className="App">
      <SelectedLanguageContext.Provider
        value={{
          selectedLanguage,
          setSelectedLanguage,
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/inscription" element={<SignUpPage />} />
          <Route path="/connexion" element={<SignInPage />} />
          <Route path="/ressources" element={<Resources />} />
          <Route path="/erreur404" element={<NotFoundPage />} />
          <Route path="/erreur400" element={<BadRequestPage />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/user-compte" element={<ProfileUserPage />} />
            <Route path="/mon-compte" element={<ProfilePersoPage />} />
            <Route path="/creer-post" element={<HomeAfterSignIn />} />
            <Route
              path="/creation-compte"
              element={<ProfileUserRegistered />}
            />
            <Route path="/profil-membres" element={<ProfileMembersPage />} />
            <Route
              path="/profil-membre/:userIdSelected"
              element={<ProfileUserPage />}
            />
            <Route path="/fil-de-discussion" element={<LanguageSelectFeed />} />
            <Route path="/mes-posts" element={<MyPostsPage />} />
          </Route>
        </Routes>
      </SelectedLanguageContext.Provider>
    </div>
  );
}
SelectedLanguageContext.Provider.propTypes = {
  value: PropTypes.shape({
    selectedLanguage: PropTypes.string,
    setSelectedLanguage: PropTypes.func,
  }).isRequired,
};

export default App;
