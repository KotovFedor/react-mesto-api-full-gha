class Api {
  constructor({ serverUrl }) {
    this.serverUrl = serverUrl;
  }

  _sendRequest(way, options) {
    return fetch(`${this.serverUrl}${way}`, options).then((res) => {
      if (res.ok) {
        return res.json();
      } else if (!res.ok) {
        return Promise.reject(res.status);
      }
    });
  }

  getUserInfo(token) {
    return this._sendRequest(`/users/me`, {
      headers: {
        "Authorization": `Bearer ${token}`,
      }
    });
  }

  sendUserInfo(data, token) {
    return this._sendRequest(`/users/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: data.name,
        about: data.profession,
      }),
    });
  }

  sendUserAvatar(data, token) {
    return this._sendRequest(`/users/me/avatar`, {
      method: "PATCH",
      body: JSON.stringify({ avatar: data.link }),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
  }

  getCards(token) {
    return this._sendRequest(`/cards`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });
  }

  addCard(card, token) {
    return this._sendRequest(`/cards`, {
      method: "POST",
      body: JSON.stringify({
        name: card.name,
        link: card.link,
      }),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
  }

  addLike(id, token) {
    return this._sendRequest(`/cards/${id}/likes`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });
  }

  deleteLike(id, token) {
    return this._sendRequest(`/cards/${id}/likes`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });
  }

  deleteCard(id, token) {
    return this._sendRequest(`/cards/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });
  }
}

const api = new Api({
  serverUrl: "https://api.mesto.domainname.students.nomoredomainsrocks.ru",
});

export default api;
