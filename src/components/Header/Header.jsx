import "./Header.css";
import logo from "../../assets/logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Header({
  handleAddClick,
  weatherData,
  onLoginClick,
  onRegisterClick,
}) {
  const currentUser = useContext(CurrentUserContext);

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const fallbackAvatar = currentUser?.name
    ? currentUser.name[0].toUpperCase()
    : "?";

  return (
    <header className="header">
      <NavLink to="/">
        <img src={logo} alt="wtwr logo" className="header__logo" />
      </NavLink>
      <p className="header__date-location">
        {currentDate}, {weatherData.city}
      </p>
      <ToggleSwitch />
      {currentUser ? (
        <>
          <button
            onClick={handleAddClick}
            type="button"
            className="header__add-btn"
          >
            + Add clothes
          </button>
          <NavLink className="header__nav-link" to="/profile">
            <div className="header__user-container">
              <p className="header__username">{currentUser.name}</p>

              {currentUser.avatar ? (
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="header__avatar"
                />
              ) : (
                <p className="header__avatar-fallback">{fallbackAvatar}</p>
              )}
            </div>
          </NavLink>
        </>
      ) : (
        <div className="header__auth-buttons">
          <button className="header__register-btn" onClick={onRegisterClick}>
            Sign up
          </button>
          <button className="header__login-btn" onClick={onLoginClick}>
            Log in
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
