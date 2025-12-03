import "./App.css";

// React imports
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

// Components
import Header from "../Header/Header";
import Main from "../Main/Main";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import Footer from "../Footer/Footer";
import Profile from "../Profile/Profile";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";

// Utils/API
import { filterWeatherData, getWeather } from "../../utils/weatherApi";
import { apiKey } from "../../utils/constants";
import {
  getItems,
  addItem,
  removeItem,
  updateUser,
  addCardLike,
  removeCardLike,
} from "../../utils/api";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContexts";
import CurrentUserContext from "../../contexts/CurrentUserContext";

import { signup, signin, checkToken } from "../../utils/auth";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
    setIsConfirmModalOpen(false);
    setCardToDelete(null);
  };

  const onAddItem = (inputValues) => {
    const newCardData = {
      name: inputValues.name,
      imageUrl: inputValues.imageUrl,
      weather: inputValues.weatherType,
    };

    addItem(newCardData)
      .then((res) => {
        setClothingItems([res.data, ...clothingItems]);
        closeActiveModal();
      })
      .catch(console.error);
  };

  useEffect(() => {
    if (!activeModal) return;

    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  useEffect(() => {
    const getUserLocation = () => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const coordinates = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            };
            getWeather(coordinates, apiKey)
              .then((data) => {
                const filteredData = filterWeatherData(data);
                setWeatherData(filteredData);
              })
              .catch(console.error);
          },
          (error) => {
            console.error("Error getting location:", error);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser");
      }
    };

    getUserLocation();
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data.reverse());
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) return;

    checkToken(token)
      .then((userData) => {
        setCurrentUser(userData);
        setIsLoggedIn(true);
      })
      .catch(() => {
        setIsLoggedIn(false);
        localStorage.removeItem("jwt");
      });
  }, []);

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [cardToDelete, setCardToDelete] = useState(null);

  const openConfirmationModal = (card) => {
    closeActiveModal();
    setCardToDelete(card);
    setIsConfirmModalOpen(true);
  };

  const deleteItemHandler = (itemId) => {
    removeItem(itemId)
      .then(() => {
        setClothingItems((prev) =>
          prev.filter((item) => (item.id || item._id) !== itemId)
        );
        closeActiveModal();
      })
      .catch(console.error);
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const handleRegister = ({ name, avatarUrl, email, password }) => {
    signup({ name, avatar: avatarUrl, email, password })
      .then(() => {
        return handleLogin({ email, password });
      })
      .catch(console.error);
  };

  const handleLogin = ({ email, password, setError }) => {
    signin({ email, password })
      .then((res) => {
        localStorage.setItem("jwt", res.token);

        return checkToken(res.token);
      })
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
        closeActiveModal();
      })
      .catch((err) => {
        console.error(err);
        setError("Email or password is incorrect");
      });
  };

  function handleLoginClick() {
    setActiveModal("login");
  }

  function handleRegisterClick() {
    setActiveModal("register");
  }

  const openLogin = () => {
    setActiveModal("login");
  };

  const openRegister = () => {
    setActiveModal("register");
  };

  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);

  function handleEditProfileClick() {
    setIsEditProfileModalOpen(true);
  }

  function closeEditProfileModal() {
    setIsEditProfileModalOpen(false);
  }

  function handleUpdateUser({ name, avatarUrl }) {
    return updateUser({ name, avatar: avatarUrl })
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        closeEditProfileModal();
      })
      .catch(console.error);
  }

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");

    if (!isLiked) {
      addCardLike(id, token)
        .then((updatedCard) => {
          const card = updatedCard.data || updatedCard;
          setClothingItems((cards) =>
            cards.map((item) => (item._id === id ? card : item))
          );
        })
        .catch(console.error);
    } else {
      removeCardLike(id, token)
        .then((updatedCard) => {
          const card = updatedCard.data || updatedCard;
          setClothingItems((cards) =>
            cards.map((item) => (item._id === id ? card : item))
          );
        })
        .catch(console.error);
    }
  };

  function handleSignOut() {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page">
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              onLoginClick={handleLoginClick}
              onRegisterClick={handleRegisterClick}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    onCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      onCardClick={handleCardClick}
                      clothingItems={clothingItems}
                      weatherData={weatherData}
                      handleAddClick={handleAddClick}
                      onRegister={handleRegister}
                      onLogin={handleLogin}
                      onEditProfileClick={handleEditProfileClick}
                      onCardLike={handleCardLike}
                      onSignOut={handleSignOut}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
          <AddItemModal
            isOpen={activeModal === "add-garment"}
            onClose={closeActiveModal}
            onAddItem={onAddItem}
          />
          {activeModal === "login" && (
            <LoginModal
              isOpen={activeModal === "login"}
              onClose={closeActiveModal}
              onLogin={handleLogin}
              onRedirect={openRegister}
            />
          )}
          {activeModal === "register" && (
            <RegisterModal
              isOpen={activeModal === "register"}
              onClose={closeActiveModal}
              onRegister={handleRegister}
              onRedirect={openLogin}
            />
          )}
          <ItemModal
            activeModal={activeModal}
            card={selectedCard}
            onClose={closeActiveModal}
            onOpenConfirmation={openConfirmationModal}
          />
          <DeleteConfirmationModal
            isOpen={isConfirmModalOpen}
            onClose={closeActiveModal}
            onConfirm={deleteItemHandler}
            card={cardToDelete}
          />
          <EditProfileModal
            isOpen={isEditProfileModalOpen}
            onClose={closeEditProfileModal}
            onUpdateUser={handleUpdateUser}
          />
          <Footer />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
