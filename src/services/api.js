const API_ROOT = `http://localhost:3001/api/v1`;

const token = localStorage.getItem('token');

const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
  Authorization: token
};

const getSubscriptions = async () => {
  const res = await fetch(`${API_ROOT}/subscriptions/`, { headers: headers });
    return await res.json();
};

const login = async (username, password) => {
  const res = await fetch(`${API_ROOT}/auth/`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ username, password })
    });
    return await res.json();
};

const getCurrentUser = async () => {
  const res = await fetch(`${API_ROOT}/current_user`, {
        headers: headers
    });
    return await res.json();
};

export default {
  auth: {
    login: login,
    getCurrentUser: getCurrentUser
  },
  subscriptions: {
    getSubscriptions
  }
};