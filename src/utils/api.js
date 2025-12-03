const baseUrl = "http://localhost:3001";

const headers = {
  "Content-Type": "application/json",
};

export const handleServerResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};

export const getItems = () => {
  return fetch(`${baseUrl}/items`, { headers }).then(handleServerResponse);
};

export const addItem = ({ name, imageUrl, weather }) => {
  const token = localStorage.getItem("jwt");

  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      name,
      imageUrl,
      weather,
    }),
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
  }).then(handleServerResponse);
};

export const removeItem = (itemID) => {
  const token = localStorage.getItem("jwt");

  return fetch(`${baseUrl}/items/${itemID}`, {
    method: "DELETE",
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
  }).then(handleServerResponse);
};

export function updateUser({ name, avatar }) {
  const token = localStorage.getItem("jwt");
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, avatar }),
  }).then(handleServerResponse);
}

export const addCardLike = (id, token) => {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(handleServerResponse);
};

export const removeCardLike = (id, token) => {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(handleServerResponse);
};
