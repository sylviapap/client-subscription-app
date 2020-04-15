const API_ROOT = `http://localhost:3001/api/v1`;
const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json'
};

const getSubscriptions = () => {
  fetch(`${API_ROOT}/subscriptions/`, { headers: headers })
  .then(res => res.json())};