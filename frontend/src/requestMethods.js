import axios from 'axios';

const appUrl = "http://127.0.0.1:8000/";
// const token = JSON.parse(JSON.parse(localStorage.getItem('persist:root')).user)
//   .currentUser.token || '';

export const publicRequest = axios.create({
  baseURL: `${appUrl}/api`,
});

// export const userRequest = axios.create({
//   baseURL: `${appUrl}/api`,
//   headers: { token: `Bearer ${token}` },
// });
